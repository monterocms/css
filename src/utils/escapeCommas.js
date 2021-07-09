module.exports = function escapeCommas (className) {
  return className.replace(/\\,/g, '\\2c ')
}
