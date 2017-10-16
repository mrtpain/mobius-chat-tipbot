const mobius = require('../services/mobius');
const config = require('../config');
const locales = require('../locales');

async function balance(command, context) {
  const { senderId } = command;

  try {
    const { address } = await context.getUser(senderId);

    const data = await mobius.tokens.balance({
      tokenUid: config.MOBIUS_TOKEN_UID,
      address,
    });

    return {
      text: locales.t('commands.balance.success', {
        balance: data.balance, userId: senderId,
      }),
    };
  } catch (e) {
    return {};
  }
}

module.exports = balance;
