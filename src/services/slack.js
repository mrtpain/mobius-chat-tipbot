const SlackBot = require('slackbots');

const config = require('../config');
const redis = require('./redis');
const { slack, logger } = require('../lib');
const { runCommand } = require('../commands');

const SLACK_BOT_USER_ID = 'SLACK_BOT_USER_ID';
const SLACK_USERS_ADDRESSES = 'SLACK_USERS_ADDRESSES';

const bot = new SlackBot({
  token: config.SLACK_API_TOKEN,
  name: 'Mobius Chat Tipbot',
});

function run() {
  const context = {
    async getUsers() {
      const users = slack.parseUsers(await bot.getUsers());

      logger.log('USERS', users);

      return users;
    },

    async getUsersWithoutAddresses() {
      const users = await this.getUsers();
      const createdUsers = await redis.hkeys(SLACK_USERS_ADDRESSES) || [];

      return users.filter(u => !createdUsers.includes(u.id));
    },

    async getUserAddress(userId) {
      return redis.hget(SLACK_USERS_ADDRESSES, userId);
    },

    setUserAddress(userId, address) {
      redis.hsetnx(SLACK_USERS_ADDRESSES, userId, address);
    },
  };

  function onHello() {
    const { id } = bot.self;
    redis.set(SLACK_BOT_USER_ID, id);

    logger.log('HELLO', id);
  }

  async function onMessage(message) {
    try {
      const botId = await redis.get(SLACK_BOT_USER_ID);

      if (slack.isValidMessage(message, botId)) {
        logger.log('MESSAGE', message);

        const command = slack.convertMessageToCommand(message, botId);
        const response = await runCommand(command, context);

        if (response && response.text) {
          bot.postMessage(command.channelId, response.text, {
            link_names: true,
          });
        }
      }
    } catch (e) {
      logger.log('ERROR', e);
    }
  }

  bot.on('message', (data) => {
    if (data.type === 'hello') onHello(data);
    if (data.type === 'message') onMessage(data);
  });
}

module.exports = {
  run,
};
