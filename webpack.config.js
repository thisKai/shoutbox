const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
};
