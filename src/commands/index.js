const help = require('./help');
const unknown = require('./unknown');
const balance = require('./balance');
const leaderboard = require('./leaderboard');
const reinit = require('./reinit');
const tip = require('./tip');
const send = require('./send');
const donate = require('./donate');

const logger = require('../lib/logger');

function run(command, context) {
  logger.log('COMMAND', command);

  const { name } = command;

  if (name === 'help') {
    return help();
  }

  if (name === 'reinit') {
    return reinit(command, context);
  }

  if (name === 'donate') {
    return donate(command, context);
  }

  if (name === 'tip') {
    return tip(command, context);
  }

  if (['send', 'withdraw'].includes(name)) {
    return send(command, context);
  }

  if (['b', 'bal', 'balance'].includes(name)) {
    return balance(command, context);
  }

  if (['leaderboard', 'rank'].includes(name)) {
    return leaderboard(command, context);
  }

  return unknown();
}

module.exports = {
  run,
};
