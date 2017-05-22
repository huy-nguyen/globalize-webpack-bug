import {
  resolve
} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import GlobalizePlugin from 'globalize-webpack-plugin';
import {
  getIfUtils
} from 'webpack-config-utils';

export default (env) => {
  const {ifProduction} = getIfUtils(env);
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
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        production: ifProduction(),
        title: 'Test',
        template: './src/index.html',
      }),
      new webpack.HotModuleReplacementPlugin(),
  		new GlobalizePlugin({
  			production: ifProduction(),
  			developmentLocale: "en",
  			supportedLocales: ["en", "es"],
  			messages: "messages/[locale].json",
  			output: "i18n/[locale].[hash].js"
  		}),
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
