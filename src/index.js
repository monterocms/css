const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const plugin = require('./plugin')
const baseConfig = require('./config')
const formatCSS = require('./utils/formatCSS')

function getConfigPath(filePath) {
  // require('@montero/css')({ theme: ..., references: ... })
  if (_.isObject(filePath) && !_.has(filePath, 'config') && !_.isEmpty(filePath)) {
    return undefined
  }

  // require('@montero/css')({ config: 'my-config.js' })
  if (_.isObject(filePath) && _.has(filePath, 'config') && _.isString(filePath.config)) {
    return path.resolve(filePath.config)
  }

  // require('@montero/css')({ config: { theme: ..., references: ... }})
  if (_.isObject(filePath) && _.has(filePath, 'config') && _.isObject(filePath.config)) {
    return undefined
  }

  // require('@montero/css')('my-config.js')
  if (_.isString(filePath)) {
    return path.resolve(filePath)
  }

  // require('@montero/css')
  try {
    const configPath = path.resolve('./montero.config.js')
    fs.accessSync(configPath)
    return configPath
  } catch (err) {}

  return undefined
}

function getConfig(options) {
  if (!options) {
    options = baseConfig
  }
  if (_.has(options, 'config')) {
    options = options.config
  }
  if (!_.has(options, 'theme')) {
    options.theme = baseConfig.theme
  }
  if (_.has(options, 'extend') && _.isObject(options, 'extend')) {
    options.theme = _.merge(options.theme, options.extend)
    delete options.extend
  }
  return options
}


module.exports = (options) => {
  let configPath = getConfigPath(options)
  let config = configPath ? getConfig(require(configPath)) : getConfig(options)
  
  return {
    postcssPlugin: 'montero',
    plugins: [
      plugin(config),
      formatCSS
    ]
  }
}

module.exports.postcss = true
