<template>
  <el-card v-if="isShow">
    <el-row type="flex" justify="space-between"> </el-row>
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
        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleEditApp(scope.row.type)"
              size="mini"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- <el-pagination
        background
        layout="total,sizes, prev, pager, next, jumper"
        @current-change="getVersionLists"
        @size-change="handleSizeChange"
        :current-page="app.tableData.page"
        :page-size="app.tableData.limit"
        :total="app.tableData.totalItem"
        :page-sizes="[10, 20, 50, 100]"
      ></el-pagination> -->
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
        style="width:90%;margin:auto"
      >
        <el-form-item label="客服电话" prop="title">
          <el-input
            v-model="valueTel"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="resetDetail">取消</el-button>
        <el-button
          v-loading="app.saveLoading"
          type="primary"
          @click="onSaveDetail"
          >确认</el-button
        >
      </span>
    </el-dialog>
  </el-card>
  <el-card v-else>
    <mrfx @isN="isN"></mrfx>
  </el-card>
</template>

<script>
import { getToken } from "@/utils/auth";
import mrfx from "./moudles/mrfx.vue";
import {
  sellVipList, //获取商家会员详情
  rellVipRead, //商家会员详情
  sellVipUpdate, //修改会员详情
  sellVipSave, //会员添加
  rellVipDelete, //会员删除
  stoConfigCategory, //获取协议列表
  stoTreatyRead, //获取协议列表详情
  stoDistribute, //平台默认分佣配置列表
  serviceTel, //客服电话获取
  storeUpdateService, //客服电话更新
  saveUpDelete,  //平台默认分销配置删除
} from "@/api/listvip";
export default {
  components: {
    mrfx
  },
  data() {
    return {
      valueTel:'',
      isShow: true,
      value1: "", //日期
      uploadHeaders: {
        Authorization: getToken()
      },
      columns: [
        { prop: "name", label: "基础内容", width: 100 }
        // { prop: "operator", label: "操作时间", width: 100 },
      ],
      app: {
        tableData: {
          list: [],
          page: 1,
          totalItem: 0,
          limit: 10
        },
        detail: {
          treaty_id: "",
          type: "",
          type_text: "",
          status: "",
          content: "",
          operator: "",
          create_time: "2",
          id: "",
        },
        loading: false,
        rules: {
          // vip_type: [
          //   { required: true, message: "请选择VIP类型", trigger: "change" }
          // ],
          poster_count: [
            {
              required: true,
              message: "请输入每月海报制作数",
              trigger: "change"
            }
          ],
          spread_count: [
            { required: true, message: "请输入每月可传播次数", trigger: "blur" }
          ],
          price: [{ required: true, message: "价格", trigger: "blur" }]
        },
        tableLoading: false,
        saveLoading: false
      },
       rules: {
          title: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        },
      showDetail: false,
      isCreate: "", // true 创建 false 编辑
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
    isN(data){
      if (data == '1') {
        this.isShow = true
      }
    },
    // 新增
    add() {
      this.showDetail = true;
      this.isCreate = "新增";
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
    selectFile(file) {},
    beyondFile() {
      if (this.fileList.length > 0) {
        this.$message.error("只能上传一个app安装包,请删除后重新上传");
        return false;
      }
    },
    async handleDelete(id) {
      let res = await rellVipDelete(id);
      if (res.code == 0) {
        this.$message.error("删除成功");
        this.getVersionList();
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
        let res = await stoConfigCategory(this.app.tableData);
        if (res.code === 0) {
          this.app.tableData.list = res.data;
          this.app.tableData.pageNo = res.data.current_page;
          this.app.tableData.totalItem = res.data.total;
        } else {
          this.$message.error("获取列表失败");
        }
      } catch (error) {}
      this.app.tableLoading = false;
    },
    // 查看
    async handleEditApp(id) {
      console.log("id", id);
      this.isCreate = "查看";
      if (id == 1) {
        this.isShow = false;
       
      } else if (id == 2) {
        console.log(2);
        this.showDetail = true
        this.app.tableLoading = true;
        try {
          let res = await serviceTel();
          this.valueTel = res.data.value
          this.showDetail = true;
        } catch (error) {}
        this.app.tableLoading = false;
      }
    },
    // 编辑
    async handleApp(id) {
      this.isCreate = "编辑";
      this.app.tableLoading = true;
      this.app.detail.id = id;
      try {
        let res = await rellVipRead(id);
        this.app.detail.vip_type = res.data.vip_type;
        this.app.detail.spread_count = res.data.spread_count;
        this.app.detail.poster_count = res.data.poster_count;
        this.app.detail.name = res.data.name;
        this.app.detail.price = res.data.price;
        this.app.detail.upgradedesc = res.data.remark;
        this.app.detail.jilu = res.data.memo;
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
        radio: "2",
        spread_count: "",
        poster_count: "",
        price: "",
        name: "",

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
      this.value1 = "";
      this.$refs.detail.resetFields();
      this.showDetail = false;
    },
    async onSaveDetail() {
      console.log(99999,this.valueTel);
     if (!this.valueTel) return this.$message.error("请输入手机号")
        let data = {
          value: this.valueTel
        };
        this.app.saveLoading = true;
        try {
          await storeUpdateService(data);
          this.$message.success("编辑成功");
          this.resetDetail();
          this.getVersionList(1);
        } catch (error) {
          console.log(error);
        }
        this.app.saveLoading = false;
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
