const mobius = require('../services/mobius');
const locales = require('../locales');
const logger = require('../lib/logger');

async function tip(command, context) {
  const { senderId, args } = command;

  const amount = args[0];
  const address = args[1];

  try {
    const { uid } = await context.getUser(senderId);

    await mobius.tokens.transferManaged({
      tokenAddressUid: uid,
      addressTo: address,
      numTokens: amount,
    });

    return {
      text: locales.t('commands.send.success', { amount, address }),
    };
  } catch (e) {
    logger.log('SEND', e.message);
    return {};
  }
}

module.exports = tip;
