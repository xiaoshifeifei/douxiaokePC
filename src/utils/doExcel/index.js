/*
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-27 18:49:02
 * @LastEditors: ldh
 * @LastEditTime: 2020-08-13 11:34:01
 */
import XLSX from 'xlsx'
import { export_json_to_excel } from './Export2Excel'

/**
 * 处理上传excel文件 数据 转数组
 * @param {Object} raw
 * @param {String} from 用于指定 表格 表头 启始行例 如A2 (默认A1 表格第一行第一例)
 * @return: {Array}
 */
export const importExcel = function(raw, from) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = function() {
      let binary = ''
      const bytes = new Uint8Array(this.result)
      const length = bytes.byteLength
      for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      // let XLSX = require('xlsx')
      const data = XLSX.read(binary, {
        type: 'binary'
      })
      // 表头不是表格第一行第一列(A1) 开始时 需指定 表头 从哪一行哪一例开始 如 A2 第二行A例
      if (from) {
        // !ref 表格 指定 内容行例 范围 如 A1:G12
        data.Sheets[data.SheetNames[0]]['!ref'] = data.Sheets[data.SheetNames[0]]['!ref'].replace('A1', from)
      }
      resolve(XLSX.utils.sheet_to_json(data.Sheets[data.SheetNames[0]]))
    }
    reader.readAsArrayBuffer(raw)
  })
}
/**
 * 导入表格数据 转 table 显示
 * @param {Array} arr
 * @param {Array} columns 表格数据结构 [{prop:'参数名',label:'表头名称'}]
 * @return: {Array}
 */
export const excel2Table = function(arr, columns) {
  return arr.map(v => {
    return columns.reduce((obj, c) => {
      obj[c.prop] = v[c.label] || ''
      return obj
    }, {})
  })
}

/**
 * 导出excel表格
 */
export const exportExcel = function(list, columns) {
  const tHeader = []; const filterVal = []
  columns.map(v => {
    tHeader.push(v.label)
    filterVal.push(v.prop)
  })
  const data = formatJson(filterVal, list)
  export_json_to_excel(tHeader, data)
}
const formatJson = function(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}
