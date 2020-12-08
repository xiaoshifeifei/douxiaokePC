/*
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-20 14:52:56
 * @LastEditors: ldh
 * @LastEditTime: 2020-07-20 15:10:22
 */

const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    ['@vue/app', {
      useBuiltIns: 'entry'
    }]
  ],
  plugins: [...prodPlugins]
}
