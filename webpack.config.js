const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

let todayDate = new Date();
let dateDay = String(todayDate.getDate()).padStart(2, '0');
let dateMonth = String(todayDate.getMonth() + 1).padStart(2, '0');
let dateHours = String(todayDate.getHours()).padStart(2, '0');
let dateMinutes = String(todayDate.getMinutes()).padStart(2, '0');
let todayString = dateMonth + "-" + dateDay + "-" + dateHours + "-" + dateMinutes;

function _path(p) {
  return path.join(__dirname, p);
}

module.exports = {
  
  mode: "development",
  entry: {
    app: './src/js/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {}
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "useBuiltIns": "entry"
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin,
    new HtmlWebpackPlugin({
      title: 'Пив&Ко',
      template: './src/index.html',
      favicon: "./src/favicon.ico"
    })
  ],
  output: {
    filename: '[name]-' + todayString + '.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      $: 'jquery',
      '$': 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jquery': 'jquery',
      'window.jQuery': 'jquery',
      'inputmask.dependencyLib': _path('node_modules/jquery.inputmask/dist/inputmask/inputmask.dependencyLib'),
      'inputmask': _path('node_modules/jquery.inputmask/dist/inputmask/inputmask'),
      'jquery.inputmask': _path('node_modules/jquery.inputmask/dist/inputmask/jquery.inputmask'),
      'inputmask.numeric.extensions': _path('node_modules/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions'),
      lity: 'lity',
      'lity': 'lity'
    }
  }
};