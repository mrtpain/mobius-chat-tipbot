function botTag(botId) {
  return `<@${botId}>`;
}

function isBotMessage({ bot_id }) {
  return Boolean(bot_id);
}

function isSelfMessage({ user }, botId) {
  return Boolean(user && user === botId);
}

function isMessageWithText({ text }) {
  return Boolean(text);
}

function isDirectMessage({ channel }) {
  return Boolean(channel && channel[0].toUpperCase() === 'D');
}

function isMentionMessage({ text }, botId) {
  const re = new RegExp(botTag(botId), 'g');

  return re.test(text);
}

function isValidMessage(message, botId) {
  if (isBotMessage(message)) return false;
  if (isSelfMessage(message, botId)) return false;
  if (!isMessageWithText(message)) return false;

  if (isDirectMessage(message)) return true;
  if (isMentionMessage(message, botId)) return true;

  return false;
}

function getArgs(text, botId) {
  const tag = botTag(botId);
  const lastIndex = text.lastIndexOf(tag);

  const command = lastIndex < 0
    ? text
    : text.slice(lastIndex).replace(tag, '');

  return command.trim().split(/\W+/);
}

function parseUsers(data) {
  const { members } = data;

  if (!members || members.length === 0) return [];

  return members
    .filter(m => !m.is_bot && m.name !== 'slackbot')
    .map(m => ({
      id: m.id,
      name: `@${m.name}`,
    }));
}

function convertMessageToCommand(message, botId) {
  return {
    channelId: message.channel,
    senderId: message.user,
    args: getArgs(message.text, botId),
  };
}

module.exports = {
  parseUsers,
  isValidMessage,
  convertMessageToCommand,
};
