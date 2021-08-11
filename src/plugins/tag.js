const _ = require('lodash')

module.exports = () => function ({ defineComponent, config, theme }) {
  const colors = config('theme.colors')

  function tagVariant (color) {
    return {
      color: theme(`colors.${color}.700`),
      background: theme(`colors.${color}.100`),
    }
  }

  const component = {
    baseStyle: {
      display: 'inline-flex',
      verticalAlign: 'top',
      alignItems: 'center',
      maxWidth: '100%',
      outline: 'transparent solid 2px',
      outlineOffset: '2px',
      minHeight: theme('size.6'),
      paddingInlineStart: theme('space.2'),
      paddingInlineEnd: theme('space.2'),
      fontSize: theme('font-size.sm'),
      fontWeight: theme('font-weight.medium'),
      lineHeight: theme('leading.none'),
      background: theme('colors.gray.200'),
      border: '1px solid transparent',
      color: theme('colors.gray.700'),
      borderRadius: theme('radii.base')
    },
    variants: {
      sm: {
        minHeight: theme('space.4'),
        fontSize: theme('font-size.xs')
      },
      lg: {
        minHeight: theme('space.8'),
        fontSize: theme('font-size.md'),
        paddingInlineStart: theme('space.3'),
        paddingInlineEnd: theme('space.3')
      }
    }
  }

  for (const [key, value] of Object.entries(colors)) {
    if (_.isObject(value)) {
      component.variants[key] = tagVariant(key)
    }
  }

  defineComponent('tag', component)
}
