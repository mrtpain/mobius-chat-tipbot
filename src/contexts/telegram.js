const mongodb = require('../services/mongodb');
const BaseContext = require('./base');


class TelegramContext extends BaseContext {
  constructor() {
    super('TELEGRAM', mongodb.models.Bot, mongodb.models.TelegramUser);
  }

  async getBotTag() {
    const botId = await this.getBotId();

    return `@${botId}`;
  }

  getUserTag(id) {
    return `${id}`;
  }
}

module.exports = TelegramContext;
