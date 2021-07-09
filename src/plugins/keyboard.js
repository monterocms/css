module.exports = () => function ({ defineComponent, theme }) {
  defineComponent('kbd', {
    baseStyle: {
      display: 'inline-block',
      paddingInline: '0.4em',
      background: theme('colors.gray.100'),
      borderRadius: theme('radii.md'),
      borderWidth: '1px 1px 3px',
      borderColor: theme('colors.gray.200'),
      color: theme('colors.gray.900'),
      fontFamily: theme('font.mono'),
      fontSize: theme('font-size.xs'),
      fontWeight: theme('font-weight.bold'),
      lineHeight: theme('leading.base'),
      whiteSpace: 'nowrap',
    },
  })
}