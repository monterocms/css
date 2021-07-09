function disposables () {
  const disposables = []

  const api = {
    add (cb) {
      disposables.push(cb)

      return () => {
        const idx = disposables.indexOf(cb)
        if (idx !== -1) disposables.splice(idx, 1)
      }
    },
    dispose () {
      disposables.splice(0).forEach((dispose) => dispose())
    }
  }

  return api
}

// A shared disposables collection
module.exports = {
  disposables,
  shared: disposables()
}
