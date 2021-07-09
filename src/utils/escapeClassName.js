const parser = require('postcss-selector-parser')
const get = require('lodash/get')

function escapeCommas (className) {
  return className.replace(/\\,/g, '\\2c ')
}

module.exports = function escapeClassName (className) {
  const node = parser.className()
  node.value = className
  return escapeCommas(get(node, 'raws.value', node.value))
}
