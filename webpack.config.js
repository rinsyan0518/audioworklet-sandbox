const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

function resolve(p) {
  return path.resolve(__dirname, p);
}

const baseConfig = {
  mode: 'development',
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.wasm'],
  }
}

const browserConfig = webpackMerge(baseConfig, {
  entry: {
    node: resolve('./src/audioworkletnode.js')
  },
  output: {
    publicPath: '/',
    libraryTarget: 'umd'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('public/index.html')
    })
  ],
  devServer: {
    contentBase: resolve('dist'),
    inline: false,
    host: '0.0.0.0',
    port: 3000,
    disableHostCheck: true
  }
});

const processorConfig = webpackMerge(baseConfig, {
  target: 'webworker',
  entry: {
    processor: resolve('./src/audioworkletprocessor.js')
  },
  output: {
    globalObject: 'AudioWorkletGlobalScope'
  }
});

module.exports = [
  browserConfig,
  processorConfig,
]