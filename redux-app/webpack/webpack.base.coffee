_ = require("lodash")
path = require('path')
webpack = require('webpack')
HtmlWebpackPlugin = require('html-webpack-plugin')
ExtractTextPlugin = require("extract-text-webpack-plugin")
autoprefixer = require("autoprefixer")

env = process.env.NODE_ENV or "development"

APP_BASE = path.join(__dirname, "../src")
INCLUDE_PATHS = [APP_BASE]

cjsxLoaders = ['coffee-loader', 'cjsx']
if env is "development"
  cjsxLoaders.unshift("react-hot")

shouldAutoPrefix = env is "production"
sassLoaders = [
  'css', 
  'postcss-loader', 
  'resolve-url',
  'sass-loader?sourceMap'
]

console.log "cjsxLoaders: ", cjsxLoaders

if not shouldAutoPrefix
  sassLoaders = _.filter sassLoaders, (l)-> l isnt 'postcss-loader'

loaders = []

# JS/CS/JSX

loaders.push
  test: /\.cjsx$/
  include: INCLUDE_PATHS
  loaders: cjsxLoaders

loaders.push
  include: INCLUDE_PATHS
  test: /\.coffee$/
  loader: 'coffee-loader'

loaders.push
  include: APP_BASE
  test: /\.json$/
  loader: 'json-loader'

# SCSS/CSS

## Only extract CSS in production builds (keeps HMR in dev)

cssLoader = if env isnt "development"
  ExtractTextPlugin.extract("style", "css")
else
  "style!css" 

scssLoader = if env isnt "development"
  ExtractTextPlugin.extract(sassLoaders.join('!'))
else
  "style!#{sassLoaders.join('!')}"

loaders.push
  test: /\.css$/
  loader: cssLoader

loaders.push
  test: /\.scss$/
  include: APP_BASE
  loader: scssLoader

# Static Assets

loaders.push
  include: APP_BASE
  test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/
  loader: 'file-loader?name=[path][name].[ext]'

loaders.push
  include: APP_BASE
  test: /\.(png|jpg|gif|jpeg?)(\?[a-z0-9]+)?$/
  loader: 'file?name=[path][name].[ext]'

config =

  contentBase: APP_BASE
  cache: yes  

  entry:
    app: './src/'

  resolve:
    extensions: ['', '.js', '.jsx', '.cjsx', '.coffee', '.html']
    modulesDirectories: ['node_modules', 'app', 'vendor']
    alias: {}

  output:
    filename: "[name].[hash].bundle.js",
    chunkFilename: "[id].[hash].bundle.js"

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(
      'process.env': 
        NODE_ENV: "#{JSON.stringify(env)}"
    ),
    new HtmlWebpackPlugin(
      template: './src/assets/index.html'
      inject: 'body'
      filename: 'index.html'
    ),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new ExtractTextPlugin("[name].[hash].css")    
  ]

  module:
    noParse: [],
    loaders: loaders
  sassLoader:
    includePaths: [APP_BASE]


if shouldAutoPrefix
  _.extend config,
    postcss: [autoprefixer({ browsers: ['last 2 versions'] })]


module.exports = config