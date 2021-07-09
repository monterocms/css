const escapeClassName = require('./escapeClassName')
const escapeCommas = require('./escapeCommas')

function asClass (name) {
  return escapeCommas(`.${escapeClassName(name)}`)
}

module.exports = function nameClass (classPrefix, key) {
  if (key === 'DEFAULT') {
    return asClass(classPrefix)
  }

  if (key === '-') {
    return asClass(`-${classPrefix}`)
  }

  if (key.startsWith('-')) {
    return asClass(`-${classPrefix}${key}`)
  }

  return asClass(`${classPrefix}-${key}`)
}
