var path = require('path')

module.exports = {
  devtool: "eval-source-map",
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index.coffee'
  ],
  output: [
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("development")
      }
    }),    
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.cjsx', '.coffee', '.json']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    },{
      test: /\.cjsx?$/,
      loader: 'react-hot!coffee!cjsx',
      include: path.join(__dirname, 'src')
    },{
      test: /\.coffee?$/,
      loaders: ['react-hot', 'coffee'],
      include: path.join(__dirname, 'src')
    },{
      test: /\.json?$/,
      loader: "json"
    }]
  }  
}