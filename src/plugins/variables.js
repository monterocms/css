const buildCSSThemeVariables = require('../utils/buildCSSThemeVariables')

module.exports = () => function ({ postcss, defineStyles, config }) {
  const theme = config('theme')
  const variables = buildCSSThemeVariables(theme)

  const vars = [];
  for (let key in variables) {
    vars.push(`${key}: ${variables[key]};`)
  }

  const { nodes } = postcss.parse(`:root {
    ${vars.join('\n')}
  }`)

  defineStyles('base', [...nodes])
}
