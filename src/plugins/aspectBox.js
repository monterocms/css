module.exports = () => function ({ defineComponent }) {
  defineComponent('ratio', {
    baseStyle: {
      '--aspect-ratio': '100%',
      position: 'relative',
      width: '100%',
      height: '0px',
      paddingTop: 'var(--aspect-ratio)',
    },
    variants: {
      '16x9': {
        '--aspect-ratio': ((9/16) * 100).toFixed(3) + '%',
      },
      '6x4': {
        '--aspect-ratio': ((4/6) * 100).toFixed(3) + '%',
      },
      '4x3': {
        '--aspect-ratio': ((3/4) * 100).toFixed(3) + '%',
      }
    }
  })
}
