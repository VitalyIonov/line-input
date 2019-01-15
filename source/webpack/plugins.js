const webpack = require('webpack');

const CssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function developmentPlugins(nodeEnv, isProduction) {
  return [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(nodeEnv)
    }),
    new CssExtractPlugin({
      filename: isProduction ? 'main.min.css' : 'main.css',
      allChunks: true
    })
  ];
}

function productionPlugins() {
  return [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false
        },
        compress: {
          drop_console: true
        }
      }
    })
  ];
}

module.exports = {
  developmentPlugins,
  productionPlugins
};
