const _ = require('lodash')
const path = require('path')

module.exports = function resolveConfigPath(filePath) {
  // require('@montero/css')({ theme: ..., variants: ... })
  if (_.isObject(filePath) && !_.has(filePath, 'config') && !_.isEmpty(filePath)) {
    return undefined
  }

  // require('@montero/css')({ config: 'custom-config.js' })
  if (_.isObject(filePath) && _.has(filePath, 'config') && _.isString(filePath.config)) {
    return path.resolve(filePath.config)
  }

  // require('@montero/css')({ config: { theme: ..., variants: ... } })
  if (_.isObject(filePath) && _.has(filePath, 'config') && _.isObject(filePath.config)) {
    return undefined
  }

  // require('@montero/css')('custom-config.js')
  if (_.isString(filePath)) {
    return path.resolve(filePath)
  }

  // require('@montero/css')
  for (const configFile of ['./montero.config.js']) {
    try {
      const configPath = path.resolve(configFile)
      fs.accessSync(configPath)
      return configPath
    } catch (err) {}
  }

  return undefined
}
