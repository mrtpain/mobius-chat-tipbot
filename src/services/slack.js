const {
  RtmClient,
  CLIENT_EVENTS,
  RTM_EVENTS,
  MemoryDataStore,
} = require('@slack/client');
const ent = require('ent');

const config = require('../config');
const slack = require('../lib/slack');
const logger = require('../lib/logger');

const SlackContext = require('../contexts/slack');
const { run } = require('../commands');

function start() {
  const rtm = new RtmClient(config.SLACK_API_TOKEN, {
    dataStore: new MemoryDataStore(),
  });

  const context = new SlackContext();

  function onAuthenticated(data) {
    const { id } = data.self;

    context.setBotId(id);

    logger.log('SLACK_BOT_ID', id);
  }

  async function onMessage(message) {
    try {
      logger.log('MESSAGE', message);
      const botId = await context.getBotId();

      if (slack.isValidMessage(message, botId)) {
        const command = slack.convertMessageToCommand(message, botId);
        const response = await run(command, context);

        if (response && response.text) {
          rtm.sendMessage(ent.decode(response.text), command.channelId);
        }
      }
    } catch (e) {
      logger.log('ERROR', e);
    }
  }

  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, onAuthenticated);
  rtm.on(RTM_EVENTS.MESSAGE, onMessage);

  rtm.start();
}

module.exports = {
  start,
};
