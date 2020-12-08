<template>
  <div>
    <el-card>
    <el-row type="flex" justify="space-between">
      <div class="cell">
        <el-input
          prefix-icon="el-icon-search"
          placeholder="请输入商家名称"
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
        ref="multipleTable"
        v-loading="app.tableLoading"
        :data="app.tableData.list"
        tooltip-effect="dark"
        style="width: 100%"
        max-height="700"
        border
        :height="windowHeight"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          align="center"
          >
        </el-table-column>
        <el-table-column
          label="门店图标"
          align="center"
          width="120">
          <template slot-scope="scope">{{ scope.row.avatar }}</template>
        </el-table-column>

        <el-table-column
          label="商家名称"
          align="center"
          width="120">
          <template slot-scope="scope">{{ scope.row.sell_name }}</template>
        </el-table-column>
        <el-table-column
          label="门店名称"
          align="center"
          width="120">
          <template slot-scope="scope">{{ scope.row.sell_name }}</template>
        </el-table-column>
        <el-table-column
          label="商家名称"
          align="center"
          width="120">
          <template slot-scope="scope">{{ scope.row.sell_name }}</template>
        </el-table-column>
        
         <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="150px"
        >
          <template slot-scope="scope">
            <el-button
              class="class-btn"
              type="primary"
              @click="handleEditApp(scope.row.video_id)"
              size="mini"
              >查看</el-button
            >
            <el-button
              class="class-btn"
              type="success"
              @click="handleAdopt(scope.row.video_id)"
              size="mini"
              >申请</el-button
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
        <el-form-item label="商家名称" prop="sell_name">
          <el-input v-model="app.detail.sell_name" :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="门店名称" prop="store_name">
          <el-input v-model="app.detail.store_name"  :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="视频标题" prop="title">
          <el-input v-model="app.detail.title"  :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="视频地址" prop="url">
          <el-input v-model="app.detail.url"  :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="审核状态" prop="is_check" >
          <!-- <el-input v-model="app.detail.is_check"  :disabled="isCreate == '查看'"></el-input> -->
          <el-radio v-model="app.detail.radio" label="-1" :disabled="isCreate == '查看'">拒绝</el-radio>
          <el-radio v-model="app.detail.radio" label="1" :disabled="isCreate == '查看'">审核中</el-radio>
          <el-radio v-model="app.detail.radio" label="2" :disabled="isCreate == '查看'">审核通过</el-radio>
        </el-form-item>
        <!-- <el-form-item label="添加时间" prop="create_time">
          <el-input v-model="app.detail.create_time"  :disabled="isCreate == '查看'"></el-input>
        </el-form-item> -->
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
        ref="ruleForm"
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
        ref="detailForm"
        :model="app.detail"
        :rules="app.rules"
        label-width="150px"
        label-position="left"
      >
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
  videoList, //获取门店列表
  // storeRead, //详情
  videoReject, //驳回
  videoAdopt //通过
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
        { prop: "sell_name", label: "商家名称", width: 100 },
        { prop: "store_name", label: "门店名称", width: 100 },
        { prop: "title", label: "视频标题", width: 100 },
        { prop: "url", label: "视频地址", width: 300 },
        // { prop: "is_check", label: "审核状态", width: 50 },
        // { prop: "create_time", label: "添加时间", width: 100 },
      ],
      app: {
        tableData: {
          list: [],
          page: 1,
          totalItem: 0,
          limit: 10,
          keyword:''
        },
        detail: {
          remarkParams:'',
          remarkParamss:'',
          sell_name: "",
          store_name: "",
          title: "",
          url: "",
          is_check: "",
          create_time: "",
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
          remarkParamss: [
            { required: true, message: "请填写通过理由", trigger: "blur" }
          ],
          sell_name: [
            { required: true, message: "请填写商家名称", trigger: "blur" }
          ],
          store_name: [
            { required: true, message: "请填写门店名称", trigger: "blur" }
          ],
          title: [
            { required: true, message: "请填写视频标题", trigger: "blur" }
          ],
          url: [
            { required: true, message: "请填写视频地址", trigger: "blur" }
          ],
          is_check: [
            { required: true, message: "请选择审核状态", trigger: "blur" }
          ],
        },
        tableLoading: false,
        saveLoading: false
      },
      showDetail: false,
      isCreate: '', // true 创建 false 编辑
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
      this.$refs.detailForm.resetFields();
      this.isShowAdopt = false;
    },
    // 通过
    async handleAdopt(id) {
      this.app.detail.remarkParamss = ''
      this.isShowAdopt = true;
      this.app.detail.video_id = id
    },
    // 提交通过
    async onSaveAdopt() {
      this.app.tableLoading = true;
      const data = {
        video_id: this.app.detail.video_id,
        check_remark: this.app.detail.remarkParamss
      };
      let res = await videoAdopt(data);
      if (res.code == 0) {
        this.$message.success("已通过");
        this.app.tableLoading = false;
        this.isShowAdopt = false;
        this.getVersionList(1);
        this.$refs.detailForm.resetFields();
      } else {
        this.app.tableLoading = false;
      }
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
      this.app.detail.remarkParams = "";
      this.$refs.ruleForm.resetFields()
      this.isShow = false;
    },
    // 驳回
    async onSaveReject() {
      const data = {
        video_id: this.myId,
        check_remark: this.app.detail.remarkParams
      };
      let res = await videoReject(data);
      if (res.code == 0) {
        this.$message.success("已驳回");
        this.app.tableLoading = false;
        this.isShow = false;
        this.getVersionList(1);
        this.$refs.ruleForm.resetFields()
      } else {
        this.app.tableLoading = false;
      }
    },
    handleReject(id) {
      this.remarkParams = ''
      
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
        let res = await videoList(this.app.tableData);
        if (res.code === 0) {
          this.app.tableData.list = res.data.rows;
          // this.app.tableData.list.map(item => {
          //   if (item.is_check == -1) {
          //     item.is_check = ' 拒绝'
          //   }else if(item.is_check == 1) {
          //     item.is_check = ' 审核中'
          //   }else if(item.is_check == 2) {
          //     item.is_check = ' 审核通过'
          //   }
          // });
          this.app.tableData.pageNo = res.data.current_page;
          this.app.tableData.totalItem = res.data.total;
        } else {
          this.$message.error("获取列表失败");
        }
      } catch (error) {}
      this.app.tableLoading = false;
    },
    async handleEditApp(id) {
      this.showDetail = true
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
        remarkParams:'',
        remarkParamss:'',
        sell_name: "",
        store_name: "",
        title: "",
        url: "",
        is_check: "",
        create_time: "",
        remark: "",
        id: "",
        value: false,
        radio:''
      };
      this.$refs.detail.resetFields();
      this.showDetail = false;
    },
    resetDetails() {
      this.app.detail = {
        remarkParams: ""
      };
      this.$refs.ruleForm.resetFields();
      this.isShow = false;
    },
    resetDetails1() {
      this.app.detail = {
        remarkParams: "",
        share_url: "",
        is_bluev: ""
      };
      this.$refs.detailForm.resetFields();
      this.isShowAdopt = false;
    },
    onSaveDetail() {
      this.$refs.detail.validate(async valid => {
        if (!valid) return;
        let data = {
          sell_name: this.app.detail.sell_name, //VIP类型
          store_name: this.app.detail.store_name, //VIP类型
          title: this.app.detail.title, //VIP类型
          url: this.app.detail.url, //VIP类型
          is_check: this.app.detail.is_check, //VIP类型
        };
        if (this.isCreate == '编辑') {
          data.id = this.app.detail.id;
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
