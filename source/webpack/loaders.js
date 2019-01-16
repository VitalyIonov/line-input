const CssExtractPlugin = require('mini-css-extract-plugin');

const { join } = require('path');

function styleLoader(isProduction) {
  const cssLoader = [
    'style-loader',
    CssExtractPlugin.loader,
    'css-loader',
    'resolve-url-loader',
    {
      loader: 'less-loader',
      options: {
        sourceMap: !isProduction
      }
    }
  ];

  return {
    test: /\.(css|less)(\?.+)?$/,
    use: isProduction ? cssLoader.concat({
      loader: 'postcss-loader'
    }) : cssLoader
  };
}

function babelLoader() {
  return {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules)/,
    loader: 'babel-loader',
    options: {
      presets: ['env', 'react']
    }
  };
}

function urlLoader() {
  return {
    test: /\.(png|jpg|svg|gif)$/,
    loader: 'url-loader',
    options: {
      limit: 32768,
      name: join('images', '[name].[ext]')
    }
  };
}

module.exports = {
  styleLoader,
  babelLoader,
  urlLoader
};
