/*
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-07 16:28:17
 * @LastEditors: ldh
 * @LastEditTime: 2020-07-17 17:12:53
 */
import request from "@/utils/request";
// 系统设置---权限管理--版本管理列表
export function GetVersionsList() {
    return request({
        url: "/version/list",
        method: "get",
        // params: { keywords: Keywords, page: Page, limit: Limit }
    });
}





// 系统设置---权限管理--获取角色列表
export function GetTableList(params) {
    return request({
        url: "/role/list",
        method: "get",
        params
    });
}
// 系统设置---权限管理--角色更新状态
export function upDateRole(params) {
    return request({
        url: "/role/list",
        method: "get",
        params
    });
}
// 编辑角色
export function updateRoleEdit({ id, name, remark }) {
    return request({
        url: "/role/update",
        method: "post",
        data: { id, name, remark, status: 1 }
    });
    id;
}
// 删除角色
export function deleteRole({ id }) {
    return request({
        url: "/role/delete",
        method: "post",
        data: { id }
    });
}

// 系统设置---权限管理--修改密码
export function UpdatePassword(params = {}) {
    return request({
        url: "/xcxmenu/list",
        method: "get",
        params
    });
}
// 系统设置---权限管理--权限设置
export function SettingLimits(data) {
    return request({
        url: "/xcxmenu/list",
        method: "get",
        data
    });
}
// 系统设置---权限管理--删除
export function DeleteLimits(data) {
    return request({
        url: "/xcxmenu/list",
        method: "post",
        data
    });
}
// 系统设置---权限管理--批量删除
export function DeleteBatch(data) {
    return request({
        url: "/xcxmenu/list",
        method: "post",
        data
    });
}
// 系统设置---权限管理--新增管理
export function CreateManagement(data) {
    return request({
        url: "/xcxmenu/list",
        method: "post",
        data
    });
}
// 系统设置---权限管理--新增角色
export function CreateRole({ RoleName, Remark }) {
    return request({
        url: "/role/save",
        method: "post",
        data: { name: RoleName, remark: Remark, status: 1 }
    });
}

// 获取 菜单列表
export function getSystemMenus() {
    return request({
        url: "/menu/list",
        method: "get"
    });
}

// 授权
export function roleGrant(roleId, menuIds) {
    return request({
        url: "/role/grant",
        method: "post",
        data: {
            id: roleId,
            menu_ids: menuIds
        }
    });
}
// 分配 帐号
export function allotAccounts(RoleID, Accounts) {
    return request({
        url: "/role/allot",
        method: "post",
        data: { id: RoleID, admin_ids: Accounts }
    });
}
// 角色详情
export function getRoleInfo(roleId) {
    return request({
        url: "/role/read",
        method: "get",
        params: { id: roleId }
    });
}

// 管理员列表
export function getAccountList(params) {
    return request({
        url: "/admin/list",
        method: "get",
        params
    });
}
// 创建管理员
export function createAccount(accountObjData) {
    return request({
        url: "/admin/save",
        method: "post",
        data: accountObjData
    });
}
// 更新管理员
export function updateAccount(accountObjData) {
    return request({
        url: "/admin/update",
        method: "post",
        data: accountObjData
    });
}
// 管理员信息
export function getAccountInfo(id) {
    return request({
        url: "/admin/read",
        method: "get",
        params: { id }
    });
}

// 删除管理员
export function deleteAccount(id) {
    return request({
        url: "/admin/delete",
        method: "post",
        data: { id }
    });
}

// 启用 禁用帐号
export function updateAccountStatus({ AdminID, AdminStatus }) {
    return request({
        url: "/s_admin/status",
        method: "post",
        data: { AdminID, AdminStatus }
    });
}

// 抖小客

// 获取渠道列表
export function qudaoList(params) {
    return request({
        url: "/team/list",
        method: "get",
        params
    });
}
// 获取渠道列表详情
export function getDtails(params) {
    return request({
        url: "/agent/read",
        method: "get",
        params
    });
}

// 编辑渠道
export function updateQudaoRoleEdit({ id, linkman, mobile }) {
    return request({
        url: "/team/update",
        method: "post",
        data: { id, linkman, mobile }
    });
}
// 创建渠道
export function updateRoleEditCreat(params) {
    return request({
        url: "/team/save",
        method: "post",
        data: params
    });
}

// 删除渠道
export function deleteQudaoRole({ id }) {
    return request({
        url: "/team/delete",
        method: "post",
        data: { id }
    });
}

// 获取管理列表
export function projectList(params) {
    return request({
        url: "/project/list",
        method: "get",
        params
    });
}


// 获取管理列表详情
export function getProjectDtails(params) {
    return request({
        url: "/project/read",
        method: "get",
        params
    });
}
// 编辑管理渠道
export function updateProjectDtailsEdit({ id, name, register_url }) {
    return request({
        url: "/project/update",
        method: "post",
        data: { id, name, register_url }
    });
}
// 创建管理列表
export function updateProjectEditCreat(params) {
    return request({
        url: "/project/save",
        method: "post",
        data: params
    });
}

// 删除角色
export function deleteProject({ id }) {
    return request({
        url: "/project/delete",
        method: "post",
        data: { id }
    });
}


// 获取分销员列表
export function fenxiaoList(params) {
    return request({
        url: "/agent/list",
        method: "get",
        params
    });
}



// 渠道佣金设置
export function yongjinList(params) {
    return request({
        url: "/plat_distribute_config/list",
        method: "get",
        params
    });
}


// 创建管理列表
export function updateSetManage(data) {
    return request({
        url: "/agent/set_manage",
        method: "post",
        data
    });
}



// 获取订单类型
export function getOrderDtails() {
    return request({
        url: "/plat_distribute_config/get_order_types",
        method: "get",
    });
}

// 获取渠道商
export function getTeams() {
    return request({
        url: "/plat_distribute_config/get_teams",
        method: "get",
    });
}

// 获取推广APP
export function getProjects() {
    return request({
        url: "/plat_distribute_config/get_projects",
        method: "get",
    });
}



// 平台分销添加
export function updateSaveManage(data) {
    return request({
        url: "/plat_distribute_config/save",
        method: "post",
        data
    });
}


// 获取平台分佣配置详情
export function getDistribute(params) {
    return request({
        url: "/plat_distribute_config/read",
        method: "get",
        params
    });
}


// 平台分销添加
export function updateSaveUpdate(data) {
    return request({
        url: "/plat_distribute_config/update",
        method: "post",
        data
    });
}

// 平台分佣配置历史记录获取
export function getHistoryList(params) {
    return request({
        url: "/plat_distribute_config/plat_history_list",
        method: "get",
        params
    });
}



// 分销员分佣配置历史记录获取
export function getAgentHistory(params) {
    return request({
        url: "/plat_distribute_config/agent_history_list",
        method: "get",
        params
    });
}

// 获取渠道列表详情
export function getDtailsTeam(params) {
    return request({
        url: "/team/read",
        method: "get",
        params
    });
}