function log(tag, object = '') {
  console.log(tag, object); // eslint-disable-line
}

function error(tag, object = '') {
  console.error(`[${tag.toUpperCase()}]`, object) // eslint-disable-line
}

module.exports = {
  log,
  error,
};
