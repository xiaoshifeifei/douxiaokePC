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

// 获取商家会员列表
export function sellVipList(params) {
    return request({
        url: '/sellvip/index',
        method: 'get',
        params
    })
}
/**
 * 商家会员详情
 * @param {Number} id
 * @return: {Promise}
 */
export const rellVipRead = function(id) {
    return request({
        url: `/sellvip/read/${id}`
    })
}


// 修改会员详情
export function sellVipUpdate(data) {
    return request({
        url: '/sellvip/update',
        method: 'post',
        data
    })
}

// 会员添加
export function sellVipSave(data) {
    return request({
        url: '/sellvip/save',
        method: 'post',
        data
    })
}

// /**
//  * 商家会员删除
//  * @param {Number} id
//  * @return: {Promise}
//  */
// export const rellVipDelete = function(id) {
//     return request({
//         url: `/sellvip/delete/${id}`
//     })
// }

// 会员添加
export function rellVipDelete(id) {
    return request({
        url: `/sellvip/delete/${id}`,
        method: 'post',
    })
}









// 获取商家列表
export function sellList(params) {
    return request({
        url: '/sell/index',
        method: 'get',
        params
    })
}
/**
 * 商家详情
 * @param {Number} id
 * @return: {Promise}
 */
export const rellRead = function(id) {
    return request({
        url: `/sell/read/${id}`
    })
}


// 获取门店列表
export function storeList(params) {
    return request({
        url: '/check/store/list',
        method: 'get',
        params
    })
}

// 获取门店详情
export function storeRead(id) {
    return request({
        url: `/check/store/read?store_id=${id}`,
    })
}



// 获取门店驳回
export function storeReject(data) {
    return request({
        url: '/check/store/reject',
        method: 'post',
        data
    })
}


// 门店通过
export function storeAdopt(data) {
    return request({
        url: '/check/store/adopt',
        method: 'post',
        data
    })
}


// 视频审核列表
export function videoList(params) {
    return request({
        url: '/check/video/index',
        method: 'get',
        params
    })
}

// 获取门店驳回
export function videoReject(data) {
    return request({
        url: '/check/video/reject',
        method: 'post',
        data
    })
}


// 门店通过
export function videoAdopt(data) {
    return request({
        url: '/check/video/adopt',
        method: 'post',
        data
    })
}

// 获取蓝V申请列表
export function bluevList(params) {
    return request({
        url: '/check/bluev_apply/list',
        method: 'get',
        params
    })
}

// 获取蓝V申请详情
export function bluevApplyList(params) {
    return request({
        url: '/check/bluev_apply/read',
        method: 'get',
        params
    })
}

// 蓝V申请处理
export function videOperate(data) {
    return request({
        url: '/check/bluev_apply/operate',
        method: 'post',
        data
    })
}

// 门店管理==》门店列表
export function stoList(params) {
    return request({
        url: '/store/list',
        method: 'get',
        params
    })
}

// 门店管理==》门店详情
export function stoRead(params) {
    return request({
        url: '/store/read',
        method: 'get',
        params
    })
}


//门店管理==》会员赠送
export function storeSellvip(data) {
    return request({
        url: '/store/vip_give',
        method: 'post',
        data
    })
}



// 协议列表 获取列表数据
export function stoTreaty(params) {
    return request({
        url: '/treaty/list',
        method: 'get',
        params
    })
}

// 协议列表 获取列表数据详情
export function stoTreatyRead(params) {
    return request({
        url: '/treaty/read',
        method: 'get',
        params
    })
}




// 基础设置 类别获取
export function stoConfigCategory(params) {
    return request({
        url: '/system_config/get_setting_category',
        method: 'get',
        params
    })
}





// 平台默认分佣配置列表
export function stoDistribute(params) {
    return request({
        url: '/plat_default_distribute_config/list',
        method: 'get',
        params
    })
}





// 项目数据获取
export function stoDistributeConfig(params) {
    return request({
        url: '/plat_default_distribute_config/get_projects',
        method: 'get',
        params
    })
}


// 订单类型获取
export function stOrderConfig(params) {
    return request({
        url: '/plat_default_distribute_config/get_order_types',
        method: 'get',
        params
    })
}



//平台默认分佣配置批量添加
export function storeBatch(data) {
    return request({
        url: '/plat_default_distribute_config/batch_save',
        method: 'post',
        data
    })
}



// 平台默认分佣配置详情
export function stOrderRead(params) {
    return request({
        url: '/plat_default_distribute_config/read',
        method: 'get',
        params
    })
}

//平台默认分销配置更新
export function storeUpdate(data) {
    return request({
        url: '/plat_default_distribute_config/update',
        method: 'post',
        data
    })
}



// 平台默认分佣配置详情
export function serviceTel(params) {
    return request({
        url: '/system_config/get_service_tel',
        method: 'get',
        params
    })
}



//客服电话更新
export function storeUpdateService(data) {
    return request({
        url: '/system_config/update_service_tel',
        method: 'post',
        data
    })
}


//平台默认分佣配置添加
export function saveUpdateService(data) {
    return request({
        url: '/plat_default_distribute_config/save',
        method: 'post',
        data
    })
}



//平台默认分销配置删除
export function saveUpDelete(data) {
    return request({
        url: '/plat_default_distribute_config/delete',
        method: 'post',
        data
    })
}



// 平台默认分佣配置详情
export function defaultService(params) {
    console.log('params', params);
    return request({
        url: '/plat_distribute_config/get_default_config',
        method: 'get',
        params
    })
}


// 平台分佣配置批量添加
export function batchSave1(data) {
    console.log(6666, data);
    return request({
        url: '/plat_distribute_config/batch_save',
        method: 'post',
        data
    })
}

// 平台分佣配置单个添加
export function platBatchSave(data) {
    return request({
        url: '/plat_distribute_config/save',
        method: 'post',
        data
    })
}


// 平台分佣配置更新
export function platDistributeSave(data) {
    return request({
        url: '/plat_distribute_config/update',
        method: 'post',
        data
    })
}



// 修改协议
export function plaTreatySave(data) {
    return request({
        url: '/treaty/save',
        method: 'post',
        data
    })
}


// 组织维度项目推广数据列表
export function projectList(params) {
    return request({
        url: '/project_spreed/team_list',
        method: 'get',
        params
    })
}


// 分销员维度项目推广数据列表
export function projectAgentList(params) {
    return request({
        url: '/project_spreed/agent_list',
        method: 'get',
        params
    })
}


// 组织维度项目推广数据详情
export function projecTeam(params) {
    return request({
        url: '/project_spreed/team_detail',
        method: 'get',
        params
    })
}

// 分销员维度项目推广数据详情
export function projecAgent(params) {
    return request({
        url: '/project_spreed/agent_detail',
        method: 'get',
        params
    })
}



// 分销员维度项目推广数据详情
export function subOrderList(params) {
    return request({
        url: '/sub_order/order_list',
        method: 'get',
        params
    })
}