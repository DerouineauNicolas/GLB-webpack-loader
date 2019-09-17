const path = require('path');
const THREE = require('three');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode:'development',
    // development server options
  devServer: {
        contentBase: path.join(__dirname, "dist")
  }

};