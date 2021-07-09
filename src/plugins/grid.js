module.exports = () => function () {
    return function ({ defineUtility, theme }) {
      const templateColumns = {}
      Array(12).fill(0).forEach((k,i) => {
        templateColumns[i+1] = `repeat(${i+1}, minmax(0, 1fr))`
      })

      defineUtility('grid', {
        class: null,
        property: 'display',
        values: {
            grid: 'grid'
        }
      })
      defineUtility({
          class: 'grid-cols',
          property: 'gridTemplateColumns',
          values: {
              ...templateColumns,
              none: 'none'
          }
      })
    }
  }
