const cssnano = require('cssnano')

module.exports = {
    plugins: [
      [
        "postcss-preset-env",
        {
          // Options
        },
      ],
      cssnano({
        preset: 'default'
      })
    ],
  }