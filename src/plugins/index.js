module.exports = {
  //
  // Base
  //
  variables: require('./variables'),
  reset: require('./reset'),

  //
  // Components
  //
  typography: require('./typography'),
  link: require('./link'),

  // Layout
  stack: require('./stack'),
  grid: require('./grid'),

  avatar: require('./avatar'),
  spinner: require('./spinner'),
  tag: require('./tag'),
  // badge: require('./badge'),
  divider: require('./divider'),

  code: require('./code'),
  keyboard: require('./keyboard'),
  aspectBox: require('./aspectBox'),
  breadcrumb: require('./breadcrumb'),

  // // Feedback
  alert: require('./alert'),

  //
  // Utilities
  //
  colors: require('./utilities/colors'),
  spacing: require('./utilities/spacing'),
  visuallyHidden: require('./utilities/visually-hidden'),
  common: require('./utilities/common'),
}
