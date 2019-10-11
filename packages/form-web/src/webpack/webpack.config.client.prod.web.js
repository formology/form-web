const path = require('path');

const paths = require('./paths');
const webpackConfigClientWeb = require('./webpack.config.client.web');

const config = {
  entry: {
    client: path.resolve(__dirname, '../ClientApp.tsx'),
    react: ['react', 'react-dom'],
  },
  mode: 'production',
  optimization: {
    minimize: true,
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    chunkFilename: 'chunk.[chunkhash].js',
    filename: '[name].[chunkhash].js',
    path: paths.dist,
    publicPath: '/bundle/',
  },
};

module.exports = Object.assign({}, webpackConfigClientWeb, config);
