const _ = require('lodash')
const postcss = require('postcss')
const postcssNested = require('postcss-nested')
const postcssJs = require('postcss-js')

module.exports = function parseObjectStyles (styles) {
  if (!Array.isArray(styles)) {
    return parseObjectStyles([styles])
  }

  return _.flatMap(styles, (style) => {
    return postcss([
      postcssNested({
        bubble: ['screen']
      })
    ]).process(style, {
      parser: postcssJs
    }).root.nodes
  })
}
