'use strict'
const path = require('path')

const resolve = dir => path.join(__dirname, dir)
// 生产环境，测试和正式
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  // publicPath: '/h5/', // 署应用包时的基本 URL。 vue-router hash 模式使用
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  //  publicPath: '/app/', //署应用包时的基本 URL。  vue-router history模式使用
  outputDir: 'hunan-h5', //  生产环境构建文件的目录
  assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: !IS_PROD,
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    port: 8080, // 端口
    open: false, // 启动后打开浏览器
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    }
    // proxy: {
    //   //配置跨域
    //   '/api': {
    //       target: "https://test.xxx.com",
    //       // ws:true,
    //       changOrigin:true,
    //       pathRewrite:{
    //           '^/api':'/'
    //       }
    //   }
    // }
  },
  css: {
    extract: IS_PROD, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    sourceMap: false,
    loaderOptions: {
      // less加载器
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // 直接覆盖变量
          // 'text-color': 'red',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          'hack': `true; @import "${resolve('./src/assets/less/vant.less')}";`
        }
      },
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        // prependData: `
        //   @import "assets/css/mixin.scss";
        //   @import "assets/css/variables.scss";
        //   $cdn: "${defaultSettings.$cdn}";
        //   `
      }
    }
  },
  // webpack配置
  // configureWebpack: {
  //   // 关闭 webpack 的性能提示
  //   performance: {
  //     hints: false
  //   }
  // }
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...
      config.mode = 'production'
      config['performance'] = { // 打包文件大小配置
        'maxEntrypointSize': 10000000,
        'maxAssetSize': 30000000
      }
    }
  }
}

