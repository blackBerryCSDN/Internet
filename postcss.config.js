const AutoPrefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
module.exports = ({ file }) => {
  let remUnit
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    remUnit = 40
  } else {
    remUnit = 70
  }
  return {
    // plugins: [
    //   AutoPrefixer({
    //     browsers: ['last 20 versions', 'android >= 4.0']
    //   }),
    //   pxtorem({
    //     rootValue: remUnit,
    //     propList: ['*'],
    //     selectorBlackList: ['van-circle__layer']
    //   })
    // ]
    plugins: {
      'autoprefixer': {
        overrideBrowserslist: [
          'Android 4.1',
          'iOS 7.1',
          'Chrome > 31',
          'ff > 31',
          'ie >= 8'
        ]
      },
      'postcss-pxtorem': {
        rootValue: remUnit,
        propList: ['*']
      }
    }
  }
}
