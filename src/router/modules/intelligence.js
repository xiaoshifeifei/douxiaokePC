/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout";

export const intelligence = [{
        path: "/",
        component: Layout,
        redirect: "/dashboard",
        children: [{
            path: "dashboard",
            name: "dashboard",
            component: () =>
                import ("@/views/dashboard"),
            meta: {
                title: "首页",
                icon: "dashboard",
                affix: true
            }
        }]
    },
    {
        path: "/login",
        component: () =>
            import ("@/views/login/index"),
        hidden: true
    },

    // {
    //     path: "/daiLiShanAdmin",
    //     component: Layout,
    //     hidden: true,
    //     meta: {
    //         title: "代理商管理",
    //         icon: "sisync"
    //     },
    //     // redirect: '/daiLiShanAdmin/daiLiShanAdmin',
    //     children: [{
    //             path: "daiLiShanAdmin",
    //             component: resolve =>
    //                 require(["@/views/daiLiShanAdmin/daiLiShanAdmin"], resolve),
    //             name: "dailishanadmin",
    //             meta: { title: "代理商列表" }
    //         },
    //         {
    //             path: "daiLiShan",
    //             component: resolve =>
    //                 require(["@/views/daiLiShanAdmin/daiLiShan"], resolve),
    //             name: "dailishan",
    //             meta: { title: "代理商审核demo" }
    //         }
    //     ]
    // },

    // {
    //     path: "/userManagement",
    //     component: Layout,
    //     meta: {
    //         title: "用户管理",
    //         icon: "sisync"
    //     },
    //     // redirect: '/systemSet/jurisdiction',
    //     children: [{
    //             path: "businessList",
    //             name: "businessList",
    //             meta: { title: "门店列表" },
    //             component: resolve =>
    //                 require(["@/views/userManagement/businessList"], resolve),
    //             hidden: false
    //         },
    //         {
    //             path: "daiLiShanAdmin",
    //             name: "daiLiShanAdmin",
    //             meta: { title: "代理商列表" },
    //             component: resolve =>
    //                 require(["@/views/userManagement/daiLiShanAdmin"], resolve),
    //             hidden: true
    //         },
    //     ]
    // },

    // {
    //     path: "/storeManagement",
    //     component: Layout,
    //     meta: {
    //         title: "门店管理",
    //         icon: "sisync"
    //     },
    //     children: [{
    //             path: "store",
    //             name: "store",
    //             meta: { title: "门店管理" },
    //             component: resolve =>
    //                 require(["@/views/storeManagement/store"], resolve),
    //             hidden: true
    //         },

    //     ]
    // },

    // {
    //     path: "/orderManagement",
    //     component: Layout,
    //     meta: {
    //         title: "订单管理",
    //         icon: "sisync"
    //     },
    //     children: [{
    //             path: "exportList",
    //             name: "exportList",
    //             meta: { title: "蓝V订单" },
    //             component: resolve => require(["@/views/orderManagement/exportList"], resolve),
    //             hidden: false
    //         },
    //         {
    //             path: "listVIP",
    //             name: "listVIP",
    //             meta: { title: "会员订单" },
    //             component: resolve => require(["@/views/orderManagement/listVIP"], resolve),
    //             hidden: false
    //         }
    //     ]
    // },
    // {
    //     path: "/storeDoc",
    //     component: Layout,
    //     meta: {
    //         title: "审核管理",
    //         icon: "sisync"
    //     },
    //     // redirect: '/systemSet/jurisdiction',
    //     children: [{
    //             path: "storeDocList",
    //             name: "storeDocList",
    //             meta: { title: "门店审核" },
    //             component: resolve =>
    //                 require(["@/views/storeDoc/storeDocList"], resolve),
    //             hidden: false
    //         },
    //         {
    //             path: "videoList",
    //             name: "videoList",
    //             meta: { title: "视频审核" },
    //             component: resolve => require(["@/views/storeDoc/videoList"], resolve),
    //             hidden: false
    //         },
    //         // {
    //         //     path: "exportList",
    //         //     name: "exportList",
    //         //     meta: { title: "蓝V申请审核" },
    //         //     component: resolve => require(["@/views/storeDoc/exportList"], resolve),
    //         //     hidden: false
    //         // }
    //     ]
    // },


    {
        path: "/qudaoManagement",
        component: Layout,
        meta: {
            title: "渠道商管理",
            icon: "sisync"
        },
        children: [{
            path: "/qudaoList",
            name: "qudaoList",
            meta: { title: "渠道商列表" },
            component: resolve => require(["@/views/qudaoManagement/qudaoList"], resolve),
            hidden: false
        }]
    },

    {
        path: "/projectManagement",
        component: Layout,
        meta: {
            title: "项目管理",
            icon: "sisync"
        },
        children: [{
                path: "/projectList",
                name: "projectList",
                meta: { title: "项目列表" },
                component: resolve => require(["@/views/projectManagement/projectList"], resolve),
                hidden: false
            }

        ]
    },

    {
        path: "/fenxiaoManagement",
        component: Layout,
        meta: {
            title: "分销员管理",
            icon: "sisync"
        },
        children: [{
                path: "/fenxiaoList",
                name: "fenxiaoList",
                meta: { title: "分销员列表" },
                component: resolve => require(["@/views/fenxiaoManagement/fenxiaoList"], resolve),
                hidden: false
            }

        ]
    },

    {
        path: "/tuiguangManagement",
        component: Layout,
        meta: {
            title: "推广佣金设置",
            icon: "sisync"
        },
        children: [{
                path: "/tuiguangList",
                name: "tuiguangList",
                meta: { title: "渠道商佣金设置" },
                component: resolve => require(["@/views/tuiguangManagement/tuiguangList"], resolve),
                hidden: false
            }

        ]
    },

    {
        path: "/systemSet",
        component: Layout,
        meta: {
            title: "系统管理",
            icon: "sisync"
        },
        // redirect: '/systemSet/jurisdiction',
        children: [{
                path: "jurisdiction",
                component: resolve =>
                    require(["@/views/systemSet/jurisdiction"], resolve),
                name: "jurisdiction",
                hidden: true,
                meta: { title: "权限管理" }
            },
            {
                path: "addRole",
                name: "addRole",
                meta: { title: "新增角色" },
                hidden: true,
                component: resolve =>
                    require(["@/views/systemSet/jurisdiction/CreateRole"], resolve)
            },
            {
                path: "role",
                name: "role",
                meta: { title: "角色管理" },
                component: resolve =>
                    require(["@/views/systemSet/jurisdiction"], resolve),
                hidden: false,
            },
            {
                path: "mana",
                name: "mana",
                meta: { title: "管理员管理" },
                component: resolve =>
                    require(["@/views/systemSet/accountManage/AccountManage"], resolve),
                hidden: false
            },
            {
                path: "miniprogram",
                component: resolve =>
                    require(["@/views/systemSet/miniprogram"], resolve),
                name: "miniprogram",
                hidden: true,
                meta: { title: "小程序管理" }
            },
            {
                path: "basic",
                component: resolve => require(["@/views/systemSet/basicSet"], resolve),
                name: "basic",
                hidden: true,
                meta: { title: "基本设置" }
            },
            {
                path: "versions",
                component: resolve =>
                    require(["@/views/systemSet/versionsTongJi"], resolve),
                name: "versions",
                hidden: false,
                meta: { title: "版本管理" }
            },

            {
                path: "levelVip",
                component: resolve => require(["@/views/systemSet/levelVip"], resolve),
                name: "levelVip",
                meta: { title: "会员等级设置" },
                hidden: true,
            },
            {
                path: "systemMessage",
                component: resolve => require(["@/views/systemSet/systemMessage"], resolve),
                name: "systemMessage",
                hidden: true,
                meta: { title: "系统消息" }
            },
            {
                path: "ProtocolManagement",
                component: resolve => require(["@/views/systemSet/ProtocolManagement"], resolve),
                name: "ProtocolManagement",
                hidden: true,
                meta: { title: "协议管理" }
            },
        ]
    },














    // {
    //     path: "/businessVip",
    //     component: Layout,
    //     meta: {
    //         title: "商家会员管理",
    //         icon: "sisync"
    //     },
    //     // redirect: '/systemSet/jurisdiction',
    //     children: [{
    //         path: "listVIP",
    //         name: "listVIP",
    //         meta: { title: "会员列表" },
    //         component: resolve => require(["@/views/businessVip/listVIP"], resolve),
    //         hidden: false
    //     }]
    // },
    // {
    //     path: "/business",
    //     component: Layout,
    //     meta: {
    //         title: "商家管理",
    //         icon: "sisync"
    //     },
    //     // redirect: '/systemSet/jurisdiction',
    //     children: [
    //         // {
    //         //       path: "businessList",
    //         //       name: "businessList",
    //         //       meta: { title: "商家列表" },
    //         //       component: resolve =>
    //         //           require(["@/views/business/businessList"], resolve),
    //         //       hidden: false
    //         //   },
    //         {
    //             path: "mana",
    //             name: "mana",
    //             meta: { title: "会员列表" },
    //             component: resolve => require(["@/views/businessVip/listVIP"], resolve),
    //             hidden: true
    //         }
    //     ]
    // },


    // {
    //     path: "/systemSet",
    //     component: Layout,
    //     meta: {
    //         title: "系统管理",
    //         icon: "sisync"
    //     },
    //     // redirect: '/systemSet/jurisdiction',
    //     children: [{
    //             path: "jurisdiction",
    //             component: resolve =>
    //                 require(["@/views/systemSet/jurisdiction"], resolve),
    //             name: "jurisdiction",
    //             hidden: true,
    //             meta: { title: "权限管理" }
    //         },
    //         {
    //             path: "addRole",
    //             name: "addRole",
    //             meta: { title: "新增角色" },
    //             hidden: true,
    //             component: resolve =>
    //                 require(["@/views/systemSet/jurisdiction/CreateRole"], resolve)
    //         },
    //         {
    //             path: "role",
    //             name: "role",
    //             meta: { title: "角色管理" },
    //             component: resolve =>
    //                 require(["@/views/systemSet/jurisdiction"], resolve),
    //             hidden: false
    //         },
    //         {
    //             path: "mana",
    //             name: "mana",
    //             meta: { title: "管理员管理" },
    //             component: resolve =>
    //                 require(["@/views/systemSet/accountManage/AccountManage"], resolve),
    //             hidden: false
    //         },
    //         {
    //             path: "miniprogram",
    //             component: resolve =>
    //                 require(["@/views/systemSet/miniprogram"], resolve),
    //             name: "miniprogram",
    //             hidden: true,
    //             meta: { title: "小程序管理" }
    //         },
    //         {
    //             path: "basic",
    //             component: resolve => require(["@/views/systemSet/basicSet"], resolve),
    //             name: "basic",
    //             hidden: true,
    //             meta: { title: "基本设置" }
    //         },
    //         {
    //             path: "versions",
    //             component: resolve =>
    //                 require(["@/views/systemSet/versionsTongJi"], resolve),
    //             name: "versions",
    //             meta: { title: "版本管理" }
    //         }
    //     ]
    // },
    {
        path: "*",
        redirect: "/404",
        hidden: true
    }
];