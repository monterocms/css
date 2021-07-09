const postcss = require('postcss')
const cloneNodes = require('./cloneNodes')

module.exports = function wrapWithLayer (rules, layer) {
    return postcss
      .atRule({
        name: 'layer',
        params: layer
      })
      .append(cloneNodes(Array.isArray(rules) ? rules : [rules]))
  }
  