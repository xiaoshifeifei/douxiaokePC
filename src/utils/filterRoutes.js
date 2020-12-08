/*
 * @Author: your name
 * @Date: 2020-04-26 09:16:19
 * @LastEditTime: 2020-05-11 12:15:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit          
 * @FilePath: \Jdgj-system\src\utils\filterRoutes.js
 */
import Layout from '@/layout'
import dic from '@/utils/menuDic'
import {generaMenu} from './index'
/**
 * @description 渲染路由
 * @param constantRoutes
 * @returns {*}
 */
export function filterRoutes(constantRoutes,resultList = []) {
    generaMenu(constantRoutes, resultList)
    return resultList
}
