module.exports = function cloneNodes (nodes, source) {
  return nodes.map((node) => {
    const cloned = node.clone()

    if (source !== undefined) {
      cloned.source = source
    }

    return cloned
  })
}
