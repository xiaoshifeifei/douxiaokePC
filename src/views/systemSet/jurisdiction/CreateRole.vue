<!--
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-07 16:28:17
 * @LastEditors: ldh
 * @LastEditTime: 2020-07-22 10:23:11
-->
<template>
  <div class="main fw700">
    <div class="base_form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        :hide-required-asterisk="false"
        label-width="120px"
      >
        <el-form-item label="角色名称" prop="rolename">
          <el-input
            v-model="ruleForm.rolename"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="remark">
          <el-input
            type="textarea"
            :rows="15"
            v-model="ruleForm.remark"
            placeholder="请输入角色描述"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色状态" prop="status">
          <el-switch :value="value" @change="onAccountStatusChange($event)">
          </el-switch>
        </el-form-item> -->
        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="onSubmit">创建角色</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { CreateRole } from "@/api/jurisdiction";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: [],
      ruleForm: {
        rolename: "",
        remark: "",
        job: "",
        sex: 0,
        tel: "",
        QQ: ""
      },
      rules: {
        rolename: [
          { required: true, message: "请输入名称" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符" }
        ],
        remark: [
          { required: true, message: "请输入角色描述" },
          { min: 3, max: 500, message: "长度在 3 到 500 个字符" }
        ],
        job: [
          { required: true, message: "请输入职位", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入客服电话", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      value: true
    };
  },
  methods: {
    handlePictureCardPreview() {
      console.log();
    },
    // 重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    /**
     * 提交表单
     */
    onSubmit() {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return;
        let loading = Loading.service();
        try {
          let res = await CreateRole({
            RoleName: this.ruleForm.rolename,
            Remark: this.ruleForm.remark
          });
          if (res.code === 0) {
            this.$message.success("角色创建成功");
            this.resetForm();
            this.$router.replace({ name: "role" });
          } else {
            // eslint-disable-next-line no-new
            throw new Error("角色创建失败");
          }
        } catch (error) {
          this.$message.error("角色创建失败");
        }
        setTimeout(() => {
          loading.close();
        }, 500);
      });
    },
    handleRemove() {
      console.log();
    },
    // 状态
    onAccountStatusChange(status) {
      console.log(status); 
    }
  }
};
</script>
<style>
.el-upload--picture-card {
  width: 108px;
  height: 108px;
  line-height: 108px;
}
</style>
<style lang="less" scoped>
.base_form {
  width: 35%;
  margin: 22px auto 0;
}
</style>
