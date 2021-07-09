module.exports = function removeControlFlowMarkers () {
  return css => {
    css.walkAtRules('montero', (rule) => rule.remove())
    css.walkComments((comment) => {
      switch (comment.text.trim()) {
        case 'montero start base':
        case 'montero end base':
        case 'montero start components':
        case 'montero start utilities':
        case 'montero end components':
        case 'montero end utilities':
          comment.remove()
          break
        default:
          break
      }
    })
  }
}
