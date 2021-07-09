const theme = require('./theme')

module.exports = {
  theme,
  // corePlugins: ['pluginToKeep'],
  // corePlugins: {
  //   pluginToDisable: false
  // },
  references: {
    colors: {
      blue: 'colors.blue.500'
    }
  },
  format: {
    componentClassName: (baseCls) => {
      return {
        block: () => `.${baseCls}`,
        screen: (size) => `.${size}:${baseCls}`,
        modifier: (variant) => `.${baseCls}-${variant}`,
        child: (child) => `.${baseCls}-${child}`,
      }
    }
  }, 
}
