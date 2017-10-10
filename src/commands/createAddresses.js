const mobius = require('../services/mobius');
const config = require('../config');
const locales = require('../locales');

async function createAddresses(context) {
  const users = await context.getUsersWithoutAddresses();

  users.forEach(async (user) => {
    const { id } = user;
    const { address } = await mobius.tokens.createAddress({
      tokenUid: config.MOBIUS_TOKEN_UID,
      managed: true,
    });

    context.setUserAddress(id, address);
  });

  const names = users.map(u => u.name).join(', ');

  return {
    text: locales.t('commands.createAddresses', { names }),
  };
}

module.exports = createAddresses;
