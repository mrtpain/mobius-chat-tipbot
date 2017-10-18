const mobius = require('../services/mobius');
const config = require('../config');
const locales = require('../locales');
const logger = require('../lib/logger');

async function reinit(_, context) {
  try {
    const newUsers = await context.getNewUsers();

    if (newUsers.length === 0) {
      return {
        text: locales.t('commands.reinit.empty'),
      };
    }

    const created = await Promise.all(newUsers.map(async (user) => {
      try {
        const { id } = user;
        const { uid, address } = await mobius.tokens.createAddress({
          tokenUid: config.MOBIUS_TOKEN_UID,
          managed: true,
        });

        context.setUser(id, { uid, address });

        return id;
      } catch (e) {
        logger.error('REINIT', e);
        return null;
      }
    }));

    const users = created
      .filter(userId => userId)
      .map(userId => context.getUserTag(userId))
      .join(', ');

    return {
      text: locales.t('commands.reinit.success', { users }),
    };
  } catch (e) {
    logger.log('REINIT', e);

    return {
      text: locales.t('commands.reinit.fail'),
    };
  }
}

module.exports = reinit;
