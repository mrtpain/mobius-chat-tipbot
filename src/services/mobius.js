const Mobius = require('@mobius-network/mobius-node');
const config = require('../config');

const mobius = new Mobius({
  host: config.MOBIUS_API_HOST,
  apiKey: config.MOBIUS_API_KEY,
});

module.exports = mobius;
