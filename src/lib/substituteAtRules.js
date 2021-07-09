const postcss = require('postcss')
const _ = require('lodash')

function updateSource (nodes, source) {
  return _.tap(Array.isArray(nodes) ? postcss.root({ nodes }) : nodes, (tree) => {
    tree.walk((node) => (node.source = source))
  })
}

module.exports = function (
  _config,
  {
    base: pluginBase,
    components: pluginComponents,
    utilities: pluginUtilities
  }
) {
  return function (css) {
    css.walkAtRules('import', (atRule) => {
      if (atRule.params === '"montero/base"' || atRule.params === "'montero/base'") {
        atRule.name = 'montero'
        atRule.params = 'base'
      }

      if (
        atRule.params === '"montero/components"' ||
        atRule.params === "'montero/components'"
      ) {
        atRule.name = 'montero'
        atRule.params = 'components'
      }

      if (
        atRule.params === '"montero/utilities"' ||
        atRule.params === "'montero/utilities'"
      ) {
        atRule.name = 'montero'
        atRule.params = 'utilities'
      }
    })

    const layers = {
      base: [],
      components: [],
      utilities: []
    }

    css.walkAtRules('layer', (atRule) => {
      if (!['base', 'components', 'utilities'].includes(atRule.params)) {
        return
      }

      layers[atRule.params].push(atRule)
    })

    css.walkAtRules('montero', (atRule) => {
      if (atRule.params === 'base') {
        atRule.after(layers.base)
        atRule.after(updateSource(pluginBase, atRule.source))
      }

      if (atRule.params === 'components') {
        atRule.after(layers.components)
        atRule.after(updateSource(pluginComponents, atRule.source))
      }

      if (atRule.params === 'utilities') {
        atRule.after(layers.utilities)
        atRule.after(updateSource(pluginUtilities, atRule.source))
      }
    })
  }
}
