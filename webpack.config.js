const path = require('path');
const THREE = require('three');

module.exports = {
  entry: {
    main: './src/index.js',
    mesh_update: './src/mesh_update.js',

  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode:'development',
    // development server options
  devServer: {
        contentBase: path.join(__dirname, "dist")
  }

};