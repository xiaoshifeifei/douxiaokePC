<!--
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-30 16:07:29
 * @LastEditors: ldh
 * @LastEditTime: 2020-08-06 10:25:49
-->
<template>
  <el-card>
    <el-row type="flex" justify="space-between">
      <!-- <div class="cell">
            <span class="cell-label">创建时间：</span>
            <el-date-picker
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </div> -->
      <!-- <div class="cell">
        <el-input
          prefix-icon="el-icon-search"
          placeholder="app名称"
          clearable=""
          v-model="keywords"
        ></el-input>
        <el-button type="primary" icon="el-icon-search"></el-button>
      </div>
      <div class="cell">
        <el-row type="flex" justify="flex-end">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="
              () => {
                showDetail = true;
                isCreate = true;
              }
            "
            >添加</el-button
          ></el-row
        >
      </div> -->
    </el-row>
    <el-card>
      <el-table
        v-loading="app.tableLoading"
        :data="app.tableData.list"
        style="width:100%"
        max-height="700"
        border
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :min-width="item.width"
        >
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleEditApp(scope.row.sell_id)">
              <el-icon class="el-icon-edit"></el-icon> 查看编辑</el-link
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="total,sizes, prev, pager, next, jumper"
        @current-change="getVersionLists"
        @size-change="handleSizeChange"
        :current-page="app.tableData.page"
        :page-size="app.tableData.limit"
        :total="app.tableData.totalItem"
        :page-sizes="[10,20, 50, 100]"
      ></el-pagination>
    </el-card>

    <el-dialog
      :visible="showDetail"
      :title="isCreate ? '创建版本号' : '编辑版本号'"
      :before-close="resetDetail"
      :close-on-click-modal="false"
    >
      <el-form
        ref="detail"
        :model="app.detail"
        :rules="app.rules"
        label-width="150px"
        label-position="left"
      >
        <el-form-item label="用户名" prop="versionno">
          <el-input v-model="app.detail.versionno"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="versionno">
          <el-input v-model="app.detail.versionno"></el-input>
        </el-form-item>
        <el-form-item label="过期时间" prop="versionno">
          <el-input v-model="app.detail.versionno"></el-input>
        </el-form-item>
        <el-form-item label="雇佣配比" prop="versionno">
          <el-input v-model="app.detail.versionno"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="versionno">
          <el-input v-model="app.detail.versionno"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="resetDetail">取消</el-button>
        <el-button
          v-loading="app.saveLoading"
          type="primary"
          @click="onSaveDetail"
          >保存</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { getToken } from "@/utils/auth";
import {
  // reqUploadFile,
  // reqAddAppVersion,
  // reqVersionList,
  // reqVersionDetail,
  // updateVersion,
  sellList,  //获取列表
  rellRead  //详情
} from "@/api/listvip";
export default { 
  data() {
    return {
      uploadHeaders: {
        Authorization: getToken()
      },
      columns: [
        { prop: "name", label: "用户名", width: 100 },
        { prop: "tel", label: "手机号", width: 100 },
        { prop: "exp_time", label: "过期时间", width: 100 },
        { prop: "commission_ratio", label: "雇佣配比", width: 100 },
        { prop: "password", label: "密码", width: 100 },
      ],
      app: {
        tableData: {
          list: [],
          page: 1,
          totalItem: 0,
          limit: 10
        },
        detail: {
          versionnotype: null,
          mustupdate: null,
          cdnurl: "",
          isuse: false,
          savepath: "",
          saveurl: "",
          upgradedesc: "",
          versionno: "",
          jilu: "",
          url: "",
          id: ""
        },
        loading: false,
        rules: {
          versionnotype: [
            { required: true, message: "请选择版本类型", trigger: "change" }
          ],
          mustupdate: [
            { required: true, message: "请选择是否强制更新", trigger: "change" }
          ],
          upgradedesc: [
            { required: true, message: "升级描述不能为空", trigger: "blur" }
          ],
          versionno: [
            { required: true, message: "版本号不能为空", trigger: "blur" }
          ],
          saveurl: [
            { required: true, message: "路径不能为空", trigger: "blur" }
          ],
          savepath: [
            { required: true, message: "路径不能为空", trigger: "blur" }
          ],
          cdnurl: [{ required: true, message: "路径不能为空", trigger: "blur" }]
        },
        tableLoading: false,
        saveLoading: false
      },
      showDetail: false,
      isCreate: false, // true 创建 false 编辑
      keywords:'',
      fileList: [] //此数组中存入所有提交的文档信息
    };
  },
  mounted() {
    this.getVersionList(1);
  },
  methods: {
     getVersionLists(val) {
    console.log(`每21111页 ${val} 条`)
    this.getVersionList(val);
    },
    handleSizeChange(val){
     console.log(`每页 ${val} 条`)
     this.app.tableData.limit = val
     this.getVersionList(1);
    },
    selectFile(file) {},
    beyondFile() {
      if (this.fileList.length > 0) {
        this.$message.error("只能上传一个app安装包,请删除后重新上传");
        return false;
      }
    },
    beforeUpload(file) {
      this.fileList.push(file);
      this.app.loading = true;
    },
    handlesuccess(response, file, fileList) {
      //response即为后台返回的全部内容
      if (response.code == 0) {
        this.app.loading = false;
        this.app.detail.cdnurl = response.data.url;
      } else {
        this.$refs.upload.clearFiles();
      }
    },
    onRmove() {
      this.app.detail.cdnurl = "";
      this.fileList = [];
      this.$refs.upload.clearFiles();
    },
    async getVersionList(page) {
      this.app.tableLoading = true;
      this.app.tableData.page = page
      try {
        let res = await sellList( this.app.tableData);
        console.log("res", res);
        if (res.code === 0) {
          console.log("res", res);
          this.app.tableData.list = res.data.rows;
          this.app.tableData.pageNo = res.data.current_page;
          this.app.tableData.totalItem = res.data.total;
          if (this.app.tableData.list.length > 0) {
            this.app.tableData.list.forEach(item => {
              if (item.is_force == 1) {
                item.is_force = "是";
              } else {
                item.is_force = "否";
              }
            });
          }
        } else {
          this.$message.error("获取列表失败");
        }
      } catch (error) {}
      this.app.tableLoading = false;
    },
    async handleEditApp(id) {
      this.app.tableLoading = true;
      this.app.detail.id = id;
      try {
        let res = await rellRead(id);
        this.app.detail.versionno = res.data.version;
        this.app.detail.versionnotype = res.data.client_system;
        this.app.detail.mustupdate = res.data.is_force;
        this.app.detail.cdnurl = res.data.url;
        this.app.detail.upgradedesc = res.data.remark;
        this.app.detail.jilu = res.data.memo;
        this.isCreate = false;
        this.showDetail = true;
      } catch (error) {}
      this.app.tableLoading = false;
    },
    async uploadApp(file) {
      // console.log(file);
      let formData = new FormData();
      formData.append("file", file.file);
      this.app.loading = true;
      try {
        let res = await reqUploadFile(formData);

        // if (res.cdnUrl) {
        //   this.app.detail.cdnurl = res.cdnUrl;
        //   this.app.detail.saveurl = res.saveUrl;
        // } else {
        //   this.$refs.upload.clearFiles();
        // }
      } catch (error) {
        console.log(error);
        // this.$refs.upload.clearFiles();
      }
      this.app.loading = false;
    },
    resetDetail() {
      this.app.detail = {
        versionnotype: null,
        mustupdate: null,
        cdnurl: "",
        isuse: false,
        savepath: "",
        saveurl: "",
        upgradedesc: "",
        versionno: "",
        jilu: "",
        url: ""
      };
      this.$refs.detail.resetFields();
      this.$refs.upload.clearFiles();
      this.showDetail = false;
    },
    onSaveDetail() {
      this.$refs.detail.validate(async valid => {
        if (!valid) return;

        let data = {
          version: this.app.detail.versionno,
          client_system: this.app.detail.versionnotype,
          is_force: this.app.detail.mustupdate,
          url: this.app.detail.cdnurl,
          remark: this.app.detail.upgradedesc,
          memo: this.app.detail.jilu
        };
        if (!this.isCreate) {
          data.id=this.app.detail.id
        }
        this.app.saveLoading = true;
        try {
          if (this.isCreate) {
            await reqAddAppVersion(data);
            this.$message.success("版本号创建成功");
          } else {
            await updateVersion(data);
            this.$message.success("版本号更新成功");
          }
          this.resetDetail();
          this.getVersionList(1);
        } catch (error) {
          console.log(error);
        }
        this.app.saveLoading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.cell {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .cell-label {
    width: 100px;
  }
  .el-input {
    max-width: 300px;
    margin-right: 20px;
  }
}
</style>
