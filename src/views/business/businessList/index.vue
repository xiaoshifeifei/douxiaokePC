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
      <div class="cell">
        <el-input
          prefix-icon="el-icon-search"
          placeholder="app名称"
          clearable=""
          v-model="app.tableData.keyword"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="clicKeyword">查询</el-button>
      </div>
      <div class="cell">
        <el-row type="flex" justify="flex-end">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="add"
            >新增</el-button
          ></el-row
        >
      </div>
    </el-row>
    <el-card>
      <el-table
        v-loading="app.tableLoading"
        :data="app.tableData.list"
        style="width:100%"
        max-height="700"
        border
        :height="windowHeight"
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
        <el-table-column label="操作" align="center" fixed="right"  width="250">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEditApp(scope.row.sell_id)" size="mini">查看</el-button>
            <el-button type="success" @click="handleApp(scope.row.sell_id)" size="mini">编辑</el-button>
            <!-- <el-button type="success" @click="handleAzs(scope.row)" size="mini">会员赠送</el-button> -->
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
        :page-sizes="[10, 20, 50, 100]"
      ></el-pagination>
    </el-card>

    <el-dialog
      :visible="showDetail"
      :title="isCreate"
      :before-close="resetDetail"
      :close-on-click-modal="false"
    >
      <el-form
        ref="detail"
        :model="app.detail"
        :rules="app.rules"
        label-width="150px"
        label-position="left"
        style="width:85%;margin:auto"
      >
        <el-form-item label="企业名称" prop="enterprise" >
          <el-input v-model="app.detail.enterprise" :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="商家名称" prop="name">
          <el-input v-model="app.detail.name" :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="商家手机号" prop="tel">
          <el-input v-model="app.detail.tel" :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="会员类型" prop="vip">
          <el-input v-model="app.detail.vip" :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="门店数量" prop="store_count">
          <el-input v-model="app.detail.store_count" :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="create_time">
          <el-input v-model="app.detail.create_time" :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="resetDetail">取消</el-button>
        <el-button
          v-loading="app.saveLoading"
          type="primary"
          @click="onSaveDetail"
          :disabled="isCreate == '查看'"
          >保存</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :visible="showDetails"
      title="会员赠送"
      :before-close="resetDetails"
      :close-on-click-modal="false"
    >
      <el-form
        style="width:85%;margin:auto"
         label-width="150px"
        label-position="left"
      >
        <el-form-item label="会员天数">
          <el-input v-model="value2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="resetDetails">取消</el-button>
        <el-button
          v-loading="app.saveLoading"
          type="primary"
          @click="onSaveDetails"
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
  sellList, //获取列表
  rellRead, //详情
  // storeSellvip  //会员赠送
} from "@/api/listvip";
export default {
  data() {
    return {
      paramsObj:{},
      value2:'', //
      showDetails: false, //会员赠送弹窗
      uploadHeaders: {
        Authorization: getToken()
      },
      columns: [
        { prop: "enterprise", label: "企业名称", width: 100 },
        { prop: "name", label: "商家名称", width: 100 },
        { prop: "tel", label: "商家手机号", width: 100 },
        { prop: "vip", label: "会员类型", width: 100 },
        { prop: "store_count", label: "门店数量", width: 100 },
        { prop: "create_time", label: "创建时间", width: 100 }
      ],
      app: {
        tableData: {
          list: [],
          page: 1,
          totalItem: 0,
          limit: 10,
          keyword: ''
        },
        detail: {
          versionnotype: null,
          mustupdate: null,
          cdnurl: "",
          isuse: false,
          create_time: "",
          store_count: "",
          vip: "",
          tel: "",
          name: "",
          enterprise: "",
          id: "",
        },
        loading: false,
        rules: {
          enterprise: [
            { required: true, message: "请输入企业名称", trigger: "blur" }
          ],
          name: [
            { required: true, message: "请输入商家名称", trigger: "blur" }
          ],
          tel: [
            { required: true, message: "请输入商家手机号", trigger: "blur" }
          ],
          vip: [
            { required: true, message: "请选择会员类型", trigger: "change" }
          ],
          store_count: [
            { required: true, message: "请输入门店数量", trigger: "blur" }
          ],
          create_time: [
            { required: true, message: "请输入创建时间", trigger: "blur" }
          ],
        },
        tableLoading: false,
        saveLoading: false
      },
      showDetail: false,
      isCreate: '', // true 创建 false 编辑
      // keywords: "",
      fileList: [] //此数组中存入所有提交的文档信息
    };
  },
  created() {
    this.windowHeight = window.innerHeight - 300 + "px";
  },
  mounted() {
    this.getVersionList(1);
  },
  methods: {
    // 会员赠送
    async handleAzs(params) {
      this.showDetails = true
      console.log('params',params);
      this.paramsObj = params
    },
    // 会员赠送提交
    async onSaveDetails() {
      if (this.value2.trim() == '' ) {
          return this.$message.error("会员天数不能为空")
      }
       const data = {
          tel:this.paramsObj.tel,
          days:this.value2
        }
      let res = await storeSellvip(data)
      if (res.code == 0) {
        this.$message.success("会员赠送成功")
        this.showDetails = false
        this.getVersionList(1)
         
      }
    },
    // 会员赠送取消
    resetDetails() {
      this.value2 = ""
      this.showDetails = false
    },
    // 新增
    add() {
      this.showDetail = true
      this.isCreate = "新增"
    },
    // 查询搜索
    clicKeyword() {
      this.getVersionList(1);
    },
    getVersionLists(val) {
      console.log(`第 ${val} 页`);
      this.getVersionList(val);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.app.tableData.limit = val;
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
      this.app.tableData.page = page;
      console.log('this.app.tableData',this.app.tableData);
      try {
        let res = await sellList(this.app.tableData);
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
    // 查看
    async handleEditApp(id) {
      this.isCreate = '查看'
      this.app.tableLoading = true;
      this.app.detail.id = id;
      try {
        let res = await rellRead(id);
        console.log(1121,res);
        this.app.detail.enterprise = res.data.info.enterprise;
        this.app.detail.name = res.data.info.name;
        this.app.detail.tel = res.data.info.tel;
        this.app.detail.vip = res.data.info.vip;
        this.app.detail.store_count = res.data.info.store_count;
        this.app.detail.create_time = res.data.info.create_time;
     
        this.showDetail = true;
      } catch (error) {}
      this.app.tableLoading = false;
    },
    // 编辑
    async handleApp(id) {
      this.isCreate = '编辑'
      this.app.tableLoading = true;
      this.app.detail.id = id;
      try {
        let res = await rellRead(id);
        this.app.detail.enterprise = res.data.info.enterprise;
        this.app.detail.name = res.data.info.name;
        this.app.detail.tel = res.data.info.tel;
        this.app.detail.vip = res.data.info.vip;
        this.app.detail.store_count = res.data.info.store_count;
        this.app.detail.create_time = res.data.info.create_time;
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
        create_time: "",
        store_count: "",
        vip: "",
        tel: "",
        name: "",
        enterprise: ""
      };
      this.$refs.detail.resetFields();
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
        if (this.isCreate == '编辑') {
          data.id = this.app.detail.id;
        }
        this.app.saveLoading = true;
        try {
          if (this.isCreate == '新增') {
            await reqAddAppVersion(data);
            this.$message.success("新增成功");
            this.$refs.detail.resetFields();
          } else if (this.isCreate == '编辑'){
            await updateVersion(data);
            this.$message.success("编辑成功");
            this.$refs.detail.resetFields();
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
