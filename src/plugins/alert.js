const _ = require('lodash')

module.exports = () => function ({ defineComponent, theme, config }) {
  function colorScheme(key) {
    return {
      background: theme(`colors.${key}.50`),
      borderColor: theme(`colors.${key}.300`),
      color: theme(`colors.${key}.700`),
    }
  }
  
  defineComponent('alert', {
    baseStyle: {
      display: 'block',
      background: theme('colors.gray.50'),
      borderTopWidth: '4px',
      borderStyle: 'solid',
      borderColor: theme('colors.gray.300'),
      color: theme('colors.gray.700'),
      padding: `${theme('size.4')} ${theme('size.6')}`,
    },
    variants: {
      success: colorScheme('green'),
      danger: colorScheme('red'),
      warning: colorScheme('orange'),
      info: colorScheme('teal'),
    }
  })
}