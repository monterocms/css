const _ = require('lodash')
const postcss = require('postcss')
const hash = require('object-hash')

const processPlugins = require('./lib/processPlugins')
const corePlugins = require('./lib/corePlugins')
const evaluateFunctions = require('./lib/evaluateFunctions')
const removeControlFlowMarkers = require('./lib/removeControlFlowMarkers')

const cloneNodes = require('./utils/cloneNodes')
const shared = require('./utils/disposables').shared
const substituteAtRules = require('./lib/substituteAtRules')
const substituteScreenAtRules = require('./lib/substituteScreenAtRules')
const applyImportantConfiguration = require('./lib/applyImportantConfiguration')
const convertLayerAtRulesToControlComments = require('./lib/convertLayerAtRulesToControlComments')

let previousConfig = null
let processedPlugins = null
let getProcessedPlugins = null

module.exports = function processFeatures (getConfig) {
  return (css, result) => {    
    const { config, configFile } = getConfig()
    
    const configHasChanged = hash(previousConfig, { ignoreUnknown: true }) !== hash(config, { ignoreUnknown: true })

    console.log({prev: hash(previousConfig, { ignoreUnknown: true }), next: hash(config, { ignoreUnknown: true }) })
    
    previousConfig = config

    console.log({
      configHasChanged,
      configFile,
      theme: config,
      oldTheme: previousConfig
    })

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
        utilities: cloneNodes(processedPlugins.utilities)
      }
    }
    
    if (configFile) {
      result.messages.push({
        type: 'dependency',
        parent: result.opts.from,
        file: configFile,
      })
    }

    // console.log({config, configFile})

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
