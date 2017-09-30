const SlackBot = require('slackbots');

const { slack, storage, logger: { log } } = require('./lib');
const { runCommand } = require('./commands');

function run(token) {
  const bot = new SlackBot({
    token,
    name: 'Mobius Chat Tipbot',
  });

  function onHello() {
    storage.slackBotUserId = bot.self.id;

    log('HELLO', storage.slackBotUserId);
  }

  function onMessage(message) {
    const { slackBotUserId } = storage;
    const data = { message, botId: slackBotUserId };

    if (slack.isValidMessage(data)) {
      log('MESSAGE', message);

      const command = slack.getCommand(data);
      const channel = slack.getResponseChannel(data);

      runCommand(command)
        .then((response) => {
          bot.postMessage(channel, response.text);
        });
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
