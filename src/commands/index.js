const help = require('./help');
const unknown = require('./unknown');
const balance = require('./balance');
const leaderboard = require('./leaderboard');
const create = require('./create');

const logger = require('../lib/logger');

function run(command, context) {
  logger.log('COMMAND', command);

  const { name, args } = command;

  if (name === 'help') {
    return help();
  }

  if (['b', 'bal', 'balance'].includes(name)) {
    return balance(command, context);
  }

  if (['leaderboard', 'rank'].includes(name)) {
    return leaderboard(command, context);
  }

  if (name === 'create') {
    if (args[0] === 'addresses') return create.addresses(command, context);
  }

  return unknown();
}

module.exports = {
  run,
};
