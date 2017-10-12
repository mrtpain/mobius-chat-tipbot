function Command({
  service, senderId, channelId, name, args,
}) {
  return {
    service,
    senderId,
    channelId,
    name,
    args,
  };
}

module.exports = Command;
