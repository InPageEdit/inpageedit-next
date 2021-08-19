const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  context: __dirname,
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  mode: 'development',
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
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.styl(?:us)?$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        enabled: true,
        files: './src/**/*',
      },
    }),
    new VueLoaderPlugin(),
  ],
}
