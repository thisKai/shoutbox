const webpack = require('webpack');
const path = require('path');
const mapValues = require('lodash/mapValues');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './client/index.js',
  ],
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': mapValues(process.env, (value, key) => JSON.stringify(value)),
    }),
  ],
  devtool: 'inline-source-map',
};
