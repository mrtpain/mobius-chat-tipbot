const config = require('./config');
const mongodb = require('./services/mongodb');
const express = require('./services/express');
const slack = require('./services/slack');
const telegram = require('./services/telegram');

mongodb.start();
express.start();

if (config.SLACK_API_TOKEN) {
  slack.start();
}

if (config.TELEGRAM_BOT_TOKEN) {
  telegram.start();
}
