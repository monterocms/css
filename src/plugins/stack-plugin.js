module.exports = {
    stackPlugin: () => ({ defineComponent, defineUtility, theme }) => {
        defineComponent('grid', {
            parts: ['item'],
            baseStyle: {
                root: {
                    display: 'grid',
                    gap: 'theme("space.2")',
                },
                item: {
                    display: 'block'
                }
            },
            screens: {
                md: {
                    root: {
                        background: 'purple',
                    },
                    item: {
                        background: 'paleyellow',
                    }
                }
            },
            variants: {
                flex: {
                    root: {
                        display: 'flex'
                    },
                    item: {
                        color: 'red'
                    }
                }
            }
        })

        // defineUtility({
        //     class: 'm',
        //     property: 'margin',
        //     values: {
        //         0: '0',
        //         1: '0.25rem',
        //         auto: 'auto'
        //     }
        // })
        // defineUtility({
        //     class: 'mx',
        //     property: ['margin-left', 'margin-right'],
        //     values: {
        //         0: '0',
        //         1: '0.25rem',
        //         auto: 'auto'
        //     }
        // })

        // defineUtility({
        //     class: 'title',
        //     property: 'font-size',
        //     values: {
        //         'sm': ['0.85rem', {
        //             lineHeight: 'var(--leading-shorter)'
        //         }]
        //     }
        // })

        // defineUtility({
        //     class: 'text',
        //     property: 'text-align',
        //     screens: ['sm', 'md'],
        //     values: ['left', 'center', 'right']
        // })
    }
}