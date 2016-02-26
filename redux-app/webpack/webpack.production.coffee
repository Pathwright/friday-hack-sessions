webpack = require('webpack')
CompressionPlugin = require("compression-webpack-plugin")

_ = require('lodash')
path = require('path')

config = require('./webpack.base')

config.output = _.extend config.output,
  path: path.join(__dirname, '../build')
  publicPath: '/'
  filename: '[name]-bundle-[chunkhash].js'
  chunkFilename: '[id]-bundle-[chunkhash].js'

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin(
    screw_ie8: true
    warnings: false
    sourceMap: false
  )
)

module.exports = config