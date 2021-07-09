module.exports = () => function ({ defineComponent, theme }) {
  defineComponent('link', {
    baseStyle: {
      textDecoration: 'none',
      display: "inline-block",

      '&:empty': {
        display: 'inline',
        lineHeight: 1,
      },

      '&:not([disabled])': {
        cursor: 'pointer'
      },
      
      '&:hover': {
        color: theme('colors.blue.500'),
        textDecoration: 'underline'
      },
    },
    variants: {
      overlay: {
        content: '',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        zIndex: '2',
        display: 'inline',
      }
    }
  })
}