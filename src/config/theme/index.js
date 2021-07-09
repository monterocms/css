const colors = require('./colors')
const spacing = require('./spacing')
const sizes = require('./sizes')
const radii = require('./radii')
const typography = require('./typography')
const zIndices = require('./z-index')
const shadow = require('./shadow')

module.exports = {
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  'z-indices': zIndices,
  radii,
  ...typography,
  colors,
  space: spacing,
  size: sizes,
  shadow,
}
