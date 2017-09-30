function help() {
  return new Promise((resolve) => {
    resolve({ text: 'Some help text' });
  });
}

module.exports = help;
