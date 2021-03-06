/*
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-21 14:57:56
 * @LastEditors: ldh
 * @LastEditTime: 2020-07-22 09:49:16
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { authentication } from '@/settings'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)
        // console.log(document.title)

    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done()
        } else {

            /*
             * determine whether the user has obtained his permission roles through getInfo
             */
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    const { roles } = await store.dispatch('user/getInfo')
                    let accessRoutes = []

                    // eslint-disable-next-line max-depth
                    if (authentication === 'intelligence') {
                        accessRoutes = await store.dispatch(
                                'permission/generateRoutes',
                                roles
                            )
                            // await store.dispatch('permission/setAllButtons')
                    } else if (authentication === 'all') {
                        accessRoutes = await store.dispatch('permission/setAllRoutes')
                        console.log(accessRoutes)
                            /*
                             * console.log(accessRoutes)
                             * await store.dispatch('permission/setAllButtons')
                             */
                    }
                    /*
                     * console.log(accessRoutes)
                     * dynamically add accessible routes
                     */

                    router.addRoutes(accessRoutes)

                    /*
                     * hack method to ensure that addRoutes is complete
                     * set the replace: true, so the navigation will not leave a history record
                     */
                    next({
                        ...to,
                        replace: true
                    })
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})