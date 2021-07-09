module.exports = () => function ({ defineComponent, theme }) {
  defineComponent('divider', {
    baseStyle: {
      border: 0,
      display: 'block',
      width: '100%',
      height: theme('size.px'),
      background: theme('colors.gray.200'),
    }
  })
}
