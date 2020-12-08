export function setSelectRow(multipleSelectionAll, id) {
  if (!multipleSelectionAll || multipleSelectionAll.length == 0) {
    return
  }
  // 标识当前行的唯一键的名称
  const idKey = id
  const selectAllIds = []
  const that = this
  multipleSelectionAll.forEach(row => {
    selectAllIds.push(row[idKey])
  })
  this.$refs.table.clearSelection()
  for (let i = 0; i < this.tableData.length; i++) {
    if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
      // 设置选中，记住table组件需要使用ref="table"
      this.$refs.table.toggleRowSelection(this.tableData[i], true)
    }
  }
}
export function changePageCoreRecordData(multipleSelectionAll, multipleSelection, id) {
  // 标识当前行的唯一键的名称
  const idKey = id
  const that = this
  // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
  if (multipleSelectionAll.length == 0) {
    multipleSelectionAll = multipleSelection
    return
  }
  // 总选择里面的key集合
  const selectAllIds = []
  multipleSelectionAll.forEach(row => {
    selectAllIds.push(row[idKey])
  })
  const selectIds = []
  // 获取当前页选中的id
  multipleSelection.forEach(row => {
    selectIds.push(row[idKey])
    // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
    if (selectAllIds.indexOf(row[idKey]) < 0) {
      multipleSelectionAll.push(row)
    }
  })
  const noSelectIds = []
  // 得到当前页没有选中的id
  this.tableData.forEach(row => {
    if (selectIds.indexOf(row[idKey]) < 0) {
      noSelectIds.push(row[idKey])
    }
  })
  noSelectIds.forEach(id => {
    if (selectAllIds.indexOf(id) >= 0) {
      for (let i = 0; i < this.multipleSelectionAll.length; i++) {
        if (multipleSelectionAll[i][idKey] == id) {
          // 如果总选择中有未被选中的，那么就删除这条
          multipleSelectionAll.splice(i, 1)
          break
        }
      }
    }
  })
}
