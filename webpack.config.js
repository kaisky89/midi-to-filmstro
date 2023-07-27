const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.js',
  experiments: {
    outputModule: true,
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: {
      type: 'module',
    },
  },
  devServer: {
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    liveReload: false,
  },
  plugins: [new ESLintPlugin()],
}
