async function unknown(command, context) {
  const { senderId } = command;
  const user = context.getUserTag(senderId);

  return {
    text: context.t('commands.unknown', { user }),
  };
}

module.exports = unknown;
