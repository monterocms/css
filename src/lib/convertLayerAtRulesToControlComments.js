const postcss = require('postcss')

module.exports = function convertLayerAtRulesToControlComments () {
  return css => {
    css.walkAtRules('layer', (atRule) => {
      const layer = atRule.params

      if (!['base', 'components', 'utilities'].includes(layer)) {
        return
      }

      atRule.before(postcss.comment({ text: `montero start ${layer}` }))
      atRule.before(atRule.nodes)
      atRule.before(postcss.comment({ text: `montero end ${layer}` }))
      atRule.remove()
    })
  }
}
