const sortBy = require('lodash.sortby');
const textTable = require('text-table');

const mobius = require('../services/mobius');
const config = require('../config');
const locales = require('../locales');

function mapUserToBalance(users, balances) {
  const addresses = {};

  Object.keys(users).forEach((id) => {
    const { address } = users[id];
    addresses[address] = id;
  });

  const table = balances.map(({ address, balance }) => ({
    userId: addresses[address],
    balance: parseFloat(balance),
  }));

  return table;
}

function getTable(users, balances, tag) {
  const table = sortBy(mapUserToBalance(users, balances), ['balance']);

  const rows = table.map(({ userId, balance }, index) => (
    [`${index + 1}.`, `[${balance.toFixed(1)}]`, tag(userId)]
  ));

  return textTable(rows, { align: ['l', 'l', 'l'] });
}

async function leaderboard(command, context) {
  try {
    const users = await context.getAllUsers();

    const balances = await Promise.all(Object.keys(users).map((id) => {
      const { address } = users[id];

      return mobius.tokens.balance({
        tokenUid: config.MOBIUS_TOKEN_UID,
        address,
      });
    }));

    const table = getTable(users, balances, context.getUserTag);

    return {
      text: locales.t('commands.leaderboard.success', { table }),
    };
  } catch (e) {
    return {};
  }
}

module.exports = leaderboard;
