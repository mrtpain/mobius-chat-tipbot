const config = require('../config');

async function help(command, context) {
  const bot = await context.getBotTag();

  return {
    text: context.t('commands.help', {
      bot, defaultAmount: config.DEFAULT_TIP_AMOUNT,
    }),
  };
}

module.exports = help;
