const config = require('../config');
const logger = require('../lib/logger');

async function tip(command, context) {
  const { args } = command;

  const recepientId = args[0];
  const amount = parseInt(args[1] || config.DEFAULT_TIP_AMOUNT, 10);

  const user = await context.getUser(recepientId);

  if (amount > config.MAX_TIP) {
    return {
      text: context.t('commands.tip.failByMaxTip'), // TODO: I18n
    };
  }

  if (user.numTokensLifetime + amount > config.MAX_TIP_LIFETIME) {
    return {
      text: context.t('commands.tip.failByMaxTipLifetime'), // TODO: I18n
    };
  }

  try {
    await context.tip(recepientId, amount);

    return {
      text: context.t('commands.tip.success', {
        amount, user: context.getUserTag(recepientId),
      }),
    };
  } catch (e) {
    logger.log('TIP', e);

    return {
      text: context.t('commands.tip.fail'), // TODO: I18n
    };
  }
}

module.exports = tip;
