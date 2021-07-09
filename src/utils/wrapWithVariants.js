const postcss = require('postcss')
const cloneNodes = require('./cloneNodes')

module.exports = function wrapWithVariants (rules, variants) {
  let foundVariantAtRule = false

  postcss.root({ nodes: rules }).walkAtRules('variants', () => {
    foundVariantAtRule = true
  })

  if (foundVariantAtRule) {
    return cloneNodes(rules)
  }

  return postcss
    .atRule({
      name: 'variants',
      params: variants.join(', ')
    })
    .append(cloneNodes(Array.isArray(rules) ? rules : [rules]))
}
