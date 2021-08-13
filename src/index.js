const _ = require('lodash')
const plugin = require('./plugin')
const formatCSS = require('./utils/formatCSS')
const getModuleDependencies = require('./lib/getModuleDependencies')
const registerConfigAsDependency = require('./lib/registerConfigAsDependency')
const resolveConfigPath = require('./lib/resolveConfigPath')
const defaultConfig = require('./defaultConfig')

const getConfigFunction = (config) => () => {
  if (_.isUndefined(config)) {
    // console.log("Using default config");
    return defaultConfig
  }

  if (!_.isObject(config)) {
    getModuleDependencies(config).forEach((mdl) => {
      delete require.cache[require.resolve(mdl.file)]
    })
  }

  try {
    return _.isObject(config)
      ? _.get(config, 'config', config)
      : require(config)
  } catch (error) {
    console.log(error)
  }
}


module.exports = (options) => {
  let configPath = resolveConfigPath(options)
  let getConfig = getConfigFunction(configPath || options)

  const plugins = []

  if (!_.isUndefined(configPath)) {
    plugins.push(registerConfigAsDependency(configPath))
  }

  return {
    postcssPlugin: 'montero',
    plugins: [
     ...plugins,
      plugin(getConfig),
      formatCSS
    ]
  }
}

module.exports.postcss = true
