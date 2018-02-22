const locales = require('../locales');

class BaseContext {
  constructor(service, bot, user) {
    this.service = service;
    this.bot = bot;
    this.user = user;
  }

  async setBotId(botId) {
    const bot = await this.bot.findOrCreate({ service: this.service });

    await bot.update({ botId });
  }

  async getBotId() {
    const bot = await this.bot.findOne({ service: this.service });

    return bot.botId;
  }

  async getUser(userId) {
    return this.user.findOrCreate({ userId });
  }

  async tip(userId, amount) {
    return this.user.tip(userId, amount);
  }

  async withdraw(userId, amount) {
    return this.user.withdraw(userId, amount);
  }

  async rank(sortBy) {
    return this.user.rank(sortBy);
  }

  t(key, data) {
    return locales.t(`${this.service.toLowerCase()}:${key}`, data);
  }
}


module.exports = BaseContext;
