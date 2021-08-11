const fs = require('fs')
const postcss = require('postcss')
const CleanCSS = require('clean-css')
const montero = require('../src')

if (!fs.existsSync(`${__dirname}/../dist`)) {
  fs.mkdirSync(`${__dirname}/../dist`)
}

function buildDistFile(filename, config = undefined, outFilename = filename) {
  return new Promise((resolve, reject) => {
    console.log(`Processing ./${filename}.css...`)

    fs.readFile(`./${filename}.css`, (err, css) => {
      if (err) throw err

      return postcss([montero(config), require('autoprefixer')])
        .process(css, {
          from: `./${filename}.css`,
          to: `./dist/${outFilename}.css`,
        })
        .then((result) => {
          fs.writeFileSync(`./dist/${outFilename}.css`, result.css)
          return result
        })
        .then((result) => {
          const minified = new CleanCSS().minify(result.css)
          fs.writeFileSync(`./dist/${outFilename}.min.css`, minified.styles)
        })
        .then(resolve)
        .catch((error) => {
          console.log(error)
          reject()
        })
    })
  })
}

console.info('Building Montero!')

Promise.all([
  buildDistFile('base'),
  buildDistFile('components'),
  buildDistFile('utilities'),
  buildDistFile('montero'),
]).then(() => {
  console.log('Finished Building Montero!')
})
