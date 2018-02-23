const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const mobius = require('./mobius');

const app = express();

app.use(bodyParser.json());

app.post('/mobius-webhook', (request, response) => {
  const apiKey = request.get('Mobius-API-Key');

  if (apiKey !== config.MOBIUS_API_KEY) {
    response.status(403).send('FAIL');
    return;
  }

  response.send('OK');
});

app.get('/register-uid', (request, response) => {
  if (config.MOBIUS_TOKEN_UID !== '') {
    response.status(405).send('MOBIUS_TOKEN_UID already defined!');
    return;
  }

  response.sendFile(path.join(__dirname, '../pages/register-uid.html'));
});

app.post('/register-uid', async (request, response) => {
  if (config.MOBIUS_TOKEN_UID !== '') {
    response.status(405).send('MOBIUS_TOKEN_UID already defined!');
    return;
  }

  const {
    tokenType, name, symbol, issuer,
  } = request.body;

  try {
    const data = await mobius.tokens.register({
      tokenType, name, symbol, issuer,
    });

    response.send(data);
  } catch (e) {
    response.status(503).send('FAIL');
  }
});


function start() {
  app.listen(3000, () => {});
}

module.exports = {
  start,
};
