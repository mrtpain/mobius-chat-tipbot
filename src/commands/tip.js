const mobius = require('../services/mobius');
const locales = require('../locales');
const logger = require('../lib/logger');

async function tip(command, context) {
  const { senderId, args } = command;

  const recepientId = args[0];
  const amount = args[1];

  try {
    const { uid } = await context.getUser(senderId);
    const { address } = await context.getUser(recepientId);

    await mobius.tokens.transferManaged({
      tokenAddressUid: uid,
      addressTo: address,
      numTokens: amount,
    });

    return {
      text: locales.t('commands.tip.success', { amount, user: context.getUserTag(recepientId) }),
    };
  } catch (e) {
    logger.log('TIP', e.message);
    return {};
  }
}

module.exports = tip;
