const { styleLoader, babelLoader } = require('./source/webpack/loaders');
const { developmentPlugins, productionPlugins } = require('./source/webpack/plugins');

const { join } = require('path');

const { NODE_ENV } = process.env;
const nodeEnv = NODE_ENV || 'development';

const isProduction = nodeEnv === 'production';

const inputPath = join(__dirname, 'source');
const outputPath = join(__dirname, 'dist');

const plugins = developmentPlugins(nodeEnv, isProduction);

module.exports = {
  context: inputPath,

  entry: './scripts/index.jsx',

  output: {
    path: outputPath,
    filename: isProduction ? 'main.min.js' : 'main.js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.less']
  },

  module: {
    rules: [
      babelLoader(),
      styleLoader(isProduction)
    ]
  },

  plugins: isProduction ? plugins.concat(productionPlugins()) : plugins,

  devServer: {
    contentBase: outputPath,
    compress: true,
    port: 9000,
    historyApiFallback: true
  }
};
