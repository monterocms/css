module.exports = function applyImportantConfiguration (_config) {
  return css => {
    css.walkRules((rule) => {
      const important = rule.__montero ? rule.__montero.important : false

      if (!important) {
        return
      }

      if (typeof important === 'string') {
        rule.selectors = rule.selectors.map((selector) => {
          return `${rule.__montero.important} ${selector}`
        })
      } else {
        rule.walkDecls((decl) => (decl.important = true))
      }
    })
  }
}
