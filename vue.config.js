module.exports = {
  // 在当前目录下请求资源
  publicPath: './',
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'IT头条'
      return args
    })
  },
}
