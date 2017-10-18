const locales = require('../locales');
const config = require('../config');

async function help(command, context) {
  const bot = await context.getBotId().then(context.getUserTag);

  return {
    text: locales.t('commands.help', { bot, defaultAmount: config.DEFAULT_TIP_AMOUNT }),
  };
}

module.exports = help;
