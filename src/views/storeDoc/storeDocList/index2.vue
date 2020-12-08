<!--
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-30 16:07:29
 * @LastEditors: ldh
 * @LastEditTime: 2020-08-06 10:25:49
-->
<template>
  <div>
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
          placeholder="请输入商家名称"
          clearable=""
          v-model="app.tableData.keywords"
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
          align="center"
          :resizable="false"
          label="门店图标"
          width="80"
        >
          <template slot-scope="scope">
            <div class="zy_elImage">
              <el-image
                :preview-src-list="[scope.row.avatar]"
                :src="scope.row.avatar"
                alt
              ></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :min-width="item.width"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="190px"
        >
          <template slot-scope="scope">
            <el-button
              class="class-btn"
              type="primary"
              @click="handleEditApp(scope.row.store_id)"
              size="mini"
              >查看</el-button
            >
            <el-button
              class="class-btn"
              type="warning"
              @click="handleReject(scope.row.store_id)"
              v-if="scope.row.check_status_text == '审核中'"
              size="mini"
              >驳回</el-button
            >
            <el-button
              class="class-btn"
              type="success"
              @click="handleAdopt(scope.row.store_id)"
              v-if="scope.row.check_status_text == '审核中'"
              size="mini"
              >通过</el-button
            >
            <!-- <el-link type="primary" @click="handleEditApp(scope.row.store_id)">
              <el-icon class="el-icon-edit"></el-icon> 查看</el-link
            > -->

            <!-- <el-link style="margin-left:10px" type="primary" @click="handleReject(scope.row.store_id)" v-if="scope.row.check_status_text == '审核中'">
              <el-icon class="el-icon-share"></el-icon> 驳回</el-link
            > -->
            <!-- <el-link style="margin-left:10px" type="primary" @click="handleAdopt(scope.row.store_id)">
              <el-icon class="el-icon-success"></el-icon> 通过</el-link
            > -->
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
        style="width:80%;margin:auto"
        ref="detail"
        :model="app.detail"
        :rules="app.rules"
        label-width="150px"
        label-position="left"
      >
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="app.detail.address" :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="门店图标" prop="avatar" v-if="isCreate == '查看'">
          <el-image
            :preview-src-list="[app.detail.avatar]"
            :src="app.detail.avatar"
            alt
             :disabled="isCreate == '查看'"
          ></el-image>
        </el-form-item>
        <el-form-item label="门店图标" prop="avatar" v-if="isCreate != '查看'">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="审核状态" prop="check_status_text">
          <el-input v-model="app.detail.check_status_text" :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="app.detail.contacts"  :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="是否蓝V号" prop="is_bluev" v-if="isCreate == '查看'">
          <el-input v-model="app.detail.is_bluev == 1 ? '是' : '否'"  :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="是否蓝V号" prop="is_bluev" v-if="isCreate != '查看'">
          <el-radio v-model="app.detail.radio" label="1" :disabled="isCreate == '查看'">是</el-radio>
          <el-radio v-model="app.detail.radio" label="0" :disabled="isCreate == '查看'">否</el-radio>
        </el-form-item>
        <el-form-item label="商家名称" prop="sell_name">
          <el-input v-model="app.detail.sell_name"  :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="抖音号分享地址" prop="share_url">
          <el-input v-model="app.detail.share_url"  :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="门店名称" prop="store_name" >
          <el-input v-model="app.detail.store_name"  :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="app.detail.tel"  :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="抖音号" prop="tiktok_num">
          <el-input v-model="app.detail.tiktok_num"  :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="门店备注" prop="remark">
          <el-input v-model="app.detail.remark"  :disabled="isCreate == '查看'"></el-input>
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
        <!-- <el-button
          v-loading="app.saveLoading"
          type="primary"
          @click="onSaveDetail"
          >保存</el-button
        > -->
      </span>
    </el-dialog>
    <el-dialog
      :visible="isShow"
      title="驳回"
      :before-close="resetDetails"
      :close-on-click-modal="false"
    >
      <el-form
        ref="detailBh"
        :model="app.detail"
        :rules="app.rules"
        label-width="150px"
        label-position="left"
      >
        <el-form-item label="驳回理由" prop="remarkParams">
          <el-input v-model="app.detail.remarkParams"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="resetReject">取消</el-button>
        <el-button
          v-loading="app.saveLoading"
          type="primary"
          @click="onSaveReject"
          >驳回</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :visible="isShowAdopt"
      title="通过"
      :before-close="resetDetails1"
      :close-on-click-modal="false"
    >
      <el-form
        ref="detailPass"
        :model="app.detail"
        :rules="app.rules"
        label-width="150px"
        label-position="left"
      >
        <el-form-item label="是否蓝V号" prop="value">
          <el-switch
            v-model="app.detail.value"
            active-color="#13ce66"
            inactive-color="#ccc"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="抖音号分享地址" prop="share_url">
          <el-input v-model="app.detail.share_url"></el-input>
        </el-form-item>
        <el-form-item label="通过理由" prop="remarkParamss">
          <el-input v-model="app.detail.remarkParamss"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="resetAdopt">取消</el-button>
        <el-button
          v-loading="app.saveLoading"
          type="primary"
          @click="onSaveAdopt"
          >通过</el-button
        >
      </span>
    </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import {
  // reqUploadFile,
  // reqAddAppVersion,
  // reqVersionList,
  // reqVersionDetail,
  // updateVersion,
  storeList, //获取门店列表
  storeRead, //详情
  storeReject, //驳回
  storeAdopt //通过
} from "@/api/listvip";
export default {
  data() {
    return {
      isShowAdopt: false,
      dialogImageUrl: "",
      dialogVisible: false,
      isShow: false,
      uploadHeaders: {
        Authorization: getToken()
      },
      columns: [
        // { prop: "avatar", label: "门店图标", width: 100 },
        { prop: "sell_name", label: "商家名称", width: 100 },
        { prop: "store_name", label: "门店名称", width: 100 },
        { prop: "contacts", label: "联系人", width: 100 },
        { prop: "tel", label: "联系电话", width: 100 },
        { prop: "address", label: "详细地址", width: 100 },
        { prop: "tiktok_num", label: "抖音号", width: 100 },
        { prop: "remark", label: "门店备注", width: 100 },
        { prop: "check_status", label: "审核状态", width: 100 },
        { prop: "check_status_text", label: "审核状态秒数", width: 100 }
      ],
      app: {
        tableData: {
          list: [],
          page: 1,
          totalItem: 0,
          limit: 10,
          keywords:''
        },
        detail: {
          remarkParams: "",
          remarkParamss: "",
          address: "",
          business_license_url: "",
          check_status_text: "",
          contacts: "",
          versionno: "",
          sell_name: "",
          share_url: "",
          store_name: "",
          is_bluev: "",
          tel: "",
          tiktok_num: "",
          remark: "",
          id: "",
          value: false,
          radio:''
        },
        loading: false,
        rules: {
          remarkParams: [
            { required: true, message: "请填写驳回理由", trigger: "blur" }
          ],
          share_url: [
            {
              required: true,
              message: "请填写抖音号分享地址",
              trigger: "chblurange"
            }
          ],
          remarkParamss: [
            { required: true, message: "请填写通过理由", trigger: "blur" }
          ]
        },
        tableLoading: false,
        saveLoading: false
      },
      showDetail: false,
      isCreate: '', // true 创建 false 编辑
      keywords: "",
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
    // 查询
    clicKeyword() {
      this.getVersionList(1);
    },
    // 新增
    add() {
      this.isCreate = '新增'
      this.showDetail = true
    },
    resetAdopt() {
      this.app.detail.remarkParams = "";
      this.$refs.detailPass.resetFields();
      this.isShowAdopt = false;
    },
    // 提交通过
    async onSaveAdopt() {
      if (this.app.detail.value) {
        this.app.detail.value = 1;
      } else {
        this.app.detail.value = 0;
      }
      this.app.tableLoading = true;
      const data = {
        store_id: this.app.detail.store_id,
        is_bluev: this.app.detail.value,
        share_url: this.app.detail.share_url,
        check_remark: this.app.detail.remarkParamss
      };
      let res = await storeAdopt(data);
      if (res.code == 0) {
        this.$message.success("已通过");
        this.app.tableLoading = false;
        this.isShowAdopt = false;
        this.getVersionList(1);
        this.$refs.detailPass.resetFields();
      } else {
        this.app.tableLoading = false;
      }
    },
    // 通过
    async handleAdopt(params) {
      let res1 = await storeRead(params);
      this.app.detail.store_id = res1.data.store_id;
      this.isShowAdopt = true;
    },
    getVersionLists(val) {
      // console.log(`每21111页 ${val} 条`)
      this.getVersionList(val);
    },
    handleSizeChange(val) {
      //  console.log(`每页 ${val} 条`)
      this.app.tableData.limit = val;
      this.getVersionList(1);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    resetReject() {
      this.app.detailBh.remarkParams = "";
      this.isShow = false;
    },
    // 驳回
    async onSaveReject() {
      const data = {
        store_id: this.myId,
        check_remark: this.app.detail.remarkParams
      };
      let res = await storeReject(data);
      if (res.code == 0) {
        this.$message.success("已驳回");
        this.app.tableLoading = false;
        this.isShow = false;
        this.getVersionList(1);
        this.$refs.detailBh.resetFields()
      } else {
        this.app.tableLoading = false;
      }
    },
    async handleReject(id) {
      this.isShow = true;
      this.myId = id;
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

      try {
        let res = await storeList(this.app.tableData);
        if (res.code === 0) {
          console.log("res", res);
          this.app.tableData.list = res.data.rows;
          this.app.tableData.list.map(item => {
            if (!item.sell_name) {
              item.sell_name = "暂无名称";
            }
            if (!item.remark) {
              item.remark = "暂无备注";
            }
          });
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
      this.isCreate = "查看"
      this.app.tableLoading = true;
      this.app.detail.id = id;
      try {
        let res = await storeRead(id);
        console.log("res1111", res);
        this.app.detail.address = res.data.address;
        this.app.detail.avatar = res.data.avatar;
        this.app.detail.check_status_text = res.data.check_status_text;
        this.app.detail.contacts = res.data.contacts;
        this.app.detail.versionno = res.data.versionno;
        this.app.detail.sell_name = res.data.sell_name;
        this.app.detail.share_url = res.data.share_url;
        this.app.detail.store_name = res.data.store_name;
        this.app.detail.tel = res.data.tel;
        this.app.detail.tiktok_num = res.data.tiktok_num;
        this.app.detail.remark = res.data.remark;
        this.app.detail.is_bluev = res.data.is_bluev;

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
        address: "",
        business_license_url: "",
        ccheck_status_textdnurl: "",
        contacts: "",
        versionno: "",
        sell_name: "",
        share_url: "",
        store_name: "",
        is_bluev: "",
        tel: "",
        is_bluev: "",
        remark: "",
        tiktok_num: ""
      };
      this.$refs.detail.resetFields();
      this.showDetail = false;
    },
    resetDetails() {
      this.app.detail = {
        remarkParams: ""
      };
      this.$refs.detailBh.resetFields();
      this.isShow = false;
    },
    resetDetails1() {
      this.app.detail = {
        remarkParams: "",
        share_url: "",
        is_bluev: ""
      };
      this.$refs.detailPass.resetFields();
      this.isShowAdopt = false;
    },
    onSaveDetail() {
      this.$refs.detail.validate(async valid => {
        if (!valid) return;

        let data = {
          address : this.app.detail.address,
          avatar : this.app.detail.avatar,
          check_status_text : this.app.detail.check_status_text,
          contacts : this.app.detail.contacts,
          versionno : this.app.detail.versionno,
          sell_name :this.app.detail.sell_name,
          share_url : this.app.detail.share_url,
          store_name : this.app.detail.store_name,
          tel : this.app.detail.tel,
          tiktok_num : this.app.detail.tiktok_num,
          remark : this.app.detail.remark,
          is_bluev : this.app.detail.is_bluev,
        };
        if (this.isCreate == '编辑') {
          data.id = this.app.detail.id;
          data.is_bluev = this.app.detail.is_bluev;
        }
        this.app.saveLoading = true;
        try {
          if (this.isCreate == '新增') {
            await reqAddAppVersion(data);
            this.$message.success("新增成功");
          } else if (this.isCreate == '编辑') {
            await updateVersion(data);
            this.$message.success("编辑成功");
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
.el-table .cell {
  vertical-align: middle;
}
</style>
