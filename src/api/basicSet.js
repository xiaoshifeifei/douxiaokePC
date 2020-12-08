import request from '@/utils/request'
// 系统设置---基本设置--详情
export function GetBasicSetting(params = {}) {
  return request({
    url: '/setting/detail',
    method: 'get',
    params
  })
}
// 系统设置---基本设置--详情(20200710更改的)
export function GetBasicSettingInfo(params = {}) {
  return request({
    url: '/hotel/setting_get',
    method: 'get',
    params
  })
}
// 系统设置---基本设置--修改
export function UpdateBasicSetting(data) {
  return request({
    url: '/setting/update',
    method: 'post',
    data
  })
}

// 系统设置---基本设置--修改(20200710更改的)
export function UpdateBasicSettingInfo(data) {
  return request({
    url: '/hotel/setting_save',
    method: 'post',
    data
  })
}

// 系统设置---基本设置--图片上传
export function UploadImage(data) {
  return request({
    url: '/setting/upload',
    method: 'post',
    data
  })
}
// 系统设置---基本设置--图片上传
export function wuPingUploadImage(data) {
  return request({
    url: '/rent_car_goods/cover_img_upload',
    method: 'post',
    data
  })
}
