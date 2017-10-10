const Mobius = require('@mobius-network/mobius-node');
const config = require('../config');

const mobius = new Mobius({
  apiKey: config.MOBIUS_API_TOKEN,
});

module.exports = mobius;
