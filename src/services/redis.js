const redis = require('redis');
const config = require('../config');

const client = redis.createClient({
  url: config.REDIS_URL,
});

function set(key, value) {
  client.set(key, value);
}

function hsetnx(hash, key, value) {
  client.hsetnx(hash, key, value);
}

function get(key) {
  return new Promise((resolve) => {
    client.get(key, (error, result) => resolve(result));
  });
}

function hget(hash, key) {
  return new Promise((resolve) => {
    client.hget(hash, key, (error, result) => resolve(result));
  });
}

function hkeys(hash) {
  return new Promise((resolve) => {
    client.hkeys(hash, (error, result) => resolve(result));
  });
}

module.exports = {
  set,
  get,
  hsetnx,
  hget,
  hkeys,
};
