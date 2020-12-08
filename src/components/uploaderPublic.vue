<template>
  <div class="avatar-uploader">
    <el-upload
      :action="imgurl()"
      :headers="headers"
      :file-list="[]"
      :show-file-list="false"
      :on-progress="handleProgress"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      multiple
    >
      <!-- <el-button size="small" type="primary">图片上传</el-button> -->
      <img v-if="imagesUrl" :src="imagesUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { getToken, getUid } from "@/utils/auth.js";
export default {
  name: "uploaderPublic",
  props: {
    value: {}
  },
  data() {
    return {
      token: getToken(),
      dialogVisible: false,
      imagesUrl: "",
      src: ""
    };
  },
  watch: {
    value: {
      immediate: true,
      handler: function(value) {
        if (!value) {
          this.fileList = [];
          this.imagesUrl = "";
          return;
        }
        this.imagesUrl = value;
      }
    }
  },
  computed: {
    headers() {
      return {
        "access-token": this.token
      };
    }
  },
  methods: {
    //获取接口地址
    imgurl() {
      return "http://otp.cdinfotech.top/file/upload_images";
    },
    //上传成功
    handleSuccess(res, file) {
      this.imagesUrl = `http://otp.cdinfotech.top/${res.url}`;
      //图片路径返回给父组件
      this.$emit("input", this.imagesUrl);
    },
    // 上传成功之前 对图片格式要求
    beforeUpload(file) {
      const isPic =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif" ||
        file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isPic) {
        this.$message.error("上传图片只能是 JPG、JPEG、PNG、GIF 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isPic && isLt2M;
    },
    handleProgress() {}
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height:178px!important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
