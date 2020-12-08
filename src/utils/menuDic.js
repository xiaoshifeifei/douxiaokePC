/*
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-07 16:28:17
 * @LastEditors: ldh
 * @LastEditTime: 2020-07-17 09:22:53
 */
let dic = {
    dashboard: () =>
        import ("@/views/dashboard"), // 首页

    // 系统管理
    jurisdiction: () =>
        import ("@/views/systemSet/jurisdiction"), // 系统管理/权限管理
    miniprogram: () =>
        import ("@/views/systemSet/miniprogram"), // 系统管理/小程序管理
    basic: () =>
        import ("@/views/systemSet/basicSet"), // 系统管理/基本设置
    // role: () => import('@/views/systemSet/jurisdiction/CreateRole'), // 系统管理/新建角色 hidden: true hidden: true hidden: true
    role: () =>
        import ("@/views/systemSet/jurisdiction"), // 系统管理/权限管理
    mana: () =>
        import ("@/views/systemSet/accountManage/AccountManage"), // 系统管理/新建管理 hidden: true hidden: true hidden: true
    addRole: () =>
        import ("@/views/systemSet/jurisdiction/CreateRole"), // 系统管理/新建管理 hidden: true hidden: true hidden: true

    // login
    login: () =>
        import ("@/views/login"), // login

    // 渠道商管理
    TeamList: () =>
        import ("@/views/qudaoManagement/qudaoList"), // 渠道商管理/渠道商列表

    // 推广数据统计
    ProjectSpreed: () =>
        import ("@/views/projectSpreed/projectList"), // 渠道商管理/推广数据统计
    // 推广数据统计
    SubOrder: () =>
        import ("@/views/projectSpreed/subOrder"), // 渠道商管理/订单列表

    // 项目管理
    ProjectList: () =>
        import ("@/views/projectManagement/projectList"), // 项目管理/项目列表
    // 分销员管理
    AgentList: () =>
        import ("@/views/fenxiaoManagement/fenxiaoList"), // 分销员管理/分销员列表
    // 推广佣金设置
    PlatDistributeConfigList: () =>
        import ("@/views/tuiguangManagement/tuiguangList"), // 推广佣金设置/渠道商佣金设置

    // 系统管理
    RoleIndex: () =>
        import ("@/views/systemSet/jurisdiction"), // 系统管理/角色管理
    AdminIndex: () =>
        import ("@/views/systemSet/accountManage/AccountManage"), // 系统管理/管理员管理
    VersionIndex: () =>
        import ("@/views/systemSet/versionsTongJi"), // 系统管理/版本管理
    TreatyList: () =>
        import ("@/views/systemSet/ProtocolManagement"), // 系统管理/协议管理
    SystemConfig: () =>
        import ("@/views/systemSet/basicSet") // 系统管理/基本设置
};
export default dic;