module.exports = () => function ({
  defineComponent,
  defineStyles,
  defineUtility,
  theme,
  config
}) {
  defineComponent('heading', {
    baseStyle: {
      display: 'block',
      lineHeight: theme('leading.shorter')
    }
  })
  defineComponent('text', {
    baseStyle: {
      display: 'block',
      lineHeight: theme('leading.base')
    }
  })

  defineStyles('components', {
    'ul.list': {
      listStyleType: "disc",
    },
    'ol.list': {
      listStyleType: "decimal",
    }
  })

  defineUtility({
    class: 'text',
    property: 'font-size',
    values: config('theme.font-size')
  })
}
