const redis = require('../services/redis');
const slack = require('../lib/slack');

const BOT_ID = 'SLACK_BOT_ID';
const USERS = 'SLACK_USERS';

function SlackContext(bot) {
  return {
    setBotId(botId) {
      redis.set(BOT_ID, botId);
    },

    async getBotId() {
      return redis.get(BOT_ID);
    },

    async getChatUsers() {
      return slack.parseUsers(await bot.getUsers());
    },

    async getNewUsers() {
      const slackUsers = await this.getChatUsers();
      const storedUsers = await redis.hkeys(USERS) || [];

      return slackUsers.filter(u => !storedUsers.includes(u.id));
    },

    async getAllUsers() {
      return redis.hegtall(USERS).then(redis.fromJson);
    },

    setUser(userId, { uid, address }) {
      redis.hsetnx(USERS, userId, redis.toJson({ uid, address }));
    },

    async getUser(userId) {
      return redis.hget(USERS, userId).then(redis.fromJson);
    },

    getUserTag(id) {
      return `<@${id}>`;
    },
  };
}

module.exports = SlackContext;
