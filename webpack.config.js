const path = require('path')

module.exports = {
  entry: './src/index.js',
  experiments: {
    outputModule: true
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: {
      // do not specify a `name` here
      type: 'module'
    }
  }
}
