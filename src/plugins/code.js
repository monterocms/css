module.exports = () => function ({ defineComponent, theme }) {
  defineComponent('code', {
    baseStyle: {
      display: 'inline-block',
      paddingInline: '0.2em',
      background: theme('colors.gray.100'),
      borderRadius: theme('radii.sm'),
      color: theme('colors.gray.900'),
      fontFamily: theme('font.mono'),
      fontSize: theme('font-size.sm'),
    },
  })
  defineComponent('code-block', {
    baseStyle: {
      display: 'block',
      paddingInline: theme('space.4'),
      paddingTop: theme('space.4'),
      paddingBottom: theme('space.4'),
      background: theme('colors.gray.100'),
      borderRadius: theme('radii.sm'),
      color: theme('colors.gray.900'),
      fontFamily: theme('font.mono'),
      fontSize: theme('font-size.sm'),
    },
  })
}
