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
  const isVendor = ({resource}) => resource && /node_modules/.test(resource) && resource.match(/\.js$/);
  const {ifProduction} = getIfUtils(env);
  const entry = ifProduction() ? {
    main: './src/index',
  } : './src/index';
  return {
    entry,
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
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: mod => isVendor(mod),
      }),
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
