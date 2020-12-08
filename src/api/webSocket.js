/*
 * @Author: CZTXXL
 * @Date: 2020-05-28 11:17:27
 * @LastEditTime: 2020-07-18 17:02:59
 * @LastEditors: ldh
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\api\websocket.js
 */
import {
  getToken
} from '@/utils/auth.js'
import axios from '@/utils/request.js'
import store from '@/store'
import qs from 'qs'
import { toUpperCase } from '@/utils/toUpperCase'

const WS_URL = process.env.VUE_APP_WEBSOCKET_BASE_API
console.log(WS_URL)
let Socket = ''
let setIntervalWebsocketPush = null
let stateOfReconnect = false
let reconnectCount = 0

/* 建立连接 */
export function createSocket() {
  if (!Socket) {
    console.log('创建websocket连接')
    Socket = new WebSocket(WS_URL)
    Socket.onopen = onopenWS
    Socket.onmessage = onmessageWS
    Socket.onerror = onerrorWS
    Socket.onclose = function (){
      console.log('websocket已断开')
    }
    let token = getToken()
    //
    sendWSPush({
      channel: 'TOPIC_BOOKING_ORDER',
      type: 'auth',
      token
    })
    // eslint-disable-next-line no-use-before-define
    sendWSPush({
      channel: 'TOPIC_BOOKING_GOODS',
      type: 'auth',
      token
    })
  } else {
    console.log('websocket已连接')
  }
}
export function sendPing() {
  Socket.send(JSON.stringify({
    type: 'ping',
  }))
  setIntervalWebsocketPush = setInterval(() => {
    Socket.send(JSON.stringify({
      type: 'ping'
    }))
  }, 5000)
}
// 发送心跳
export function onopenWS() {
  console.log('连接成功')
  reconnectCount = 0
  sendPing()
}
/* 链接失败重连 */
export function onerrorWS() {
  if (stateOfReconnect) return
  if (reconnectCount >= 10) {
    oncloseWS()
    clearInterval(setIntervalWebsocketPush)
    return
  }
  reconnectCount++
  console.log('执行重连ing..')
  stateOfReconnect = true
  clearInterval(setIntervalWebsocketPush)
  Socket.close()
  reconnect && clearTimeout(reconnect)
  let reconnect = setTimeout(() => {
    let token = getToken()
    createSocket()
    stateOfReconnect = false
    sendWSPush({
      channel: 'TOPIC_BOOKING_ORDER',
      type: 'auth',
      token
    })
    sendWSPush({
      channel: 'TOPIC_BOOKING_GOODS',
      type: 'auth',
      token
    })
  }, 5000)
}
/* 接收数据 */
export function onmessageWS(e) {
  window.dispatchEvent(new CustomEvent('onmessageWS', {
    detail: {
      data: e
    }
  }))
  // console.log(e)
}
/* 发送数据 */
export function sendWSPush(obj) {
  if (Socket !== null && Socket.readyState === 3) {
    Socket.close()
    createSocket()
  } else if (Socket.readyState === 1) {
    Socket.send(JSON.stringify(obj))
  } else if (Socket.readyState === 0) {
    setTimeout(() => {
      Socket.send(JSON.stringify(obj))
    }, 3000)
  }
}
/* 关闭 */
export function oncloseWS(e) {
  Socket.close()
  clearInterval(setIntervalWebsocketPush)
  Socket = ''
}
/**
 * 刷新token
 */
export async function refreshToken(){
    oncloseWS()
    let data = {
      token: store.getters.token
    }
    let tokentype = toUpperCase(store.getters.tokenType ? store.getters.tokenType : '')
    let headers = {
      'authorization': tokentype + ' ' + store.getters.refreshToken
    }
    try {
      let res = await  axios({
          method: 'post',
          url: process.env.VUE_APP_BASE_API + '/refresh',
          data,
          headers
        })
      if(res.code === 0){
        store.dispatch('user/refreshToken', res.data)
        createSocket()
      }else{
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }   
    } catch (error) {
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    }
}