const test = require('ava');
const lib = require('../../src/lib/telegram');


test('convertMessageToCommand 1', (t) => {
  const command = lib.convertMessageToCommand({
    from: { id: 1, username: 'username' },
    chat: { id: -1 },
    text: '/tip@bot @user 10',
    entities: [
      { offset: 0, length: 8, type: 'bot_command' },
      { offset: 9, length: 5, type: 'mention' },
    ],
  }, 'bot');

  t.is(command.name, 'tip');
  t.deepEqual(command.args, ['@user', '10']);
});
