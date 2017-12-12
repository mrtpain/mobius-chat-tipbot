const test = require('ava');
const lib = require('../../src/lib/slack');


test('parseUsers', (t) => {
  const data = {
    SLACKBOT: { id: 'SLACKBOT', name: 'slackbot', is_bot: false },
    USER: { id: 'USER', name: 'USER', is_bot: false },
    BOT: { id: 'BOT', name: 'BOT', is_bot: true },
  };

  t.deepEqual(lib.parseUsers(data), [{ id: 'USER' }]);
});


test('isValidMessage', (t) => {
  t.is(lib.isValidMessage({ bot_id: 'BOT', text: '', channel: 'DIRECT' }, 'BOT'), false);
  t.is(lib.isValidMessage({ user: 'BOT', text: '', channel: 'DIRECT' }, 'BOT'), false);
  t.is(lib.isValidMessage({ user: 'USER', channel: 'DIRECT' }, 'BOT'), false);
  t.is(lib.isValidMessage({ user: 'USER', text: '', channel: 'CHANNEL' }, 'BOT'), false);

  t.is(lib.isValidMessage({ user: 'USER', text: '<@BOT> help', channel: 'CHANNEL' }, 'BOT'), true);
  t.is(lib.isValidMessage({ user: 'USER', text: 'help', channel: 'DIRECT' }, 'BOT'), true);
});


test('convertMessageToCommand 1', (t) => {
  const command = lib.convertMessageToCommand({ text: 'help' }, 'BOT');

  t.is(command.name, 'help');
});

test('convertMessageToCommand 2', (t) => {
  const command = lib.convertMessageToCommand({ text: 'Hey <@BOT>   send X to Y  ' }, 'BOT');

  t.is(command.name, 'send');
  t.deepEqual(command.args, ['X', 'to', 'Y']);
});

test('convertMessageToCommand 3', (t) => {
  const command = lib.convertMessageToCommand({ text: '<@BOT> help' }, 'BOT');

  t.is(command.name, 'help');
});

test('convertMessageToCommand 4', (t) => {
  const command = lib.convertMessageToCommand({ text: '<@USER> what\'s up? <@BOT> help' }, 'BOT');

  t.is(command.name, 'help');
});

test('convertMessageToCommand 5', (t) => {
  const command = lib.convertMessageToCommand({ text: 'tip <@USER> 10' }, 'BOT');

  t.is(command.name, 'tip');
  t.deepEqual(command.args, ['USER', '10']);
});
