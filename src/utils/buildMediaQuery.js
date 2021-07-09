const _ = require('lodash')

module.exports = function buildMediaQuery(screens) {
  if (_.isString(screens)) {
    screens = { min: screens }
  }

  if (!Array.isArray(screens)) {
    screens = [screens]
  }

  return _(screens)
    .map((screen) => {
      if (_.has(screen, 'raw')) {
        return screen.raw
      }

      return _(screen)
        .map((value, feature) => {
          feature = _.get(
            {
              min: 'min-width',
              max: 'max-width',
            },
            feature,
            feature
          )
          return `(${feature}: ${value})`
        })
        .join(' and ')
    })
    .join(', ')
}
