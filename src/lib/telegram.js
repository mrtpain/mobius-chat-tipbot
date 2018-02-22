const Command = require('./command');


function isValidMessage() {
  return true;
}


function convertMessageToCommand(message, botName) {
  const entity = message.entities
    .filter(e => e.type === 'bot_command')[0];

  const name = message.text
    .slice(entity.offset, entity.length);

  const args = message.text.replace(name, '').trim().split(/\s+/);

  return new Command({
    service: 'Telegram',
    channelId: message.chat.id,
    senderId: `@${message.from.username}`,
    name: name.replace(`@${botName}`, '').replace('/', ''),
    args,
  });
}


module.exports = {
  convertMessageToCommand,
  isValidMessage,
};
