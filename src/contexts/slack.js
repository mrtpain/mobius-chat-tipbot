const mongodb = require('../services/mongodb');
const BaseContext = require('./base');


class SlackContext extends BaseContext {
  constructor() {
    super('SLACK', mongodb.models.Bot, mongodb.models.SlackUser);
  }

  getUserTag(id) {
    return `<@${id}>`;
  }
}

module.exports = SlackContext;
