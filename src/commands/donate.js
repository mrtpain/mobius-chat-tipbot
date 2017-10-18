const locales = require('../locales');
const logger = require('../lib/logger');

async function donate(command, context) {
  const { senderId } = command;

  try {
    const { address } = await context.getUser(senderId);

    return {
      text: locales.t('commands.donate.success', {
        user: context.getUserTag(senderId), address,
      }),
    };
  } catch (e) {
    logger.error('DONATE', e);

    return {
      text: locales.t('commands.donate.fail', {
        user: context.getUserTag(senderId),
      }),
    };
  }
}

module.exports = donate;
