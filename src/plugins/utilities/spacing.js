
module.exports = function () {
  return ({ defineUtility, config, }) => {
    const space = config('theme.space')

    space['0'] = 0
    space['auto'] = 'auto'
    delete space.px

    defineUtility({
      class: 'm',
      screens: true,
      property: 'margin',
      values: space
    })
    defineUtility({
      class: 'mx',
      screens: true,
      property: ['margin-left', 'margin-right'],
      values: space
    })
    defineUtility({
      class: 'my',
      screens: true,
      property: ['margin-top', 'margin-bottom'],
      values: space
    })
    defineUtility({
      class: 'mt',
      screens: true,
      property: 'margin-top',
      values: space
    })
    defineUtility({
      class: 'mr',
      screens: true,
      property: 'margin-right',
      values: space
    })
    defineUtility({
      class: 'mb',
      screens: true,
      property: 'margin-bottom',
      values: space
    })
    defineUtility({
      class: 'ml',
      screens: true,
      property: 'margin-left',
      values: space
    })

    defineUtility({
      class: 'p',
      screens: true,
      property: 'padding',
      values: space
    })
    defineUtility({
      class: 'px',
      screens: true,
      property: ['padding-left', 'padding-right'],
      values: space
    })
    defineUtility({
      class: 'py',
      screens: true,
      property: ['padding-top', 'padding-bottom'],
      values: space
    })
    defineUtility({
      class: 'pt',
      screens: true,
      property: 'padding-top',
      values: space
    })
    defineUtility({
      class: 'pr',
      screens: true,
      property: 'padding-right',
      values: space
    })
    defineUtility({
      class: 'pb',
      screens: true,
      property: 'padding-bottom',
      values: space
    })
    defineUtility({
      class: 'pl',
      screens: true,
      property: 'padding-left',
      values: space
    })
  }
}