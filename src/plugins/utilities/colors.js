const _ = require('lodash')

module.exports = () => ({ defineUtility, config, theme }) => {
  const colors = {}
  for (const [key, value] of Object.entries(config('theme.colors'))) {
    // Skip alpha scales
    if (key.toLowerCase().includes('alpha')) {
      continue;
    }

    // Single colors
    if (!_.isObject(value)) {
      colors[key] = theme(`colors.${key}`)
    } else {
      // Color scales
      for (const [k] of Object.entries(value)) {
        colors[`${key}-${k}`] = theme(`colors.${key}.${k}`)
      }
    }
  }

  defineUtility({
    class: 'text',
    property: 'color',
    values: colors
  })

  defineUtility({
    class: 'bg',
    property: 'background-color',
    values: colors
  })
}