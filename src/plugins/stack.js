module.exports = () => function ({ defineComponent, theme }) {
  defineComponent('stack', {
    parts: ['item'],
    baseStyle: {
        root: {
            display: 'flex',
            flexDirection: 'column',
            gap: theme('space.2'),
        },
            item: {
            display: 'block',
            flexShrink: 0
        }
    },
  })
}
