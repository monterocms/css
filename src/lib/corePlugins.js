const configurePlugins = require('../utils/configurePlugins')
const plugins = require('../plugins')

module.exports = function (config) {
  return configurePlugins(config.corePlugins, Object.keys(plugins)).map((pluginName) => {
    return plugins[pluginName]()
  })
}
