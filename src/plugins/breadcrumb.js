const { PreviousMap } = require("postcss")

module.exports = () => function ({ defineComponent, theme }) {
  defineComponent('breadcrumb', {
    parts: ['item', 'separator'],
    baseStyle: {
      root: {
        fontSize: theme('font-size.sm'),
        fontWeight: theme('font-weight.medium'),
      },
      item: {
        display: 'inline-flex',
        alignItems: 'center',            
      },
      separator: {
        marginInline: theme('space.2')
      }
    },
  })
}
