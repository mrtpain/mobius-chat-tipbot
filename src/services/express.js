const config = require('../config');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/', (request, response) => {
  const apiKey = request.get('Mobius-API-Key');

  if (apiKey !== config.MOBIUS_API_KEY) {
    response.status(403).send('FAIL');
    return;
  }

  response.send('OK');
});


function start() {
  app.listen(3000, () => {
    // console.log('Express app is running on 3000!');
  });
}

module.exports = {
  start,
};
