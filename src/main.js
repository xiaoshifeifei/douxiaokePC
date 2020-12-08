/*
 * @Author: your name
 * @Date: 2020-06-22 11:11:40
 * @LastEditTime: 2020-07-03 11:19:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhiliao-hotel-b-web\src\main.js
 */
import Vue from 'vue'
import VeHistogram from 'v-charts/lib/histogram.common' // 图表
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import './components'

// eslint-disable-next-line no-duplicate-imports
import '@/styles/index.scss' // global css
import '@/styles/mumu/gast.css' // global css
import '@/styles/mumu/global.css' // global css
import '@/styles/mumu/fonts/iconfont.css'
import App from './App'
import store from './store'
import router from './router'
import 'default-passive-events'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import '@/icons' // icon
import '@/permission' // permission control
// import 'default-passive-events'
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
    /*
     * set ElementUI lang to EN
     * Vue.use(ElementUI, { locale })
     * 如果想要中文版 element-ui，按如下方式声明
     */
import '@babel/polyfill'
Vue.use(ElementUI)
Vue.component(VeHistogram.name, VeHistogram)
Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})