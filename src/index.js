const express = require('express');

const app = express();
const port = process.env.PORT || 8000;

app.get('/', (_, response) => {
  response.send('It works!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`); // eslint-disable-line
});
