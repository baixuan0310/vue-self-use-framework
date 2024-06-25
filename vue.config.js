const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/lx/' : '/',
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        /* 自动引入自定义表单全局scss文件 */
        prependData: `
          @import "./src/components/vForm/styles/global.scss";
        `
      }
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module.rule("svg")
      .exclude.add(resolve('src/icons'));
    //配置svg
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
    // 配置vFrom项目别名
    config.resolve.alias
      .set('@vFrom', path.resolve(__dirname, 'src/components/vForm'));
  }
}


