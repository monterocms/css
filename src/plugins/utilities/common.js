
module.exports = function () {
    return ({ defineUtility, addUtilities, config, }) => {
      defineUtility({
        class: 'w',
        screens: true,
        property: 'width',
        values: {
            full: '100%',
            screen: '100vw',
        }
      })
      defineUtility({
        class: 'h',
        screens: true,
        property: 'height',
        values: {
            full: '100%',
            screen: '100vh',
        }
      })

      defineUtility({
        class: 'text',
        screens: true,
        property: 'text-align',
        values: ['left', 'center', 'right']
      })

      addUtilities({
        '.block': { display: 'block' },
        '.inline-block': { display: 'inline-block' },
        '.flex': { display: 'flex' },
        '.inline-flex': { display: 'inline-flex' },
        '.grid': { display: 'grid' },
        '.hidden': { display: 'none' },
      })
    }
  }