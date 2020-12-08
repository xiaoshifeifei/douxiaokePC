<template>
  <div id='cityPicker'>
    <el-select
      v-model="province"
      placeholder="请选择所在省"
      @change="selectProvince($event)"
      :disabled="isDisable"
    >
      <el-option
        :label="item.label"
        :value="index"
        v-for="(item,index) in provinceDataList"
        :key="index"
      ></el-option>
    </el-select>
    省
    <el-select
      v-model="city"
      placeholder="请选择所在市"
      @change="selectCity($event)"
      :disabled="isDisable"
    >
      <el-option
        :label="item.label"
        :value="index"
        v-for="(item,index) in cityDataList"
        :key="index"
      ></el-option>
    </el-select>
    市
    <el-select
      v-model="area"
      placeholder="请选择所在县"
      @change="selectArea($event)"
      :disabled="isDisable"
    >
      <el-option
        :label="item.label"
        :value="index"
        v-for="(item,index) in areaDataList"
        :key="index"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import provinceData from '@/assets/city-data/province_db.js'
import cityData from '@/assets/city-data/city_db.js'
import areaData from '@/assets/city-data/area_db.js'
export default {
   name: 'cityPicker',
  data() {
    return {
      pickerValue: [0, 0, 0],
      provinceDataList: provinceData, // 省数组
      cityDataList: cityData[0], // 市数组
      areaDataList: areaData[0][0], // 区数组
      province: '', // 省
      city: '', // 市
      area: '' // 区
    }
  },
  props: {
    /* 默认值 */
    pickerValueDefault: {
      type: Array,
      default() {
        return [0, 0, 0]
      }
    },
    isDisable: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.handPickValueDefault() // 对 pickerValueDefault 做兼容处理
      const pickerValueDefault = this.pickerValue
      this.cityDataList = cityData[pickerValueDefault[0]]
      this.areaDataList = areaData[pickerValueDefault[0]][pickerValueDefault[1]]
      if (this.pickerValueDefault[0] != 0) {
        this.province = provinceData[pickerValueDefault[0]].label
      }
      if (this.pickerValueDefault[1] != 0) {
        this.city = cityData[pickerValueDefault[0]][pickerValueDefault[1]].label
      }
      if (this.pickerValueDefault[2] != 0) {
        this.area =
          areaData[pickerValueDefault[0]][pickerValueDefault[1]][
            pickerValueDefault[2]
          ].label
      }
    },
    handPickValueDefault() {
      let pickerValueDefault = [0, 0, 0]
      if (this.pickerValueDefault[0] != 0) {
        for (let i = 0; i < provinceData.length; i++) {
          if (provinceData[i].value == this.pickerValueDefault[0]) {
            this.pickerValue[0] = i
          }
        }
      }
      if (this.pickerValueDefault[1] != 0) {
        for (let i = 0; i < cityData[this.pickerValue[0]].length; i++) {
          if (
            cityData[this.pickerValue[0]][i].value == this.pickerValueDefault[1]
          ) {
            this.pickerValue[1] = i
          }
        }
      }
      if (this.pickerValueDefault[2] != 0) {
        for (
          let i = 0;
          i < areaData[this.pickerValue[0]][this.pickerValue[1]].length;
          i++
        ) {
          if (
            cityData[this.pickerValue[0]][this.pickerValue[1]].value ==
            this.pickerValueDefault[2]
          ) {
            this.pickerValue[2] = i
          }
        }
      }
    },
    selectProvince(e) {
      if (e != this.pickerValue[0] || this.province == '') {
        this.pickerValue = [e, 0, 0]
        this.cityDataList = cityData[e]
        this.city = cityData[e][this.pickerValue[1]].label
        this.areaDataList = areaData[e][0]
        this.area = areaData[e][0][0].label
      }
      this._$emit('selProvince', 0)
    },
    selectCity(e) {
      if (e != this.pickerValue[1] || this.city == '') {
        this.pickerValue[1] = e
        this.pickerValue[2] = 0
        this.areaDataList = areaData[this.pickerValue[0]][e]
        this.area = areaData[this.pickerValue[0]][e][0].label
      }
      this._$emit('selCity', 1)
    },
    selectArea(e) {
      this.pickerValue[2] = e
      this._$emit('selArea', 2)
    },
    reset() {
      this.province = ''
      this.city = ''
      this.area = ''
      this.cityDataList = cityData[0]
      this.areaDataList = areaData[0][0]
      this.pickerValue = [0, 0, 0]
    },
    _$emit(emitName, level) {
      let data = this._getData(level)
      this.$emit(emitName, data)
    },
    _getData(level) {
      let picker = []
      if (level == 0) {
        picker = [
          {
            label: this.provinceDataList[this.pickerValue[0]].label,
            value: this.provinceDataList[this.pickerValue[0]].value
          },
          {
            label: this.cityDataList[this.pickerValue[1]].label,
            value: this.cityDataList[this.pickerValue[1]].value
          },
          {
            label: this.areaDataList[this.pickerValue[2]].label,
            value: this.areaDataList[this.pickerValue[2]].value
          }
        ]
      } else if (level == 1) {
        picker = [
          {
            label: this.cityDataList[this.pickerValue[1]].label,
            value: this.cityDataList[this.pickerValue[1]].value
          },
          {
            label: this.areaDataList[this.pickerValue[2]].label,
            value: this.areaDataList[this.pickerValue[2]].value
          }
        ]
      } else if (level == 2) {
        picker = [
          {
            label: this.areaDataList[this.pickerValue[2]].label,
            value: this.areaDataList[this.pickerValue[2]].value
          }
        ]
      }
      return picker
    }
  }
}
</script>
<style lang="less">
#cityPicker {
  .el-select {
    width: 140px;
    height: 35px !important;
    .el-input__inner {
      height: 30px !important;
      line-height: 30px !important;
    }
  }
}
</style>
