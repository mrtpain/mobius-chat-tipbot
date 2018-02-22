const mongoose = require('mongoose');
const config = require('../config');
const { findOrCreate } = require('../lib/mongodb');


const botSchema = mongoose.Schema({
  service: {
    type: String,
    index: true,
    unique: true,
  },
  botId: String,
});

botSchema.statics.findOrCreate = findOrCreate;


const userSchema = mongoose.Schema({
  userId: {
    type: String,
    index: true,
    unique: true,
  },
  numTokens: { type: Number, default: 0 },
  numTokensLifetime: { type: Number, default: 0 },
});

userSchema.statics.findOrCreate = findOrCreate;

userSchema.statics.rank = async function rank(sortBy) {
  return this.find({}).sort({ [sortBy]: -1 }).limit(10);
};

userSchema.statics.tip = async function tip(userId, amount) {
  const user = await this.findOrCreate({ userId });

  const numTokens =
    parseInt(user.numTokens, 10) + parseInt(amount, 10);
  const numTokensLifetime =
    parseInt(user.numTokensLifetime, 10) + parseInt(amount, 10);

  await user.update({ numTokens, numTokensLifetime });
};

userSchema.statics.withdraw = async function withdraw(userId, amount) {
  const user = await this.findOrCreate({ userId });

  const numTokens =
    parseInt(user.numTokens, 10) - parseInt(amount, 10);

  await user.update({ numTokens });
};


const Bot = mongoose.model('Bot', botSchema);
const SlackUser = mongoose.model('SlackUser', userSchema);
const TelegramUser = mongoose.model('TelegramUser', userSchema);


function start() {
  mongoose.connect(config.MONGODB_URL);
}

module.exports = {
  models: {
    Bot,
    SlackUser,
    TelegramUser,
  },

  start,
};
