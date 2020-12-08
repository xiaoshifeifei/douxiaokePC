<template>
  <div class="dashboard-box">
    <!--头部-->
    <h1 class="title">欢迎使用抖小客分销商后台管理系统 V1.0.0</h1>
    <!-- <base-info ref="baseInfo" /> -->
  </div>
</template>

<script>
// import baseInfo from "./components/baseInfo";
import baseInfo from "./components/base";

export default {
  name: "index",
  components: {
    baseInfo
  },
  data() {
    return {
    
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.dashboard-box{
  // padding:32px;
}
.title{
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,50%);
  font-size: 30px;
  font-weight: bold;
}
</style>
