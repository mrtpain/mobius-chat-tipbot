const i18next = require('i18next');

const slack = require('./slack');
const telegram = require('./telegram');


i18next.init({
  lng: 'en',
  ns: ['slack', 'telegram'],
  resources: {
    en: {
      slack,
      telegram,
    },
  },
});

module.exports = i18next;
