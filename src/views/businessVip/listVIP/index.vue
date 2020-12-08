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
      <div class="cell">
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
            @click="add"
            >新增</el-button
          >
        </el-row>
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
        <!-- { prop: "vip_type", label: "VIP类型", width: 100 }, -->
        <el-table-column
          min-width="50px"
          align="center"
          :resizable="false"
          label="VIP类型"
        >
          <template slot-scope="scope">
            <div>
              {{
                scope.row.vip_type == 1
                  ? "单月"
                  : scope.row.vip_type == 2
                  ? "单月"
                  : scope.row.vip_type == 2
                  ? "包月"
                  : scope.row.vip_type == 3
                  ? "季度"
                  : scope.row.vip_type == 4
                  ? "年度"
                  : ""
              }}
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
        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleEditApp(scope.row.sellvip_id)"
              size="mini"
              >查看</el-button
            >
            <el-button
              type="success"
              @click="handleApp(scope.row.sellvip_id)"
              size="mini"
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="handleDelete(scope.row.sellvip_id)"
              size="mini"
              >删除</el-button
            >

            <!-- <el-link type="primary" @click="handleEditApp(scope.row.sellvip_id)">
              <el-icon class="el-icon-view"></el-icon> 查看  <el-icon class="el-icon-edit"></el-icon>编辑</el-link
            > -->
            <!-- 
            <el-link style="margin-left:10px" type="primary" @click="handleDelete(scope.row.sellvip_id)">
              <el-icon class="el-icon-delete"></el-icon> 删除</el-link
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
        ref="detail"
        :model="app.detail"
        :rules="app.rules"
        label-width="150px"
        label-position="left"
      >
        <el-form-item label="VIP类型" prop="vip_type">
          <el-radio v-model="app.detail.radio" label="1" :disabled="isCreate == '查看'">单月</el-radio>
          <el-radio v-model="app.detail.radio" label="2" :disabled="isCreate == '查看'">包月</el-radio>
          <el-radio v-model="app.detail.radio" label="3" :disabled="isCreate == '查看'">季度</el-radio>
          <el-radio v-model="app.detail.radio" label="4" :disabled="isCreate == '查看'">年度</el-radio>
        </el-form-item>
        <el-form-item label="每月可传播次数" prop="spread_count">
          <el-input v-model="app.detail.spread_count" :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="每月海报制作数" prop="poster_count">
          <el-input v-model="app.detail.poster_count" :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="会员名称" prop="name">
          <el-input v-model="app.detail.name" :disabled="isCreate == '查看'"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="app.detail.price" :disabled="isCreate == '查看'"></el-input>
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
  sellVipList, //获取商家会员详情
  rellVipRead, //商家会员详情
  sellVipUpdate, //修改会员详情
  sellVipSave, //会员添加
  rellVipDelete //会员删除
} from "@/api/listvip";
export default {
  data() {
    return {
      value1: "", //日期
      uploadHeaders: {
        Authorization: getToken()
      },
      columns: [
        { prop: "spread_count", label: "每月可传播次数", width: 100 },
        { prop: "poster_count", label: "每月海报制作数", width: 100 },
        { prop: "name", label: "会员名称", width: 100 },
        { prop: "price", label: "会员价格", width: 100 }
      ],
      app: {
        tableData: {
          list: [],
          page: 1,
          totalItem: 0,
          limit: 10
        },
        detail: {
          vip_type: "",
          spread_count: "",
          poster_count: "",
          name: "",
          price: "",
          id: "",
          radio: "2"
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
          name: [{ required: true, message: "会员名称", trigger: "blur" }],
          price: [{ required: true, message: "价格", trigger: "blur" }]
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
    // 新增
    add() {
      this.showDetail = true
      this.isCreate = '新增'
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
        let res = await sellVipList(this.app.tableData);
        if (res.code === 0) {
          this.app.tableData.list = res.data.rows;
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
      this.isCreate = '查看'
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
    // 编辑
    async handleApp(id) {
      this.isCreate = '编辑'
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
    onSaveDetail() {
      this.$refs.detail.validate(async valid => {
        if (!valid) return;
        let data = {
          vip_type: this.app.detail.radio, //VIP类型
          spread_count: this.app.detail.spread_count, //传播数量
          poster_count: this.app.detail.poster_count, //传播数量
          name: this.app.detail.name, //会员名称
          price: this.app.detail.price //价格
        };
        //  data.exp_time = dataPa
        if (this.isCreate == '编辑') {
          data.sellvip_id = this.app.detail.id;
        }
        this.app.saveLoading = true;
        try {
          if (this.isCreate == '新增') {
            await sellVipSave(data);
            this.$message.success("添加成功");
          } else if (this.isCreate == '编辑'){
            await sellVipUpdate(data);
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
</style>
