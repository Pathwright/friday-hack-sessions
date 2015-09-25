var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {stage: 0, plugins: ['./babelRelayPlugin']}
      },
      {
        test: /\.cjsx?$/,
        loaders: ['coffee', 'cjsx'],
      }      
    ]
  },
  output: {filename: 'index.bundle.js', path: './'}
};