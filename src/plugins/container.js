module.exports = () => function ({ defineComponent, config, theme }) {
  const component = {
    baseStyle: {
      display: 'block',
      maxWidth: theme(`screens.lg`),
      width: '100%',
      margin: '0 auto',
    },
    variants: {}
  }

  for (const screen in config('theme.screens')) {
    component.variants[screen] = {
      maxWidth: theme(`screens.${screen}`)
    }
  }

  defineComponent('container', component)
}
