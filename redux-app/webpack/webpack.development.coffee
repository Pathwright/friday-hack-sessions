path = require("path")
webpack = require('webpack')
_ = require('lodash')

config = require('./webpack.base')
config = _.extend config,
  debug: true
  cache: true
  displayErrorDetails: true
  outputPathinfo: true
  devtool: 'cheap-eval-source-map'

publicPath = "/"

# Enable hot devserver
config.output = _.extend config.output,
  publicPath: publicPath
  path: path.join(__dirname, 'dist')

config.entry.app = [
  'webpack-dev-server/client?' + publicPath,
  'webpack/hot/dev-server'
  './src'
]

config.plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports = config