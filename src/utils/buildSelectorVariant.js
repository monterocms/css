const parser = require('postcss-selector-parser')
const tap = require('lodash/tap')
const useMemo = require('./useMemo')

const buildSelectorVariant = useMemo(
  (selector, variantName, separator, onError = () => {}) => {
    return parser((selectors) => {
      tap(selectors.first.filter(({ type }) => type === 'class').pop(), (classSelector) => {
        if (classSelector === undefined) {
          onError('Variant cannot be generated because selector contains no classes.')
          return
        }

        classSelector.value = `${variantName}${separator}${classSelector.value}`
      })
    }).processSync(selector)
  },
  (selector, variantName, separator) => [selector, variantName, separator].join('||')
)

module.exports = buildSelectorVariant
