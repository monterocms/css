const flattenObject = require('../utils/flattenObject')

module.exports = () => function ({ defineStyles, config }) {
  const theme = config('theme')
  const tokens = flattenObject(theme)

  const variables = {}
  for (const [key, value] of Object.entries(tokens)) {
    const prop = `--montero-${key.split('.').join('-')}`
    variables[prop] = String(value)
  }

  defineStyles('base', {
    ':root': {
      ...variables
    }
  })        
}
