/*
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-07 16:28:17
 * @LastEditors: ldh
 * @LastEditTime: 2020-07-21 18:12:27
 */
import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/vue-admin-template/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout(data) {
    return request({
        url: '/logout',
        method: 'post',
        data
    })
}

export function updatePassword(data) {
    return request({
        url: '/s_admin/modify_password',
        method: 'post',
        data
    })
}