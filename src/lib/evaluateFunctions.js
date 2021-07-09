const _ = require('lodash')
const parseValue = require('postcss-value-parser')
const validatePath = require('../utils/validatePath')

const nodeTypePropertyMap = {
  atrule: 'params',
  decl: 'value'
}

const resolveVNode = function (node, vNode, functions) {
  if (vNode.type === 'function' && functions[vNode.value] !== undefined) {
    const args = extractArgs(node, vNode.nodes, functions)
    vNode.type = 'word'
    vNode.value = functions[vNode.value](node, ...args)
  }

  return vNode
}

const extractArgs = function (node, vNodes, functions) {
  vNodes = vNodes.map((vNode) => resolveVNode(node, vNode, functions))

  const args = ['']

  for (const vNode of vNodes) {
    if (vNode.type === 'div' && vNode.value === ',') {
      args.push('')
    } else {
      args[args.length - 1] += parseValue.stringify(vNode)
    }
  }

  return args
}

const resolveFunctions = function (node, input, functions) {
  return parseValue(input)
    .walk((vNode) => {
      resolveVNode(node, vNode, functions)
    })
    .toString()
}

module.exports = function evaluateFunctionsPlugin (config) {
  function token (node, path, ...defaultValue) {
    const { isValid, value, error } = validatePath(
      config,
      path,
      defaultValue.length ? defaultValue : undefined
    )

    if (!isValid) {
      throw node.error(error)
    }

    return value
  }

  function theme (node, path, ...defaultValue) {
    functions.token(node, path, defaultValue)

    path = path.split('.').join('-')

    let quotes = [`'`, `"`]
    if (quotes.includes(path.charAt(0))) {
      path = path.substring(1, path.length - 1)  
    }
    if (quotes.includes(path.charAt(path.length - 1))) {
      path = path.substring(0, path.length - 2)
    }

    return `var(--montero-${path})`
  }

  function ref (node, path, ...defaultValue) {
    // 1. validate path is a valid ref
    // 2. validate the ref value is a valid theme token
    // 3. return the generated css variable name
    const ref = _.get(config.references, path.substring(1, path.length - 1), false)
    if (!ref) {
      throw node.error(new Error(`Invalid ref given. "${path}"`))
    }

    return functions.theme(node, '"' + ref + '"', defaultValue)
  }

  const functions = {
    ref,
    token,
    theme,
    t: theme
  }

  return (root) => {
    root.walk((node) => {
      const property = nodeTypePropertyMap[node.type]

      if (property === undefined) {
        return
      }

      node[property] = resolveFunctions(node, node[property], functions)
    })
  }
}
