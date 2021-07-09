const { css } = require('../tools/syntax')

module.exports = () => function ({ postcss, defineStyles, defineComponent, theme }) {
  const keyframes = postcss.parse(css`
    @keyframes rotate360 {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
  `)

  defineStyles('base', keyframes.nodes)

  defineComponent('spinner', {
    baseStyle: {
      '--track-color': 'transparent',
      '--bar-color': 'currentColor',
      '--thickness': '2px',
      '--size': theme('size.6'),
      '--speed': '0.45s',

      borderRadius: '9999px',
      borderTop: 'var(--thickness) solid var(--bar-color)',
      borderRight: 'var(--thickness) solid var(--bar-color)',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderBottomWidth: 'var(--thickness)',
      borderLeftWidth: 'var(--thickness)',
      borderBottomColor: 'var(--track-color)',
      borderLeftColor: 'var(--track-color)',

      display: 'inline-block',
      flexShrink: '0',
      width: 'var(--size)',
      height: 'var(--size)',

      animation: 'var(--speed) linear 0s infinite normal none running rotate360',
    },
    variants: {
      xs: {
        '--size': theme('size.4'),
      },
      sm: {
        '--size': theme('size.5'),
      },
      lg: {
        '--size': theme('size.8'),
      },
      xl: {
        '--size': theme('size.10'),
      },
      fast: {
        '--speed': "0.278s"
      },
      slow: {
        '--speed': "0.75s"
      }
    }
  })
}