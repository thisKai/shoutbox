const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config.js');
const compiler = webpack(config);

module.exports = function(app) {
  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
  app.use(require("webpack-hot-middleware")(compiler, {
    reload: true,
  }));
}
