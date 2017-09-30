function unknown() {
  return new Promise((resolve) => {
    resolve({ text: 'Unknown command' });
  });
}

module.exports = unknown;
