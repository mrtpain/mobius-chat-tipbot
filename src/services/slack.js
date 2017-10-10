const SlackBot = require('slackbots');

const config = require('../config');
const redis = require('./redis');
const { slack, logger: { log } } = require('../lib');
const { runCommand } = require('../commands');

const SLACK_BOT_USER_ID = 'SLACK_BOT_USER_ID';
const SLACK_USERS_ADDRESSES = 'SLACK_USERS_ADDRESSES';

function run() {
  const bot = new SlackBot({
    token: config.SLACK_API_TOKEN,
    name: 'Mobius Chat Tipbot',
  });

  const context = {
    async getUsers() {
      const users = slack.parseUsers(await bot.getUsers());

      log('USERS', users);

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

    log('HELLO', id);
  }

  async function onMessage(message) {
    const { slackBotUserId } = redis.get(SLACK_BOT_USER_ID);

    const data = { message, botId: slackBotUserId };

    if (slack.isValidMessage(data)) {
      log('MESSAGE', message);

      const command = slack.getCommand(data);
      const channel = slack.getResponseChannel(data);

      const response = await runCommand(command, context);

      if (response && response.text) {
        bot.postMessage(channel, response.text, {
          link_names: true,
        });
      }
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
