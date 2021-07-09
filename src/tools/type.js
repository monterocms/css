const _ = require("lodash")

const scales = {
    'Minor Second': 1.06,
    'Major Second': 1.125,
    'Minor Third': 1.2,
    'Major Third': 1.25,
    'Perfect Fourth': 1.333,
    'Augmented Fourth': 1.414,
    'Perfect Fifth': 1.5,
    'Golden Ratio': 1.618,
}

// Aliases
scales['Application'] = scales['Major Second']
scales['Website'] = scales['Major Third']

function typeScale(scale, unitsBelowBase = 3, unitsAboveBase = 5) {
    let factor = scale

    if (typeof scale == 'string') {
        if (!scale in scales) {
            throw new Error(`Unknown type scale given: "${scale}"`)
        }
        factor = scales[scale]
    }

    const sizeCache = {
        xs: 0,
        sm: 0,
        lg: 0,
        xl: 0,
    }

    const sizes = {}

    let lastSize = 1
    for (let i = 0; i < unitsBelowBase; i++) {
        let prefix = ''
        let increment = null
        let variantName = sizeCache.sm === 0 ? 'sm' : 'xs'
        
        if (variantName === 'xs' && sizeCache.xs >= 1) {
            increment = i + 1 
        }

        sizeCache[variantName] = sizeCache[variantName] + 1

        lastSize = lastSize / factor
        prefix = sizeCache[variantName] > 1 ? sizeCache[variantName] : ''

        sizes[`${prefix}${variantName}`] = lastSize
    }

    sizes.base = 1

    lastSize = 1
    for (let i = 0; i < unitsAboveBase; i++) {
        let prefix = ''
        let increment = null
        let variantName = sizeCache.lg === 0 ? 'lg' : 'xl'
        
        if (variantName === 'xl' && sizeCache.xl >= 1) {
            increment = i + 1 
        }

        sizeCache[variantName] = sizeCache[variantName] + 1

        lastSize = lastSize * factor
        prefix = sizeCache[variantName] > 1 ? sizeCache[variantName] : ''

        sizes[`${prefix}${variantName}`] = lastSize
    }

    // Sort sizes and transform values to rem units
    return Object.entries(sizes)
        .sort(([,a],[,b]) => a - b)
        .reduce((r, [k, v]) => ({
                ...r,
                [k]: `${v.toFixed(3)}rem`
            }),
        {})
}


module.exports = {
    scales,
    typeScale
}