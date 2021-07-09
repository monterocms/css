
module.exports = function () {
    return ({ defineUtility, config, }) => {
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
    }
  }