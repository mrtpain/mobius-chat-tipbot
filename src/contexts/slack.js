const redis = require('../services/redis');
const slack = require('../lib/slack');

const BOT_ID = 'SLACK_BOT_ID';
const USERS_ADDRESSES = 'SLACK_USERS_ADDRESSES';

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
      const storedUsers = await redis.hkeys(USERS_ADDRESSES) || [];

      return slackUsers.filter(u => !storedUsers.includes(u.id));
    },

    async getAllUsers() {
      const users = await redis.hegtall(USERS_ADDRESSES) || {};

      return users;
    },

    setUserAddress(userId, address) {
      redis.hsetnx(USERS_ADDRESSES, userId, address);
    },

    async getUserAddress(userId) {
      return redis.hget(USERS_ADDRESSES, userId);
    },

    getUserTag(id) {
      return `<@${id}>`;
    },
  };
}

module.exports = SlackContext;
