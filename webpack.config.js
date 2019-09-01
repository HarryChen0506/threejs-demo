const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.raycaster.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    // contentBase: './dist',
    publicPath: '/',  //静态资源的根路径
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './public/index.template.html'//只增加了这行
    })
  ],
};