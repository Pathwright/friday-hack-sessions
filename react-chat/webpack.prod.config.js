var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
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
      loaders: ['react-hot', 'coffee', 'cjsx'],
      include: path.join(__dirname, 'src')
    },{
      test: /\.coffee?$/,
      loaders: ['react-hot', 'coffee'],
      include: path.join(__dirname, 'src')
    },{
      test: require.resolve("react"),
      loader: "expose?React"
    },{
      test: /\.json?$/,
      loader: "json"
    },{ 
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "url-loader?limit=10000&minetype=application/font-woff" 
    },{ 
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "file-loader" 
    },{
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }]
  }
};
