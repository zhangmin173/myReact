module.exports = {
  mobile: true,
  mode: 'production',
  filename: '[name].[hash:8].js',
  publicPath: 'http://localhost/myReact/dist/',
  devtool: false,
  urlLoader: {
    publicPath: 'http://localhost/myReact/dist/images/',
    outputPath: 'images/'
  }
}