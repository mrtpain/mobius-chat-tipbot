const Telegraf = require('telegraf');
const { COMMANDS, run } = require('../commands');
const logger = require('../lib/logger');
const telegram = require('../lib/telegram');
const TelegramContext = require('../contexts/telegram');


function start() {
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

  const context = new TelegramContext();

  bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;

    context.setBotId(botInfo.username);

    logger.log('TELEGRAM_BOT_ID', botInfo.username);
  });

  async function onCommand(ctx) {
    const { message } = ctx;

    if (telegram.isValidMessage(message)) {
      const command = telegram.convertMessageToCommand(message, bot.options.username);

      const response = await run(command, context);

      if (response && response.text) {
        ctx.replyWithMarkdown(response.text);
      }
    }
  }


  bot.command(COMMANDS, onCommand);

  bot.startPolling();
}

module.exports = {
  start,
};
