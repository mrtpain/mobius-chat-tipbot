const mobius = require('../services/mobius');
const config = require('../config');
const locales = require('../locales');
const logger = require('../lib/logger');

async function addresses(_, context) {
  const users = await context.getNewUsers();

  if (users.length === 0) {
    return {
      text: locales.t('commands.createAddresses.fail'),
    };
  }

  const created = [];

  users.forEach(async (user) => {
    try {
      const { id } = user;
      const { address } = await mobius.tokens.createAddress({
        tokenUid: config.MOBIUS_TOKEN_UID,
        managed: true,
      });

      context.setUserAddress(id, address);

      created.push(user);
    } catch (e) {
      logger.error(e);
    }
  });

  const names = created.map(u => u.name).join(', ');

  return {
    text: locales.t('commands.createAddresses.success', { names }),
  };
}

module.exports = { addresses };
