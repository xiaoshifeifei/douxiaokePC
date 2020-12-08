import { getToken } from '@/utils/auth.js'
import axios from '@/utils/request.js'
import store from '@/store'
// import qs from 'qs'
import { toUpperCase } from '@/utils/toUpperCase'
import { Notification } from 'element-ui'
const WS_URL = process.env.VUE_APP_WEBSOCKET_BASE_API

const Socket = function () {
  this.url = WS_URL
  this.pingTimer = null
  this.timeoutTimer = null
  this.initTimer = null
  this.pingTime = 5000
  this.reStart = false
  this.isRefresh = false
}
Socket.prototype = {
  initPay(onOpen, onReceiveMsg) {
    this.token = getToken()
    this.socket = new WebSocket(WS_URL)
    this.socket.onopen = onOpen
    this.socket.onmessage = onReceiveMsg
    this.socket.onerror = this.close.bind(this)
    this.socket.onclose = () => {
      this.socket = null
    }
  },
  init() {
    if (this.socket || !getToken()) return
    Notification({
      title: '正在初始化消息服务',
      type: 'success'
    })
    this.token = getToken()
    this.socket = new WebSocket(WS_URL)
    this.socket.onopen = this.open.bind(this)
    this.socket.onmessage = this.receiveMsg.bind(this)
    this.socket.onerror = this.error.bind(this)
    this.socket.onclose = this.close.bind(this)
    window.ononline = this.onLine.bind(this)
    window.onoffline = function() {
      Notification({
        title: '网络故障',
        type: 'warning'
      })
    }
  },
  onLine() {
    if (getToken()) {
      this.init()
    }
  },
  open() {
    Notification({
      title: '消息服务已连接',
      type: 'success'
    })
    this.sendPing()
    this.sendMsg([
      {
        type: 'auth',
        token: this.token
      }
    ])
  },
  close() {
    clearInterval(this.pingTimer)
    clearTimeout(this.timeoutTimer)
    this.socket = null
    Notification({
      title: '消息服务已关闭',
      type: 'warning'
    })
    if (this.reStart) {
      setTimeout(() => {
        this.init()
      }, this.pingTime)
      this.reStart = false
    }
  },
  error() {
    Notification({
      title: '消息服务连接有误',
      type: 'error'
    })
    this.reStart = true
    this.socket.close()
  },
  sendPing() {
    clearInterval(this.pingTimer)
    this.pingTimer = setInterval(() => {
      if (this.socket.readyState === 1) {
        this.socket.send(JSON.stringify({ type: 'ping' }))
      }
    }, this.pingTime)
  },
  receiveMsg(e) {
    let data = JSON.parse(e.data)
    clearTimeout(this.timeoutTimer)
    if (!store.state.user.token) {
      return this.socket.close()
    }
    this.timeoutTimer = setTimeout(() => {
      clearTimeout(this.timeoutTimer)
      this.reStart = true
      this.socket.close()
    }, this.pingTime * 2)
    if (data.type === 'ping') return
    if (data.code === -1) {
      return this.refreshToken()
    }
    if (data.type === 'auth' && data.code === 0) {
      return this.sendMsg([
        {
          channel: 'TOPIC_BOOKING_ORDER',
          type: 'subscribe'
        },
        {
          channel: 'TOPIC_BOOKING_GOODS',
          type: 'subscribe'
        },
        {
          channel: 'TOPIC_USER_COMMENT',
          type: 'subscribe'
        }
      ])
    }
    this.onChannel(data.channel)
  },
  onChannel(channel) {
    let msg = ''
    let reminds = store.state.wsdata.navBarData
    let oldStatisticsData = store.state.wsdata.homePageData
    switch (channel) {
    // 续住订单
    case 'TOPIC_CONTINUE_LIVE_ORDER':
      reminds.remindCountOfContinueLive++
      oldStatisticsData.ContinueLiveOrder.HandleOrderCount++
      oldStatisticsData.ContinueLiveOrder.TodayOrderCount++
      oldStatisticsData.ContinueLiveOrder.ThisWeekOrderCount++
      msg = '续住'
      break
      // 退房订单
    case 'TOPIC_CKECKOUT_ORDER':
      oldStatisticsData.CheckOutOrder.HandleOrderCount++
      oldStatisticsData.CheckOutOrder.TodayOrderCount++
      oldStatisticsData.CheckOutOrder.ThisWeekOrderCount++
      reminds.remindCountOfCheckOut++
      msg = '退房'
      // this.privateDispatch(oldStatisticsData)
      break
      // 客房服务订单
    case 'TOPIC_SERVICE_ORDER':
      oldStatisticsData.ServiceOrder.HandleOrderCount++
      oldStatisticsData.ServiceOrder.TodayOrderCount++
      oldStatisticsData.ServiceOrder.ThisWeekOrderCount++
      reminds.remindCountOfService++
      msg = '客房服务'
      // this.privateDispatch(oldStatisticsData)
      break
      // 开票订单
    case 'TOPIC_INVOICE_ORDER':
      oldStatisticsData.InvoiceOrder.HandleOrderCount++
      oldStatisticsData.InvoiceOrder.TodayOrderCount++
      oldStatisticsData.InvoiceOrder.ThisWeekOrderCount++
      reminds.remindCountOfInvoice++
      msg = '开票'
      // this.privateDispatch(oldStatisticsData)
      break
      // 清扫订单
    case 'TOPIC_CLEAN_ORDER':
      oldStatisticsData.CleanOrder.HandleOrderCount++
      oldStatisticsData.CleanOrder.TodayOrderCount++
      oldStatisticsData.CleanOrder.ThisWeekOrderCount++
      reminds.remindCountOfClear++
      msg = '清扫'
      // this.privateDispatch(oldStatisticsData)
      break
      // 维修订单
    case 'TOPIC_REPAIR_ORDER':
      oldStatisticsData.RepairOrder.HandleOrderCount++
      oldStatisticsData.RepairOrder.TodayOrderCount++
      oldStatisticsData.RepairOrder.ThisWeekOrderCount++
      reminds.remindCountOfRepair++
      msg = '维修'
      // this.privateDispatch(oldStatisticsData)
      break
      // 租车订单
    case 'TOPIC_RENT_CAR_ORDER':
      msg = '租车'
      reminds.remindCountOfRentCar++
      oldStatisticsData.RentCarOrder.HandleOrderCount++
      oldStatisticsData.RentCarOrder.TodayOrderCount++
      oldStatisticsData.RentCarOrder.ThisWeekOrderCount++
      break
      // 叫醒订单
    case 'TOPIC_WAKE_ORDER':
      msg = '叫醒'
      reminds.remindCountOfWake++
      oldStatisticsData.WakeOrder.HandleOrderCount++
      oldStatisticsData.WakeOrder.TodayOrderCount++
      oldStatisticsData.WakeOrder.ThisWeekOrderCount++
      break
      // 酒店设施订单
    case 'TOPIC_FACILITY_ORDER':
      msg = '酒店设施'
      reminds.remindCountOfFacility++
      oldStatisticsData.FacilityOrder.HandleOrderCount++
      oldStatisticsData.FacilityOrder.TodayOrderCount++
      oldStatisticsData.FacilityOrder.ThisWeekOrderCount++
      break
    default:
      break
    }
    store.dispatch('wsdata/changeState', {
      key: 'navBarData',
      value: reminds
    })
    store.dispatch('wsdata/changeState', {
      key: 'homePageData',
      value: oldStatisticsData
    })
    if (msg) {
      Notification({
        title: '提示',
        message: `您有一个新的${msg}订单需要处理`,
        type: 'warning'
      })
    }
  },
  sendMsg(msgList) {
    if (!msgList.length) return
    msgList.forEach(msg => {
      this.socket.send(JSON.stringify(msg))
    })
  },
  async refreshToken() {
    if (this.isRefresh) return
    this.socket.close()
    let data = {
      token: store.getters.token
    }
    let tokentype = toUpperCase(store.getters.tokenType ? store.getters.tokenType : '')
    let headers = {
      'authorization': tokentype + ' ' + store.getters.refreshToken
    }
    try {
      let res = await axios({
        method: 'post',
        url: process.env.VUE_APP_BASE_API + '/refresh',
        data,
        headers
      })
      if (res.code === 0) {
        store.dispatch('user/refreshToken', res.data)
        this.init()
      } else {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }
    } catch (error) {
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    }
    this.isRefresh = false
  }
}

export default new Socket()
