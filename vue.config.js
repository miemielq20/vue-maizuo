const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, /* 占时关闭代码检测 */
  /* 配置方向代理 */
  devServer: {
    proxy: {
      '/api': {
        target: 'https://i.maoyan.com',
        changeOrigin: true
      }

      // pathRewrite 地址重启替换
      /* '/kerwin': {
        target: 'https://i.maoyan.com',
        changeOrigin: true,
        pathRewrite: {
          '/kerwin': ''
        }
      } */
    }
  }
})
