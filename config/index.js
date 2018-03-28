module.exports = {
  build: {
    env: require('./prod.env'),
    assetsPublicPath: '//yun.tuia.cn/tuia/media-internal/dist/',
    sourceMap: false,
    cssSourceMap: false
  },
  dev: {
    env: require('./dev.env'),
    assetsPublicPath: '//yun.dui88.com/tuia/media-internal/dist/',
    sourceMap: true,
    cssSourceMap: false,
    port: 17785
  }
}
