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

function hegtall(hash) {
  return new Promise((resolve) => {
    client.hgetall(hash, (error, result) => resolve(result));
  });
}

function hkeys(hash) {
  return new Promise((resolve) => {
    client.hkeys(hash, (error, result) => resolve(result));
  });
}

function fromJson(object) {
  if (typeof object === 'string') {
    return JSON.parse(object);
  }

  if (typeof object === 'object') {
    const result = {};

    Object.keys(object).forEach((key) => {
      const value = object[key];
      result[key] = JSON.parse(value);
    });

    return result;
  }

  return {};
}

function toJson(object) {
  return JSON.stringify(object);
}

module.exports = {
  set,
  get,
  hsetnx,
  hget,
  hegtall,
  hkeys,

  toJson,
  fromJson,
};
