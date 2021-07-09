module.exports = function (obj) {
  var flattened = {}

  function recurse (current, property) {
    if (!property && Object.getOwnPropertyNames(current).length === 0) {
      return
    }
    if (Object(current) !== current || Array.isArray(current)) {
      flattened[property] = current
    } else {
      var isEmpty = true
      for (var p in current) {
        isEmpty = false
        recurse(current[p], property ? property + '.' + p : p)
      }
      if (isEmpty) {
        flattened[property] = {}
      }
    }
  }
  if (obj) {
    recurse(obj)
  }
  return flattened
}
