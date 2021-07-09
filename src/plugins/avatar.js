module.exports = () => function ({ defineComponent, theme }) {
  defineComponent('avatar', {
      parts: ['img'],
      baseStyle: {
        root: {
          '--size': theme('size.8'),
          borderRadius: '100%',
          display: "inline-flex",
          alignItems: 'center',
          justifyContent: 'center',
          background: theme('colors.gray.600'),
          color: theme('colors.gray.300'),
          overflow: 'hidden',
          flexShrink: '0',
          width: 'var(--size)',
          height: 'var(--size)',
          lineHeight: theme('leading.none'),
          fontSize: theme('font-size.sm'),
        },
        img: {
          objectFit: 'cover',
        }
      },
      variants: {
        xs: {
          '--size': theme('size.6'),
          fontSize: theme('font-size.2xs'),
        },
        sm: {
          '--size': theme('size.7'),
          fontSize: theme('font-size.xs'),
        },
        lg: {
          '--size': theme('size.10'),
          fontSize: theme('font-size.base'),
        },
        xl: {
          '--size': theme('size.12'),
          fontSize: theme('font-size.lg'),
        },            
      }
  })
}