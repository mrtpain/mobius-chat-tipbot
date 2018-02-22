const logger = require('../lib/logger');

async function balance(command, context) {
  const { senderId } = command;

  try {
    const { numTokens } = await context.getUser(senderId);

    return {
      text: context.t('commands.balance.success', {
        balance: numTokens,
        user: context.getUserTag(senderId),
      }),
    };
  } catch (e) {
    logger.error('BALANCE', e);

    return {
      text: context.t('commands.balance.fail', {
        user: context.getUserTag(senderId),
      }),
    };
  }
}

module.exports = balance;
