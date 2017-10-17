const locales = require('../locales');

async function help(command, context) {
  const bot = await context.getBotId().then(context.getUserTag);

  return {
    text: locales.t('commands.help', { bot }),
  };
}

module.exports = help;
