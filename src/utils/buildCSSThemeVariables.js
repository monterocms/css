const flattenObject = require('./flattenObject')

module.exports = function buildCSSThemeVariables(theme = {}) {
  const tokens = flattenObject(theme)

  const variables = {}
  for (const [key, value] of Object.entries(tokens)) {
    const prop = `--montero-${key.split('.').join('-')}`
    variables[prop] = String(value)
  }

  return variables
}
