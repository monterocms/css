
module.exports = function () {
  return ({ defineUtility, config, }) => {
    const space = config('theme.space')

    space['0'] = 0
    space['auto'] = 'auto'
    delete space.px

    defineUtility({
      class: 'gap',
      screens: true,
      property: 'gap',
      values: space
    })
    defineUtility({
      class: 'gap-x',
      screens: true,
      property: 'column-gap',
      values: space
    })
    defineUtility({
      class: 'gap-y',
      screens: true,
      property: 'row-gap',
      values: space
    })
  }
}