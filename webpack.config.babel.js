import {
  resolve
} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export default () => {
  return {
    entry: './src/index',
    output: {
      path: resolve('dist'),
      filename: '[name].js',
      pathinfo: true,
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.jsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                'react',
                [
                  'env', {
                    targets: {
                      browsers: ['last 1 Chrome version'],
                    },
                    modules: false,
                    debug: true,
                  }
                ]
              ]
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Test',
        template: './src/index.html',
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT,
    },
  }
}
