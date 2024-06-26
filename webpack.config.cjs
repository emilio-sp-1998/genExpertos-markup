const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const envVars = require('./config/env.json')
//const envVars = require('./config/env.json')

module.exports = function (argv, env) {
    console.log('Webpack Environment defined by USER: ' + env.mode)
  
    const isProduction = env.mode === 'production'
    const isDevelopment = !isProduction
  
    return {
      devtool: isDevelopment && 'cheap-module-source-map',
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash:8].js'
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                envName: isProduction ? 'production' : 'development',
              },
            },
          },
          {
            test: /\.m?js$/,
            resolve: {
                fullySpecified: false,
            },
          },
          {
            test: /\.css$/,
            use: [
              isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader',
              "postcss-loader"
            ],
          },
          {
            test: /\.(png|jpg|gif|mp4|ogg|webm|ico)$/i,
            use: {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: '[name].[hash:8].[ext]',
              },
            },
          },
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          },
          {
            test: /\.(eot|otf|ttf|woff|woff2)$/,
            type: 'asset/resource',
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: 'svg-url-loader',
                options: {
                  limit: 10000,
                },
              },
            ],
          },
        ],
      },
      resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.js', '.jsx'],
      },
      plugins: [
        new ProgressBarPlugin({
          format: 'Build [:bar] :percent (:elapsed seconds)',
          clear: false,
        }),
        ,
        isProduction &&
          new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[name].[contenthash:8].chunk.css',
          }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './index.html'),
          favicon: path.resolve(__dirname, './src/favicon.ico'),
          filename: 'index.html',
          inject: 'body',
          excludeChunks: ['server'],
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(
            isProduction ? 'production' : 'development'
          ),
        }),
        // isProduction && new BundleAnalyzerPlugin()
      ].filter(Boolean),
      optimization: {
        minimize: isProduction,
        minimizer: [
          new TerserWebpackPlugin({
            terserOptions: {
              compress: {
                comparisons: false,
                // pure_funcs: isProduction ? ['console.log'] : [], //Elimina los console log en produccion
              },
              mangle: {
                safari10: true,
              },
              output: {
                comments: false,
                ascii_only: true,
              },
              warnings: false,
            },
          }),
          new MiniCssExtractPlugin({
            filename: `[name].[contenthash].css`,
            chunkFilename: `[id].[contenthash].css`,
          }),
        ],
        splitChunks: {
          chunks: 'all',
          minSize: 0,
          maxInitialRequests: 10,
          maxAsyncRequests: 10,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
        runtimeChunk: 'single',
      },
      devServer: {
        port: 3001,
        hot: true,
        compress: true,
        historyApiFallback: true,
        client: {
          overlay: true,
        },
      },
    }
  }