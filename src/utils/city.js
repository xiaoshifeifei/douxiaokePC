import provinceData from '@/assets/city-data/province_db.js'
import cityData from '@/assets/city-data/city_db.js'
import areaData from '@/assets/city-data/area_db.js'

export function getCity(p, c, a) {
  let obj = {
    province: '',
    city: '',
    area: ''
  }
  let pIdx = 1
  let cIdx = 1
  provinceData.forEach((m, i) => {
    if (p == m.value) {
      obj.province = m.label
      pIdx = i
    }
  })
  cityData[pIdx].forEach((m, i) => {
    if (c == m.value) {
      obj.city = m.label
      cIdx = i
    }
  })
  if (areaData[pIdx][cIdx]) {
    areaData[pIdx][cIdx].forEach((m, i) => {
      if (a == m.value) {
        obj.area = m.label
      }
    })
  } else {
    obj.area = ''
  }
  return obj
}
