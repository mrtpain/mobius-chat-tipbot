const test = require('ava');
const lib = require('../../src/lib/slack');

test('isBotMessage', (t) => {
  t.is(lib.isBotMessage({ message: { bot_id: 'BOT' } }), true);
  t.is(lib.isBotMessage({ message: { user: 'USER' } }), false);
});

test('isSelfMessage', (t) => {
  t.is(lib.isSelfMessage({ message: { user: 'BOT' }, botId: 'BOT' }), true);
  t.is(lib.isSelfMessage({ message: { user: 'BOT' }, botId: 'USER' }), false);
  t.is(lib.isSelfMessage({ message: { foo: 'bar' }, botId: 'BOT' }), false);
});

test('isMessageWithText', (t) => {
  t.is(lib.isMessageWithText({ message: { text: 'Hello, world!' } }), true);
  t.is(lib.isMessageWithText({ message: { foo: 'bar' } }), false);
});

test('isDirectMessage', (t) => {
  t.is(lib.isDirectMessage({ message: { channel: 'DIRECT' } }), true);
  t.is(lib.isDirectMessage({ message: { channel: 'CHANNEL' } }), false);
});

test('isMentionMessage', (t) => {
  t.is(lib.isMentionMessage({ message: { text: '<@BOT> What\'s up?' }, botId: 'BOT' }), true);
  t.is(lib.isMentionMessage({ message: { text: 'Hey <@BOT> what\'s up?' }, botId: 'BOT' }), true);

  t.is(lib.isMentionMessage({ message: { text: '<@USER> What\'s up?' }, botId: 'BOT' }), false);
  t.is(lib.isMentionMessage({ message: { text: 'Hey <@USER> what\'s up?' }, botId: 'BOT' }), false);
  t.is(lib.isMentionMessage({ message: { text: 'Hello, world!' }, botId: 'BOT' }), false);
});

test('isValidMessage', (t) => {
  t.is(lib.isValidMessage({ message: { bot_id: 'BOT', text: '', channel: 'DIRECT' }, botId: 'BOT' }), false);
  t.is(lib.isValidMessage({ message: { user: 'BOT', text: '', channel: 'DIRECT' }, botId: 'BOT' }), false);
  t.is(lib.isValidMessage({ message: { user: 'USER', channel: 'DIRECT' }, botId: 'BOT' }), false);
  t.is(lib.isValidMessage({ message: { user: 'USER', text: '', channel: 'CHANNEL' }, botId: 'BOT' }), false);

  t.is(lib.isValidMessage({ message: { user: 'USER', text: '<@BOT> help', channel: 'CHANNEL' }, botId: 'BOT' }), true);
  t.is(lib.isValidMessage({ message: { user: 'USER', text: 'help', channel: 'DIRECT' }, botId: 'BOT' }), true);
});

test('getCommand', (t) => {
  t.is(lib.getCommand({ message: { text: 'help' }, botId: 'BOT' }), 'help');
  t.is(lib.getCommand({ message: { text: 'Hey <@BOT>   send X to Y  ' }, botId: 'BOT' }), 'send X to Y');

  t.is(lib.getCommand({ message: { text: '<@BOT> help' }, botId: 'BOT' }), 'help');
  t.is(lib.getCommand({ message: { text: 'Hey <@BOT>   send X to Y  ' }, botId: 'BOT' }), 'send X to Y');

  t.is(lib.getCommand({ message: { text: '<@USER> what\'s up? <@BOT> help' }, botId: 'BOT' }), 'help');
  t.is(lib.getCommand({ message: { text: '<@USER> what\'s up?' }, botId: 'BOT' }), '<@USER> what\'s up?');
});

test('getResponseChannel', (t) => {
  t.is(lib.getResponseChannel({ message: { channel: 'DIRECT' } }), 'DIRECT');
  t.is(lib.getResponseChannel({ message: { channel: 'CHANNEL' } }), 'CHANNEL');
});

test('parseUsers', (t) => {
  const data = {
    members: [
      { id: 'SLACKBOT', name: 'slackbot', is_bot: false },
      { id: 'USER', name: 'USER', is_bot: false },
      { id: 'BOT', name: 'BOT', is_bot: true },
    ],
  };

  t.is(lib.parseUsers(data), [{ id: 'USER' }]);
});
