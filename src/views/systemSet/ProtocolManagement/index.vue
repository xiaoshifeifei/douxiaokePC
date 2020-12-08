<template>
  <el-card>
    <el-row type="flex" justify="space-between" >
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
        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleEditApp(scope.row.treaty_id)"
              size="mini"
              >编辑</el-button
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
        ref="detail"
        :model="app.detail"
        :rules="app.rules"
        label-width="100px"
        label-position="left"
        style="width:90%;margin:auto"
      >
         <el-form-item label="消息标题" prop="title">
            <el-input
              v-model="app.detail.type_text"
              :disabled="isCreate == '查看'"
            ></el-input>
          </el-form-item>
          <el-form-item label="消息内容" class="zy_tinymmm" prop="Content">
            <Tinymce
              ref="editor"
              v-model="app.detail.content"
              :key="randomKey"
              :height="250"
              :action="upUrl"
              imgFile="img_file"
            />
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
  sellVipList, //获取商家会员详情
  rellVipRead, //商家会员详情
  sellVipUpdate, //修改会员详情
  sellVipSave, //会员添加
  rellVipDelete, //会员删除

  stoTreaty,  //获取协议列表
  stoTreatyRead,  //获取协议列表详情
  plaTreatySave, //修改协议
} from "@/api/listvip";
export default {
  data() {
    return {
      upUrl: process.env.VUE_APP_BASE_API + "/treaty/img_upload",
      value1: "", //日期
      uploadHeaders: {
        Authorization: getToken()
      },
      columns: [
        { prop: "type_text", label: "协议类型", width: 100 },
        { prop: "operator", label: "操作人", width: 100 },
        { prop: "create_time", label: "操作时间", width: 100 },
      ],
       randomKey: "",
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
          id:''
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
        let res = await stoTreaty(this.app.tableData);
        if (res.code === 0) {
          this.app.tableData.list = res.data.rows;
          this.app.tableData.pageNo = res.data.current_page;
          this.app.tableData.totalItem = res.data.total;
        } else {
          this.$message.error("获取列表失败");
        }
      } catch (error) {}
      this.randomKey = Math.random();
      this.app.tableLoading = false;
    },
    // 查看
    async handleEditApp(id) {
      this.isCreate = '查看'
      this.app.tableLoading = true;
      this.app.detail.id = id;
      try {
        let res = await stoTreatyRead({
          treaty_id: id
        });
        this.app.detail.treaty_id = res.data.treaty_id;
        this.app.detail.type = res.data.type;
        this.app.detail.type_text = res.data.type_text;
        this.app.detail.status = res.data.status;
        this.app.detail.content = res.data.content;
        this.app.detail.create_time = res.data.create_time;
        this.app.detail.operator = res.data.operator;
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
      this.randomKey = Math.random();
      this.$refs.detail.resetFields();
      this.showDetail = false;
    },
    onSaveDetail() {
      this.$refs.detail.validate(async valid => {
        if (!valid) return;
        let data = {
        content: this.app.detail.content
        };
        //  data.exp_time = dataPa
        if (this.isCreate == '查看') {
           data.treaty_id = this.app.detail.id;
        }
        this.app.saveLoading = true;
        try {
          if (this.isCreate == '新增') {
            await sellVipSave(data);
            this.$message.success("添加成功");
          } else if (this.isCreate == '查看'){
            await plaTreatySave(data);
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
