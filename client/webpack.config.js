var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var fs = require('fs');

var distDir = 'dist';
var distPath = path.join(__dirname, distDir);

var config = module.exports = {
  entry: {
    app: [
      './src/index.jsx'
    ]
  },
  devtool: 'inline-source-map',
  output: {
    path: distPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: /src/,
        loaders: ['babel']
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  },
  plugins: [

    new webpack.DefinePlugin({
      __DEBUG__: process.env.NODE_ENV === 'development',
      'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
    }),

    new CleanWebpackPlugin([distDir]),

    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      'Promise': 'imports?this=>global!exports?global.Promise!es6-promise'
    }),

    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      favicon: './favicon.ico',
      minify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeCommentsFromCDATA: true,
        removeOptionalTags: true
      }
    })
  ]
};

if (process.NODE_ENV === 'production') {
  config.devtool = 'none'
  config.output.filename = '[name].[hash].js';
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
} else {
  config.entry.app.push('webpack-hot-middleware/client');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoErrorsPlugin());
}
