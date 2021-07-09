module.exports = function (pluginConfig, plugins) {
  if (pluginConfig === undefined) {
    return plugins
  }

  const pluginNames = Array.isArray(pluginConfig)
    ? pluginConfig
    : plugins.filter((pluginName) => {
      return pluginConfig !== false && pluginConfig[pluginName] !== false
    })

    console.log({
      pluginNames,
      plugins
    })

  return pluginNames
}
