const locales = require('../locales');

async function unknown(command, context) {
  const { senderId } = command;
  const user = context.getUserTag(senderId);

  return {
    text: locales.t('commands.unknown', { user }),
  };
}

module.exports = unknown;
