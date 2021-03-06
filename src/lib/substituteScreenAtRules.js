const _ = require('lodash')
const buildMediaQuery = require('../utils/buildMediaQuery')

module.exports = function ({ theme }) {
  return function (css) {
    css.walkAtRules('screen', (atRule) => {
      const screen = atRule.params

      if (!_.has(theme.screens, screen)) {
        throw atRule.error(`No \`${screen}\` screen found.`)
      }

      atRule.name = 'media'
      atRule.params = buildMediaQuery(theme.screens[screen])
    })
  }
}
