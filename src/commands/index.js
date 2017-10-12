const help = require('./help');
const unknown = require('./unknown');
const createAddresses = require('./createAddresses');
const getBlance = require('./getBalance');

const { logger: { log } } = require('../lib');

function runCommand(command, context) {
  log('COMMAND', command);

  const [name, param] = command.args;

  if (name === 'help') {
    return help();
  }

  if (['b', 'bal', 'balance'].includes(name)) {
    return getBlance(command, context);
  }

  if (name === 'create' && param === 'addresses') {
    return createAddresses(command, context);
  }

  return unknown();
}

module.exports = {
  runCommand,
};
