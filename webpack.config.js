const path = require('path');

module.exports = {
  mode: 'production',
  entry: './main.js',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      }
    ]
  }
};
