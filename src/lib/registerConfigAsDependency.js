const fs = require('fs')
const getModuleDependencies = require('./getModuleDependencies')

module.exports = function (configFile) {
  if (!fs.existsSync(configFile)) {
    throw new Error(`Specified Montero config file "${configFile}" doesn't exist.`)
  }

  return function (css, opts) {
    getModuleDependencies(configFile).forEach((mdl) => {
      opts.messages.push({
        type: 'dependency',
        parent: css.source.input.file,
        file: mdl.file,
      })
    })
  }
}
