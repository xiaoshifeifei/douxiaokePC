import { composeRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'
import { filterRoutes } from '@/utils/filterRoutes'
import { getRouterList } from '@/api/router'
import { base } from '@/utils/base'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = {...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    },
    SET_ALL_ROUTES: (state, routes) => {
        let constantRoutes = [...base]
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({ commit }, roles) {
        // console.log(roles)
        return new Promise(resolve => {
            let arrayData = []
            let Routes = composeRoutes.concat(arrayData)
            let accessedRoutes
            if (roles.includes('admin')) {
                accessedRoutes = state.routes || []
            } else {
                accessedRoutes = filterAsyncRoutes(Routes, roles)
            }

            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    },
    setAllRoutes({ commit }) {
        return new Promise((resolve, reject) => {
            getRouterList()
                .then((res) => {
                    let accessRoutes = []
                    if (res.data && res.data.length) {
                        accessRoutes = filterRoutes(res.data)
                    }
                    accessRoutes.push({
                        path: '*',
                        redirect: '/404',
                        hidden: true
                    })
                    commit('SET_ALL_ROUTES', accessRoutes)
                    resolve(accessRoutes)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}