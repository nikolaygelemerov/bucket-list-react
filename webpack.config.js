/* eslint-disable @typescript-eslint/no-var-requires */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const cssResourcesPath = require(path.join(__dirname, 'src', 'styles', 'shared', 'index.ts'));

const devName = 'public/[name]';
const prodName = 'public/[name].[chunkhash]';

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  const config = {
    entry: {
      app: './src/index.ts'
    },
    output: {
      filename: `${isDev ? devName : prodName}.js`,
      chunkFilename: `${isDev ? devName : prodName}.js`,
      path: path.resolve(__dirname, 'dist'),
      publicPath: isDev ? '/' : './'
    },
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@managers': path.resolve(__dirname, 'src/managers'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@providers': path.resolve(__dirname, 'src/providers'),
        '@root': path.resolve(__dirname, ''),
        '@services': path.resolve(__dirname, 'src/services'),
        '@styles': path.resolve(__dirname, 'src/styles')
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
      rules: [
        {
          test: /\.worker\./,
          use: { loader: 'worker-loader' }
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean)
            }
          }
        },
        {
          test: /\.(woff|woff2|ttf|eot)$/,
          type: 'asset/resource',
          generator: {
            filename: 'public/fonts/[name].[ext]'
          }
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/,
          type: 'asset/resource',
          generator: {
            filename: 'public/images/[name].[ext]'
          }
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 3,
                modules: {
                  localIdentName: '[name]__[local]__container__[hash:base64:5]'
                },
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['autoprefixer']
                }
              }
            },
            {
              loader: 'sass-loader'
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: cssResourcesPath
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({ async: false }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: 'dist'
      }),
      new HtmlWebPackPlugin({
        favicon: './src/favicon.png',
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: `${isDev ? devName : prodName}.css`,
        chunkFilename: `${isDev ? devName : prodName}.css`
      }),
      new webpack.DefinePlugin({
        __mode__: JSON.stringify(argv.mode)
      })
    ],
    optimization: {
      runtimeChunk: {
        name: 'runtime'
      },
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /node_modules/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      },
      minimizer: []
    },
    devtool: isDev ? 'eval-source-map' : 'source-map',
    devServer: {
      client: {
        logging: 'error',
        overlay: true
      },
      compress: true,
      historyApiFallback: {
        index: 'http://localhost:8080'
      },
      hot: true,
      open: true
    }
  };

  if (!isDev) {
    config.plugins.push(new CompressionPlugin());
    config.optimization.minimizer.push(...[new OptimizeCSSAssetsPlugin(), new TerserPlugin()]);
    config.plugins.push(new BundleAnalyzerPlugin());
  } else {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new ReactRefreshWebpackPlugin());
  }

  return config;
};
