const mongodb = require('./services/mongodb');
const express = require('./services/express');
const slack = require('./services/slack');
const telegram = require('./services/telegram');


mongodb.start();
express.start();
slack.start();
telegram.start();
