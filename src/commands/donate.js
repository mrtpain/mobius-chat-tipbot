const locales = require('../locales');
const logger = require('../lib/logger');

async function doante(command, context) {
  const { senderId } = command;

  try {
    const { address } = await context.getUser(senderId);

    return {
      text: locales.t('commands.donate.success', { user: context.getUserTag(senderId), address }),
    };
  } catch (e) {
    logger.log('DONATE', e.message);
    return {};
  }
}

module.exports = doante;
