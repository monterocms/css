const postcss = require('postcss')
const cloneNodes = require('./cloneNodes')

module.exports = function wrapWithScreenAtRule(rules, screen) {
  return postcss
    .atRule({
      name: 'screen',
      params: screen
    })
    .append(cloneNodes(Array.isArray(rules) ? rules : [rules]))
}
