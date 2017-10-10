const i18next = require('i18next');

const en = require('./en');

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en,
  },
});

module.exports = i18next;
