<template>
  <div class="table-box">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
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

        // {
        //   id: "text",
        //   type: "text",
        //   label: "跳转",
        //   fixed: "left",
        //   width: "120",
        //   prop: "",
        //   isShow: true,
        //   align: "center",
        //   list: [{ id: "jump", name: "跳转", type: "", handleClick: this.jump }]
        // },
        {
          id: "index",
          type: "index",
          label: "序列号",
          fixed: false,
          width: "120",
          prop: "",
          isShow: true,
          align: "center"
        },
        {
          id: "date",
          type: "",
          label: "日期",
          fixed: "left",
          width: "",
          prop: "date",
          isShow: true,
          align: "center"
        },
        {
          id: "name",
          type: "",
          label: "姓名",
          fixed: false,
          width: "",
          prop: "name",
          isShow: true,
          align: "center"
        },
        {
          id: "province",
          type: "",
          label: "省份",
          fixed: false,
          width: "",
          prop: "province",
          isShow: true,
          align: "center"
        },
        {
          id: "city",
          type: "",
          label: "市区",
          fixed: false,
          width: "",
          prop: "city",
          isShow: true,
          align: "center"
        },
        {
          id: "address",
          type: "",
          label: "地址",
          fixed: false,
          width: "",
          prop: "address",
          isShow: true,
          align: "center"
        },
        {
          id: "zip",
          type: "",
          label: "邮编",
          fixed: false,
          width: "",
          prop: "zip",
          isShow: true,
          align: "center"
        },
        {
          id: "zip",
          type: "",
          label: "邮编",
          fixed: false,
          width: "",
          prop: "zip",
          isShow: true,
          align: "center"
        },
        {
          id: "zip",
          type: "",
          label: "邮编",
          fixed: false,
          width: "",
          prop: "zip",
          isShow: true,
          align: "center"
        },
        {
          id: "zip",
          type: "",
          label: "邮编",
          fixed: false,
          width: "",
          prop: "zip",
          isShow: true,
          align: "center"
        },
        {
          id: "zip",
          type: "",
          label: "邮编",
          fixed: false,
          width: "",
          prop: "zip",
          isShow: true,
          align: "center"
        },
        {
          id: "zip",
          type: "",
          label: "邮编",
          fixed: false,
          width: "",
          prop: "zip",
          isShow: true,
          align: "center"
        },
        {
          id: "zip",
          type: "",
          label: "邮编",
          fixed: false,
          width: "",
          prop: "zip",
          isShow: true,
          align: "center"
        },
        {
          id: "zip",
          type: "",
          label: "邮编",
          fixed: false,
          width: "",
          prop: "zip",
          isShow: true,
          align: "center"
        },
        {
          id: "zip",
          type: "",
          label: "邮编",
          fixed: false,
          width: "",
          prop: "zip",
          isShow: true,
          align: "center"
        },
        {
          id: "zip",
          type: "",
          label: "邮编",
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
  },

  methods: {
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

    
  }
};
</script>
<style lang="less" scoped>
.table-box {
  width: 100%;
  padding: 20px;
}
</style>
