module.exports = () => function ({ addUtilities }) {
    addUtilities({
        '.visually-hidden': {
            border: '0px',
            clip: 'rect(0px, 0px, 0px, 0px)',
            height: '1px',
            width: '1px',
            margin: '-1px',
            padding: '0px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            position: 'absolute'
        }
    })
}
