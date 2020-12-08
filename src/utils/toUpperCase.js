export function toUpperCase(str) {
  // 切割字符串
  if (str != '') {
    let arr = str.split(' ')
    for (let i = 0; i < arr.length; i++) {
      // 将首字母大写 拼接后面没有首字母的部分
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    }
    // 将数组转为字符串
    str = arr.join(' ')
  }

  return str
}
