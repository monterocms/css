const hash = require('object-hash')

module.exports = function hashConfig(config) {
  return hash(config, { ignoreUnknown: true })
}
