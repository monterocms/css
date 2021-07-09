const fs = require('fs')

module.exports = () => function ({ postcss, defineStyles }) {
    const normalizeStyles = postcss.parse(
        fs.readFileSync(require.resolve('modern-normalize'), 'utf8')
    )
    const normalizeExtendedStyles = postcss.parse(
        fs.readFileSync(`${__dirname}/css/reset.css`, 'utf8')
    )

    defineStyles('base', [
        ...normalizeStyles.nodes,
        ...normalizeExtendedStyles.nodes,
    ])
}
