const webpack = require('webpack');
const { resolve } = require('path');

const CssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


function developmentPlugins(nodeEnv, isProduction, inputPath, outputPath) {
  return [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(nodeEnv)
    }),
    new CssExtractPlugin({
      filename: isProduction ? 'main.min.css' : 'main.css',
      allChunks: true
    }),
    new CopyWebpackPlugin([
      {
        from: resolve(inputPath, 'images'),
        to: resolve(outputPath, 'images')
      }
    ]),
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
