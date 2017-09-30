const logger = require('./logger');
const storage = require('./storage');
const slack = require('./slack');

module.exports = {
  slack,
  logger,
  storage,
};
