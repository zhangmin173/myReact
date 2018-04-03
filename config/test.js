module.exports = {
  mobile: true,
  mode: 'development',
  filename: '[name].js',
  publicPath: 'http://localhost/myReact/dist/',
  devtool: 'eval-source-map',
  urlLoader: {
    publicPath: 'http://localhost/myReact/dist/images/',
    outputPath: 'images/'
  }
}