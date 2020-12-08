<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    width="60%"
  >
    <el-form
      ref="form"
      :model="form"
      :inline="true"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item label="商品名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="form.keyword" />
      </el-form-item>
      <el-form-item label="商品简介">
        <el-input
          v-model="form.info"
          rows="5"
          type="textarea"
          style="width:400px;"
        />
      </el-form-item>
      <el-form-item label="富文本">
        <wangenduit
          v-model="detail"
          :isClear="isClear"
          @change="change"
        ></wangenduit>
      </el-form-item>
      <el-form-item label="图片上传">
        <uploaderPublic v-model="form.imgUrl"></uploaderPublic>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit"
        >确认</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "dianshanadmincreatwindow",
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        name: "",
        keyword: "",
        info: "",
        imgUrl:""
      },
      rules: {},
      // 富文本
      isClear: true,
      detail: ""
    };
  },
  watch: {
    "form.imageArr": function(val) {
      if (val) {
        this.form.image = val.join(",");
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.loading = true;
      if (this.isAdd) {
        this.doAdd();
      } else {
        this.doEdit();
      }
    },
    doAdd() {
      add(this.form)
        .then(res => {
          this.resetForm();
          this.$notify({
            title: "添加成功",
            type: "success",
            duration: 2500
          });
          this.loading = false;
          this.$parent.init();
        })
        .catch(err => {
          this.loading = false;
          console.log(err.response.data.message);
        });
    },
    doEdit() {
      edit(this.form)
        .then(res => {
          this.resetForm();
          this.$notify({
            title: "修改成功",
            type: "success",
            duration: 2500
          });
          this.loading = false;
          this.$parent.init();
        })
        .catch(err => {
          this.loading = false;
          console.log(err.response.data.message);
        });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
    },
    change(val) {
      this.form.info = val;
    }
  }
};
</script>

<style scoped>
.el-form--inline .el-form-item {
  display: block;
}
</style>
