<template>
  <div class="dailishan-box">
    <!--工具栏-->
    <el-card class="card_top_wrap">
      <el-input v-model="search" placeholder="账号信息">
        <el-button slot="append" icon="el-icon-search" @click="find" />
      </el-input>
      <!-- 新增 -->
      <div style="display: inline-block;margin: 0px 2px;">
        <el-button
          class="filter-item"
          size="medium"
          type="primary"
          icon="el-icon-plus"
          @click="add"
          >新增</el-button
        >
        <el-button
          type="danger"
          class="filter-item"
          size="medium"
          icon="el-icon-refresh"
          @click="toRefresh"
          >刷新</el-button
        >
      </div>

      <!-- <startTime :title="dataTitle">
        <el-button slot="btns" type="primary">最近一个月</el-button>
      </startTime> -->
    </el-card>

    <!-- 表格列表 -->


    <tablepublic
      :tableData="tableData"
      :columns="columns"
      :pagesizes="pagesizes"
      @handleDelete="handleDelete"
      @handleSelectionChange="handleSelectionChange"
      @clickTable="clickTable"
      @handleEdit="handleEdit"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="total"
      :pageSize="pageSize"
    ></tablepublic>

    <!-- 
    <el-table
      :data="tableData"
      style="width: 100%"
      :max-height="windowHeight"
      border
    >
      <el-table-column
        :resizable="false"
        type="selection"
        :selectable="checkboxSelect"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column fixed prop="date" align="center" label="到期时间">
      </el-table-column>
      <el-table-column prop="name" align="center" label="账号信息">
      </el-table-column>
      <el-table-column prop="province" align="center" label="状态">
      </el-table-column>
      <el-table-column prop="city" align="center" label="推广客户数">
      </el-table-column>
      <el-table-column prop="address" align="center" label="已付费客服数">
      </el-table-column>
      <el-table-column prop="zip" align="center" label="业绩总额">
      </el-table-column>
      <el-table-column prop="zip" align="center" label="总佣金">
      </el-table-column>
      <el-table-column prop="zip" align="center" label="已提现金额">
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        center
        label="操作"
        width="160"
      >
        <template slot-scope="scope">
          <span
            class="c_p golbal-btn-text"
            @click="handleSee(scope.row.HotelID)"
          >
            查看
          </span>
          <span
            class="c_p m-l4 golbal-btn-text"
            @click="handleEdit(scope.$index, scope.row.HotelID)"
            v-show="scope.row.JoinStatus != -1"
          >
            编辑
          </span>
          <span
            class="c_p m-l4 golbal-btn-text-danger"
            @click="handleDelete(scope.row.HotelID)"
            v-show="scope.row.JoinStatus != -1"
          >
            删除
          </span>
        </template>
      </el-table-column>
    </el-table> -->
    <!-- 分页 -->
    <!-- <div>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="currentPage"
        :limit.sync="pagesize"
        @handleSizeChange="sizeChangePage"
        @handleCurrentChange="currentChangePage"
      />
    </div> -->

    <dianshanadmincreatwindow ref="form" :is-add="isAdd" />
  </div>
</template>

<script>
export default {
  name: "dailishanadmin",
  beforeCreate() {
    this.windowHeight = window.innerHeight - 300 + "px";
  },
  created() {},
  mounted() {},
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    sizeChangePage(val) {
      this.currentPage = 1;
      console.log("总页数", val);
    },
    currentChangePage(val) {
      console.log("当前页", val);
    },
    checkboxSelect() {},
    find() {},
    add() {
      this.$refs.form.dialog = true;
    },
    toRefresh() {},


    // 表格start

    //text的跳转触发
    handleDelete(val) {
      console.log(val);
      // this.StringUtil.getDecorator();
    },
    // checkbox的触发接收
    handleSelectionChange(val) {
      console.log(val);
      // this.StringUtil.getDecorator();
    },
    // 点击tbody的行触发
    clickTable(val) {
      console.log(val);
      // this.StringUtil.getDecorator();
    },
    //button的触发
    handleEdit(val) {
      console.log(val);
      // this.StringUtil.getDecorator();
    },
    handleSizeChange(val) {
      
      console.log(val);
      this.total = 100;
      // this.tableData = jsondata.tabledata;
      // console.log(jsondata.tableData);
    },
    handleCurrentChange(val) {
      console.log(val);
      this.total = 200;

      // this.tableData = jsondata.tabledata2;
    }

    // 表格结束

  },
  data() {
    return {
      // 表格列表
      windouHeight: "",

      // 分页
      total: 100,
      pagesize: 10,
      currentPage: 1,
      dataTitle: "时间",
      search: "",
      // 弹窗
      isAdd: true,

      // 表格
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      columns: [
        {
          id: "selection",
          type: "selection",
          label: "",
          fixed: false,
          width: "55",
          prop: "",
          isShow: true,
          align: "center"
        },
        {
          id: "date",
          type: "",
          label: "到期时间",
          fixed: false,
          width: "",
          prop: "date",
          isShow: true,
          align: "center"
        },
        {
          id: "name",
          type: "",
          label: "账户信息",
          fixed: false,
          width: "",
          prop: "name",
          isShow: true,
          align: "center"
        },
        {
          id: "province",
          type: "",
          label: "状态",
          fixed: false,
          width: "",
          prop: "province",
          isShow: true,
          align: "center"
        },
        {
          id: "city",
          type: "",
          label: "推广客户数",
          fixed: false,
          width: "",
          prop: "city",
          isShow: true,
          align: "center"
        },
        {
          id: "address",
          type: "",
          label: "已付费客服数",
          fixed: false,
          width: "",
          prop: "address",
          isShow: true,
          align: "center"
        },
        {
          id: "zip",
          type: "",
          label: "业绩总额",
          fixed: false,
          width: "",
          prop: "zip",
          isShow: true,
          align: "center"
        },
        {
          id: "zip",
          type: "",
          label: "总佣金",
          fixed: false,
          width: "",
          prop: "zip",
          isShow: true,
          align: "center"
        },
        {
          id: "zip",
          type: "",
          label: "已提现金额",
          fixed: false,
          width: "",
          prop: "zip",
          isShow: true,
          align: "center"
        },
        {
          id: "button",
          type: "button",
          label: "操作",
          fixed: "right",
          width: "220",
          prop: "",
          isShow: true,
          align: "center",
          list: [
            {
              id: "examine",
              name: "查看",
              type: "info"
            },
            {
              id: "compile",
              name: "编辑",
              type: "primary"
            },
            {
              id: "del",
              name: "删除",
              type: "danger"
            }
          ]
        }
      ],
      pagesizes: [10, 20, 30, 40, 100],
      total: 100,
      pageSize: 1
    };
  }
};
</script>
<style lang="less" scoped>
.dailishan-box {
  padding: 20px;

  .card_top_wrap {
    line-height: 48px;
    .el-input {
      width: 350px;
      // float: right;
      z-index: 999;
      margin-right: 10px;
    }
  }
}
</style>
