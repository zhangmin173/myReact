const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const TuiaAutoUpload = require('tuia-auto-upload');
const webpackConfig = require('./webpack.prod.conf')

webpack(webpackConfig, function(err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))

  if (process.env.NODE_ENV === 'production') {
    const uploader = new TuiaAutoUpload({
      dir: path.join(__dirname, '../dist/'),
      originDir: '/tuia/media-internal/dist/'
    });
    uploader.start();
  }

})