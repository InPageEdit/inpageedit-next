/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  context: __dirname,
  entry: { InPageEdit: './src/index.ts' },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
  },
  mode: 'development',
  devtool: 'source-map',
  watchOptions: {
    ignored: /dist/,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: '/node_modules/',
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
        },
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentedSyntax: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
      typescript: {
        extensions: {
          vue: {
            compiler: '@vue/compiler-sfc',
          }
        }
      }
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    port: 1005
  }
}
