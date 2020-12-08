/*
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-07 16:28:17
 * @LastEditors: ldh
 * @LastEditTime: 2020-07-18 11:30:30
 */
import Cookies from 'js-cookie'

const TokenKey = 'token' // token值
const RefreshTokenKey = 'refreshToken' // 刷新token值
const TokenTypeKey = 'tokenType' // token类型
const uidKey = 'uid' // uid
// 获取token类型
export function getTokenType() {
  return Cookies.get(TokenTypeKey)
}
// 保存token值类型
export function setTokenType(tokentype) {
  return Cookies.set(TokenTypeKey, tokentype)
}
// 删除token类型
export function removeTokenType() {
  return Cookies.remove(TokenTypeKey)
}
// 获取token
export function getToken() {
  return Cookies.get(TokenKey)
}
// 保存token值
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 删除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 获取refresh_token
export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}
// 保存refresh_token值
export function setRefreshToken(refreshtoken) {
  return Cookies.set(RefreshTokenKey, refreshtoken)
}
// 删除refresh_token
export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey)
}
// 获取用户id
export function getUid() {
  return Cookies.get(uidKey)
}
// 保存用户id
export function setUid(uid) {
  return Cookies.set(uidKey, uid)
}
// 删除用户id
export function removeUid() {
  return Cookies.remove(uidKey)
}
export function setCookie(key, value) {
  Cookies.set(key, JSON.stringify(value))
}
export function getCookie(key) {
  let value = Cookies.get(key)
  return value ? JSON.parse(value) : value
}
export function removeCookie(key) {
  Cookies.remove(key)
}

