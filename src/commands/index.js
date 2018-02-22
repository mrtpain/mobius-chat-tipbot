const help = require('./help');
const unknown = require('./unknown');
const balance = require('./balance');
const leaderboard = require('./leaderboard');
const tip = require('./tip');
const withdraw = require('./withdraw');
const logger = require('../lib/logger');


const HELP = 'help';
const TIP = 'tip';
const SEND = 'send';
const WITHDRAW = 'withdraw';
const B = 'b';
const BAL = 'bal';
const BALANCE = 'balance';
const LEADERBOARD = 'leaderboard';
const RANK = 'rank';

const COMMANDS = [
  HELP, TIP, SEND, WITHDRAW, B, BAL, BALANCE, LEADERBOARD, RANK,
];


function run(command, context) {
  logger.log('COMMAND', command);

  const { name } = command;

  if (name === HELP) {
    return help(command, context);
  }

  if (name === TIP) {
    return tip(command, context);
  }

  if ([WITHDRAW, SEND].includes(name)) {
    return withdraw(command, context);
  }

  if ([B, BAL, BALANCE].includes(name)) {
    return balance(command, context);
  }

  if ([LEADERBOARD, RANK].includes(name)) {
    return leaderboard(command, context);
  }

  return unknown(command, context);
}


module.exports = {
  run,
  COMMANDS,
};
