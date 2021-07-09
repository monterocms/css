// const postcss = require('postcss')
const _ = require('lodash')
const plugin = require('./plugin')
const theme = require('./config')
const formatCSS = require('./utils/formatCSS')

module.exports = (config) => {
  const themeConfig = _.merge(theme, config ?? {})

  // TODO: allow loading config from config.configPath
  // TODO: try loading from monterocss.config.js

  return {
    postcssPlugin: 'montero',
    plugins: [
      plugin(themeConfig),
      formatCSS
    ]
  }
}

module.exports.postcss = true
