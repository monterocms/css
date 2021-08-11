const merge = require('lodash/merge')
const defaultTheme = require('./defaultTheme')

module.exports = function extendTheme(theme = {}) {
  return merge(defaultTheme, theme)
}
