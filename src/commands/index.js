const help = require('./help');
const unknown = require('./unknown');
const { logger: { log } } = require('../lib');

function runCommand(command) {
  log('COMMAND', command);

  if (command === 'help') {
    return help();
  }

  return unknown();
}

module.exports = {
  runCommand,
};
