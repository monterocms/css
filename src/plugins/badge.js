const _ = require('lodash')

module.exports = () => function ({ addComponents, config, t }) {
      const _config = config('theme')

      function bem (blockName) {
        return {
          block: () => `.${blockName}`,
          variant: variant => `.${blockName}--${_.kebabCase(variant)}`,
          child: child => `.${blockName}__${_.kebabCase(child)}`
        }
      }

      const cls = bem('badge')

      const component = {
        [cls.block()]: {
          display: 'inline-block',
          whiteSpace: 'nowrap',
          verticalAlign: 'middle',
          paddingInlineStart: t('space.1'),
          paddingInlineEnd: t('space.1'),
          fontSize: t('font-size.xs'),
          fontWeight: t('font-weight.bold'),
          textTransform: 'uppercase',
          background: t('colors.gray.100'),
          borderRadius: t('radii.sm'),
          color: t('colors.gray.600')
        }
      }

      function tagVariant (color) {
        return {
          color: t(`colors.${color}.700`),
          background: t(`colors.${color}.100`)
        }
      }

      for (const [key, value] of Object.entries(_config.colors)) {
        if (_.isObject(value)) {
          component[cls.variant(key)] = tagVariant(key)
        }
      }

      addComponents(component)
    }