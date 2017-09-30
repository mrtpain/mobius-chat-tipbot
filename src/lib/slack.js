function botTag(botId) {
  return `<@${botId}>`;
}

function isBotMessage({ message: { bot_id } }) {
  return Boolean(bot_id);
}

function isSelfMessage({ message: { user }, botId }) {
  return Boolean(user && user === botId);
}

function isMessageWithText({ message: { text } }) {
  return Boolean(text);
}

function isDirectMessage({ message: { channel } }) {
  return Boolean(channel && channel[0].toUpperCase() === 'D');
}

function isMentionMessage({ message: { text }, botId }) {
  const re = new RegExp(botTag(botId), 'g');

  return re.test(text);
}

function isValidMessage(data) {
  if (isBotMessage(data)) return false;
  if (isSelfMessage(data)) return false;
  if (!isMessageWithText(data)) return false;

  if (isDirectMessage(data)) return true;
  if (isMentionMessage(data)) return true;

  return false;
}

function getCommand({ message: { text }, botId }) {
  const tag = botTag(botId);
  const lastIndex = text.lastIndexOf(tag);

  const command = lastIndex < 0
    ? text
    : text.slice(lastIndex).replace(tag, '');

  return command.trim();
}

function getResponseChannel({ message: { channel } }) {
  return channel;
}

module.exports = {
  isBotMessage,
  isSelfMessage,
  isMessageWithText,
  isDirectMessage,
  isMentionMessage,
  isValidMessage,
  getCommand,
  getResponseChannel,
};
