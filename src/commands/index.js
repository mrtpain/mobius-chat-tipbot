const help = require('./help');
const unknown = require('./unknown');
const createAddresses = require('./createAddresses');

const { logger: { log } } = require('../lib');

function runCommand(command, context) {
  log('COMMAND', command);

  if (command === 'help') {
    return help();
  }

  if (command === 'createAddresses') {
    return createAddresses(context);
  }

  return unknown();
}

module.exports = {
  runCommand,
};
