const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const production = process.env.NODE_ENV === 'production'
  || process.argv.some(arg => arg === '-p');

const styleModule =  {
  dev: {
    loader: [
      'style-loader',
      {loader: 'css-loader', options: {sourceMap: true}},
      {loader: 'resolve-url-loader', options: {keepQuery: true}},
      {loader: 'sass-loader', options: {sourceMap: true}}
    ],
    test: /\.scss?$/
  },
  prod: {
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'sass-loader']
    }),
    test: /\.(scss|css)$/
  }
};

const config = {
  devtool: production ? false : 'eval-source-map',
  entry: {
    app: './src/index.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: production ? 'assets/js/[name].[chunkhash].js' : 'assets/js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: '/node_modules'
      },
      production ? styleModule.prod : styleModule.dev
    ],
  },
  resolve: {
    extensions: ['.js', '.scss']
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: './src/template/index.html'
    }),
    production ? new ExtractTextPlugin('assets/css/app.css') : null,
    production ? new UglifyJsPlugin() : null
  ].filter(p => p)
};

module.exports = config;