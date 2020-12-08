/*
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-30 17:06:31
 * @LastEditors: ldh
 * @LastEditTime: 2020-07-30 18:22:57
 */
import request from '@/utils/request'

/**
 * app 上传
 * @param {Object} file
 * @param {Number} type  0 上传图片 1 app
 * @return: {Promise}
 */
export const reqUploadFile = function(file) {
        return request({
            headers: { 'Content-Type': 'multipart/form-data;' },
            url: `/version/upload`,
            method: 'POST',
            data: file
        })
    }
    /**
     * 创建版本号
     * @param {Object} data
     * @return: {Promise}
     */
export const reqAddAppVersion = function(data) {
        return request({
            url: '/version/save',
            method: 'POST',
            data
        })
    }
    /**
     * 获取版本列表
     * @param {Object} data
     * @return: {Promise}
     */
export const reqVersionList = function() {
    return request({
        url: "/version/list",
        method: "get",
    })
}

// 系统设置---权限管理--版本管理列表
// export function GetVersionsList() {
//   return request({
//       url: "/version/list",
//       method: "get",
//       // params: { keywords: Keywords, page: Page, limit: Limit }
//   });
// }


/**
 * 更新版本
 * @param {Object} data
 * @return: {Promise}
 */
export const updateVersion = function(data) {
        return request({
            url: `/version/update`,
            method: 'POST',
            data
        })
    }
    /**
     * 获取版本详情
     * @param {Number} id
     * @return: {Promise}
     */
export const reqVersionDetail = function(id) {
    return request({
        url: `/version/read?id=${id}`
    })
}