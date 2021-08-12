const _ = require('lodash')
const postcss = require('postcss')
const Node = require('postcss/lib/node')
const transformThemeValue = require('./transformThemeValue')

const escapeClassName = require('../utils/escapeClassName')
const parseObjectStyles = require('../utils/parseObjectStyles')
const prefixSelector = require('../utils/prefixSelector')

const wrapWithLayer = require('../utils/wrapWithLayer')
const wrapWithScreenAtRule = require('../utils/wrapWithScreenAtRule')

function parseStyles (styles) {
  if (!Array.isArray(styles)) {
    return parseStyles([styles])
  }
  return _.flatMap(styles, (style) => (style instanceof Node ? style : parseObjectStyles(style)))
}

function isKeyframeRule (rule) {
  return (
    rule.parent &&
    rule.parent.type === 'atrule' &&
    /keyframes$/.test(rule.parent.name)
  )
}

module.exports = function (plugins, config) {
  const pluginBaseStyles = []
  const pluginComponents = []
  const pluginUtilities = []

  const getConfigValue = (path, defaultValue) => {
    return (path ? _.get(config, path, defaultValue) : config)
  }

  const applyConfiguredPrefix = (selector) => {
    return prefixSelector(config.prefix, selector)
  }

  const addUtilities = (utilities) => {
    const options = {
      variants: [],
      respectPrefix: true,
      respectImportant: true
    }

    const styles = postcss.root({
      nodes: parseStyles(utilities)
    })

    styles.walkRules((rule) => {
      if (options.respectPrefix && !isKeyframeRule(rule)) {
        rule.selector = applyConfiguredPrefix(rule.selector)
      }

      if (options.respectImportant && config.important) {
        rule.__montero = {
          ...rule.__montero,
          important: config.important
        }
      }
    })

    pluginUtilities.push(
      wrapWithLayer(styles.nodes, 'utilities')
    )
  }

  plugins.forEach((plugin) => {
    if (plugin.__isOptionsFunction) {
      plugin = plugin()
    }

    const handler = _.isFunction(plugin) ? plugin : _.get(plugin, 'handler', () => {})

    function token (path, defaultValue) {
      const [pathRoot, ...subPaths] = _.toPath(path)
      const value = getConfigValue(['theme', pathRoot, ...subPaths], defaultValue)

      return transformThemeValue(pathRoot)(value)
    }

    function theme (path, defaultValue) {
      token(path, defaultValue)

      path = path.split('.').join('-')

      return `var(--montero-${path})`
    }

    function ref (path, defaultValue) {
      const reference = _.get(config.references, path, false)
      if (!reference) {
        throw new Error(`Invalid ref given. "${path}"`)
      }
      return theme(reference, defaultValue)
    }

    handler({
      postcss,
      config: getConfigValue,

      token,
      theme,
      t: theme,
      v: theme,
      ref,
      r: ref,

      corePlugins: (path) => {
        if (Array.isArray(config.corePlugins)) {
          return config.corePlugins.includes(path)
        }

        return getConfigValue(`corePlugins.${path}`, true)
      },

      // variants: (path, defaultValue) => {
      //   if (Array.isArray(config.variants)) {
      //     return config.variants
      //   }

      //   return getConfigValue(`variants.${path}`, defaultValue)
      // },

      e: escapeClassName,
      prefix: applyConfiguredPrefix,

      addUtilities,

      // matchUtilities: (matches, { values, variants, respectPrefix, respectImportant }) => {
      //   const modifierValues = Object.entries(values)

      //   const result = Object.entries(matches).flatMap(([name, utilityFunction]) => {
      //     return modifierValues
      //       .map(([modifier, value]) => {
      //         const declarations = utilityFunction(value, {
      //           includeRules (rules, options) {
      //             addUtilities(rules, options)
      //           }
      //         })

      //         if (!declarations) {
      //           return null
      //         }

      //         return {
      //           [nameClass(name, modifier)]: declarations
      //         }
      //       })
      //       .filter(Boolean)
      //   })

      //   addUtilities(result, { variants, respectPrefix, respectImportant })
      // },

      addComponents: (components) => {
        const options = { respectPrefix: true }

        const styles = postcss.root({
          nodes: parseStyles(components)
        })

        styles.walkRules((rule) => {
          if (options.respectPrefix && !isKeyframeRule(rule)) {
            rule.selector = applyConfiguredPrefix(rule.selector)
          }
        })

        pluginComponents.push(
          wrapWithLayer(styles.nodes, 'components')
        )
      },


      addBase: (baseStyles) => {
        pluginBaseStyles.push(wrapWithLayer(parseStyles(baseStyles), 'base'))
      },

      defineStyles: (layer, styleDefinitions) => {
        const options = { respectPrefix: true }
        const styles = postcss.root({
          nodes: parseStyles(styleDefinitions)
        })

        styles.walkRules((rule) => {
          if (options.respectPrefix && !isKeyframeRule(rule)) {
            rule.selector = applyConfiguredPrefix(rule.selector)
          }
        })

        if (layer == 'base') {
          pluginBaseStyles.push(
            wrapWithLayer(styles.nodes, layer)
          )
        }
        if (layer == 'components') {
          pluginComponents.push(
            wrapWithLayer(styles.nodes, layer)
          )
        }
        if (layer == 'utilities') {
          pluginUtilities.push(
            wrapWithLayer(styles.nodes, layer)
          )
        }
      },

      defineComponent: (name, { baseStyle, parts, screens = {}, variants = {}, ...rest }) => {
        const defaults = { respectPrefix: true }
        const options = { ...defaults, ...rest }

        const classNamer = (baseCls) => {
            return {
              block: () => `.${baseCls}`,
              screen: (size) => `.${size}:${baseCls}`,
              modifier: (variant) => `.${baseCls}-${variant}`,
              child: (child) => `.${baseCls}-${child}`,
            }
        }

        let cls = classNamer(name)
        let definitions = {}
        let hasParts = parts && _.isArray(parts) && parts.length

        // Base component
        if (hasParts) {
          let hasPartsDefined = false
          for (let part of parts) {
            if (part in baseStyle) {
              hasPartsDefined = true
              break
            }
          }

          if (!hasPartsDefined) {
            definitions[cls.block()] = baseStyle.root ?? baseStyle
          } else if (baseStyle.root) {
            definitions[cls.block()] = baseStyle.root
          }

          for (let part of parts) {
            definitions[cls.child(part)] = baseStyle[part]
          }
        } else {
          definitions[cls.block()] = baseStyle
        }

        // Variants
        for (const [variant, styleObject] of Object.entries(variants)) {
          if (hasParts) {
            let hasPartsDefined = false
            for (let part of parts) {
              if (part in styleObject) {
                hasPartsDefined = true
                break
              }
            }

            if (!hasPartsDefined) {
              definitions[cls.modifier(variant)] = styleObject.root ?? styleObject
            } else if (styleObject.root) {
              definitions[cls.modifier(variant)] = styleObject.root
            }

            for (let part of parts) {
              if (styleObject[part]) {
                const selectors = [
                  cls.modifier(variant),
                  cls.child(part)
                ]
                definitions[selectors.join(' ')] = styleObject[part]
              } else {
                definitions[cls.modifier(variant)] = styleObject
              }
            }
          } else {
            definitions[cls.modifier(variant)] = styleObject
          }
        }

        const components = [{
          screen: null,
          styles: postcss.root({
            nodes: parseStyles(definitions)
          })
        }]

        // Responsive
        for (const [screen, styleObject] of Object.entries(screens)) {
          let definitionsForScreen = {}

          if (hasParts) {
            let hasPartsDefined = false
            for (let part of parts) {
              if (part in styleObject) {
                hasPartsDefined = true
                break
              }
            }

            if (!hasPartsDefined) {
              definitionsForScreen[cls.block()] = styleObject.root ?? styleObject
            } else if (styleObject.root) {
              definitionsForScreen[cls.block()] = styleObject.root
            }

            for (let part of parts) {
              if (styleObject[part]) {
                const selectors = [
                  cls.block(),
                  cls.child(part)
                ]
                definitionsForScreen[selectors.join(' ')] = styleObject[part]
              }
            }
          }

          components.push({
            screen,
            styles: postcss.root({
              nodes: parseStyles(definitionsForScreen)
            })
          })
        }

        for (const { screen, styles } of components) {
          styles.walkRules((rule) => {
            if (options.respectPrefix && !isKeyframeRule(rule)) {
              rule.selector = applyConfiguredPrefix(rule.selector)
            }
          })

          if (screen) {
            pluginComponents.push(
              wrapWithLayer(wrapWithScreenAtRule(styles.nodes, screen), 'components')
            )
          } else {
            pluginComponents.push(
              wrapWithLayer(styles.nodes, 'components')
            )
          }
        }
      },

      defineUtility: ({ class: baseClass, property, values, ...rest }) => {
        const definitions = {}
        const defaults = { respectPrefix: true, screens: false }
        const options = {
          ...defaults,
          ...rest,
        }

        let screens = []
        if (options.screens === true) {
          screens = Object.keys(getConfigValue('theme.screens', {}))
        }

        const nameClass = util => `.${baseClass ? baseClass + '-' : ''}${util}`
        const buildStyleObject = (property, value) => {
          let styleObject = {}
          let additionalStyles = {}

          if (_.isArray(value)) {
            additionalStyles = { ...value[1] }
            value = value[0]
          }

          if (_.isArray(property)) {
            for (const prop of property) {
              styleObject[prop] = value
            }
          } else {
            styleObject[property] = value
          }

          return {
            ...styleObject,
            ...additionalStyles,
          }
        }

        if (_.isArray(values)) {
          for (const value of values) {
            definitions[nameClass(value)] = buildStyleObject(property, value)
          }
        } else if (_.isObject(values)) {
          for (const [key, value] of Object.entries(values)) {
            definitions[nameClass(key)] = buildStyleObject(property, value)
          }
        } else {
          //  throw error
        }

        const nodes = parseStyles(definitions)
        const utilities = [{
          screen: null,
          styles: postcss.root({ nodes })
        }]

        for (const screen of screens) {
          const styles = postcss.root({ nodes })
          styles.walkRules((rule) => {
            if (!isKeyframeRule(rule)) {
              rule.selector = prefixSelector(`${screen}:`, rule.selector)
            }
          })
          utilities.push({ screen, styles })
        }

        for (const { screen, styles } of utilities) {
          styles.walkRules((rule) => {
            if (options.respectPrefix && !isKeyframeRule(rule)) {
              rule.selector = applyConfiguredPrefix(rule.selector)
            }
          })

          if (screen) {
            pluginUtilities.push(
              wrapWithLayer(wrapWithScreenAtRule(styles.nodes, screen), 'utilities')
            )
          } else {
            pluginUtilities.push(
              wrapWithLayer(styles.nodes, 'utilities')
            )
          }
        }
      },
    })
  })

  return {
    base: pluginBaseStyles,
    components: pluginComponents,
    utilities: pluginUtilities
  }
}
