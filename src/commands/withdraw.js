const mobius = require('../services/mobius');
const config = require('../config');

async function send(command, context) {
  const { senderId, args } = command;

  const amount = parseInt(args[0], 10);
  const address = args[1];

  const { numTokens } = await context.getUser(senderId);

  if (amount > numTokens) {
    return {
      text: context.t('commands.send.failByAmout'), // TODO: I18n
    };
  }

  try {
    await mobius.tokens.transferManaged({
      tokenAddressUid: config.MOBIUS_TOKEN_UID,
      addressTo: address,
      numTokens: amount,
    });

    await context.withdraw(senderId, amount);

    return {
      text: context.t('commands.send.success', { amount, address }),
    };
  } catch (e) {
    return {
      text: context.t('commands.send.fail'),
    };
  }
}

module.exports = send;
