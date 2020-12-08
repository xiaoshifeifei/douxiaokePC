/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

export const base = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            // name: 'dashboard',
            component: () =>
                import ('@/views/dashboard'),
            meta: {
                title: '首页',
                icon: 'dashboard',
                affix: true
            }
        }]
    }
]