const postcss = require('postcss')
const _ = require('lodash')

const processPlugins = require('./lib/processPlugins')
const corePlugins = require('./lib/corePlugins')
const evaluateFunctions = require('./lib/evaluateFunctions')
const removeControlFlowMarkers = require('./lib/removeControlFlowMarkers')

const cloneNodes = require('./utils/cloneNodes')
const substituteAtRules = require('./lib/substituteAtRules')
const substituteScreenAtRules = require('./lib/substituteScreenAtRules')
const applyImportantConfiguration = require('./lib/applyImportantConfiguration')
const convertLayerAtRulesToControlComments = require('./lib/convertLayerAtRulesToControlComments')

const hash = require('./utils/hashConfig')
const {shared} = require('./utils/disposables')

let previousConfig = null
let processedPlugins = null
let getProcessedPlugins = null

module.exports = function processFeatures (getConfig) {
  return (css, result) => {
    const config = getConfig()
    const configChanged = hash(previousConfig) !== hash(config)
    previousConfig = config

    if (configChanged) {
      shared.dispose()

      processedPlugins = processPlugins(
        [...corePlugins(config), ..._.get(config, 'plugins', [])],
        config
      )

      getProcessedPlugins = function () {
        return {
          ...processedPlugins,
          base: cloneNodes(processedPlugins.base),
          components: cloneNodes(processedPlugins.components),
          utilities: cloneNodes(processedPlugins.utilities),
        }
      }
    }


    return postcss([
      substituteAtRules(config, getProcessedPlugins()),
      evaluateFunctions(config),
      convertLayerAtRulesToControlComments(),
      substituteScreenAtRules(config),
      applyImportantConfiguration(config),
      removeControlFlowMarkers()
    ]).process(css, {
      from: css?.source?.input?.file
    })
  }
}
