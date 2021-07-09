const parser = require('postcss-selector-parser')
const tap = require('lodash/tap')

module.exports = function (prefix, selector) {
  const getPrefix =
    typeof prefix === 'function' ? prefix : () => (prefix === undefined ? '' : prefix)

  return parser((selectors) => {
    selectors.walkClasses((classSelector) => {
      tap(classSelector.value, (baseClass) => {
        classSelector.value = `${getPrefix('.' + baseClass)}${baseClass}`
      })
    })
  }).processSync(selector)
}
