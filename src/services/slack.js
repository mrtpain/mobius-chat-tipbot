const SlackBot = require('slackbots');

const config = require('../config');
const slack = require('../lib/slack');
const logger = require('../lib/logger');

const SlackContext = require('../contexts/slack');
const { run } = require('../commands');

function start() {
  const bot = new SlackBot({
    token: config.SLACK_API_TOKEN,
    name: 'Mobius Chat Tipbot',
  });

  const context = new SlackContext(bot);

  function onHello() {
    const { id } = bot.self;

    context.setBotId(id);

    logger.log('HELLO', id);
  }

  async function onMessage(message) {
    try {
      const botId = await context.getBotId();

      if (slack.isValidMessage(message, botId)) {
        logger.log('MESSAGE', message);

        const command = slack.convertMessageToCommand(message, botId);
        const response = await run(command, context);

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
  start,
};
