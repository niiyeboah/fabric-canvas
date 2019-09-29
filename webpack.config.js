'use strict';

const { resolve, join } = require('path');
const merge = require('webpack-merge');
const { BabelMultiTargetPlugin } = require('webpack-babel-multi-target-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

const OUTPUT_PATH = resolve('build');
const INDEX_TEMPLATE = resolve('./demo/index.html');

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';

const polyfills = [
  {
    from: resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/bundles/*.{js,map}`),
    to: join(OUTPUT_PATH, 'vendor', 'bundles'),
    flatten: true
  }
];

const commonConfig = merge([
  {
    entry: './demo/demo.js',
    output: {
      path: OUTPUT_PATH,
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [BabelMultiTargetPlugin.loader(), 'uglify-template-string-loader']
        }
      ]
    },
    plugins: [
      new BabelMultiTargetPlugin({
        babel: {
          plugins: [
            [
              require('babel-plugin-template-html-minifier'),
              {
                modules: {
                  '@polymer/polymer/lib/utils/html-tag.js': ['html']
                },
                htmlMinifier: {
                  collapseWhitespace: true,
                  minifyCSS: true,
                  removeComments: true
                }
              }
            ]
          ],
          presetOptions: { useBuiltIns: false }
        },
        safari10NoModuleFix: 'inline-data-base64',
        targets: {
          es6: {
            browsers: [
              'last 2 Chrome major versions',
              'last 2 ChromeAndroid major versions',
              'last 2 Edge major versions',
              'last 2 Firefox major versions'
            ],
            tagAssetsWithKey: false,
            esModule: true
          },
          es5: {
            browsers: ['ie 11'],
            tagAssetsWithKey: true,
            noModule: true
          }
        }
      })
    ]
  }
]);

const productionConfig = merge([
  {
    devtool: 'nosources-source-map',
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            output: {
              comments: false
            }
          },
          sourceMap: true,
          parallel: true
        })
      ]
    },
    plugins: [
      new CopyWebpackPlugin([...polyfills]),
      new HtmlWebpackPlugin({
        template: INDEX_TEMPLATE,
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true
        }
      }),
      new HtmlReplaceWebpackPlugin([
        {
          pattern: /<script dev.*?src=".*?\.js".*?<\/script>/g,
          replacement: ''
        }
      ]),
      new HtmlWebpackTagsPlugin({ tags: ['vendor/webcomponents-bundle.js'], append: false }),
      new CompressionPlugin({ test: /\.js(\.map)?$/i }),
      new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.js(\.map)?$/i,
        threshold: 20,
        minRatio: 0.8,
        mode: 1
      })
    ]
  }
]);

module.exports = mode => {
  return merge(commonConfig, productionConfig, { mode });
};
