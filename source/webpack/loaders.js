const CssExtractPlugin = require('mini-css-extract-plugin');

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

module.exports = {
  styleLoader,
  babelLoader
};
