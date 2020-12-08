<template>
  <el-row :gutter="10">
    <!-- <el-col style="width:4%;font-size:16px;" :span="2">{{ title + ":" }}</el-col> -->
    <el-col :span="14">
      <el-date-picker
        v-model="dataPickerValue"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <!-- <el-button v-for="">{{最近一个月}}</el-button> -->
      <slot name="btns" />
    </el-col>
    <!-- <el-col :span="8" class="btns">
      <slot name="btn" />
    </el-col> -->
  </el-row>
</template>

<script>
export default {
  name: 'startTime',
  props: {
    title: String
  },
  data() {
    return {
      model: '',
      newData: '',
      dataPickerValue: [new Date(), new Date()]
    }
  }
}
</script>

<style scoped>
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
