function Command({
  senderId, channelId, name, args,
}) {
  return {
    senderId,
    channelId,
    name,
    args,
  };
}

module.exports = Command;
