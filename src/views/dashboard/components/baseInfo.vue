<template>
  <el-row>
    <el-col :xs="12" :sm="12" :lg="{ span: '4-8' }"
    class="dashboard-console-grid"  v-for="item in 5" :key="item">
      <el-card :bordered="false">
        <i class="el-icon-eleme"></i>
        <p>用户管理</p>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      grid: {
        xl: 3,
        lg: 6,
        md: 6,
        sm: 8,
        xs: 8
      }
    };
  }
};
</script>
<style scoped>
  .el-col-lg-4-8 {
    width: 20%;
    padding-right:15px;
  }
  .el-col-lg-4-8:last-child{
    padding-right:0px;
  }
 
</style>>


</style>
<style lang="less">
.dashboard-console-grid {
  text-align: center;
  i {
    font-size: 32px;
  }
  p {
    margin-top: 8px;
  }
}

</style>
