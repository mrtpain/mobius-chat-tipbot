const textTable = require('text-table');
const logger = require('../lib/logger');


function getTable(users, sortBy, tag) {
  const rows = users.map((user, index) => {
    const balance = user[sortBy];

    return [`${index + 1}.`, `[${balance.toFixed(1)}]`, tag(user.userId)];
  });

  return textTable(rows, { align: ['l', 'l', 'l'] });
}


async function leaderboard(command, context) {
  const { args } = command;

  const sortBy = args[0] === 'lifetime' ? 'numTokensLifetime' : 'numTokens';

  try {
    const users = await context.rank(sortBy);

    const table = getTable(users, sortBy, context.getUserTag);

    return {
      text: context.t('commands.leaderboard.success', { table }),
    };
  } catch (e) {
    logger.log('LEADERBOARD', e);

    return {
      text: context.t('commands.leaderboard.fail'),
    };
  }
}

module.exports = leaderboard;
