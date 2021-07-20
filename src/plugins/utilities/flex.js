
module.exports = function () {
  return ({ defineUtility, config, }) => {
    defineUtility({
      class: 'items',
      screens: true,
      property: 'align-items',
      values: ['center', 'start', 'end']
    })
    defineUtility({
      class: 'justifiy',
      screens: true,
      property: 'justify-content',
      values: ['center', 'start', 'end']
    })
  }
}