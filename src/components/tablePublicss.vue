<template>
  <div class="table" style="height:100%">
    <el-card>
      <el-table
        ref="multipleTable"
        :data="tableData"
        :height="windowHeight"
        :max-height="windowHeight"
        style="width:100%;"
        border
        :header-row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
        @row-click="clickTable"
      >
        <template v-for="(item, index) of columns">
          <el-table-column
            v-if="item.id === 'text'"
            :key="index"
            :fixed="item.fixed"
            :prop="item.id"
            :label="item.label"
            :align="item.align ? item.align : 'center'"
            :width="item.width"
            :resizable="false"
          >
            <!--if判断的是父组件传的表头是操作的id名-->
            <template slot-scope="scope">
              <el-button
                v-for="item1 in item.list"
                :key="item1.id"
                @click="handleDelete(scope.row, item1.id)"
                type="text"
                size="small"
                >{{ item1.name }}</el-button
              >
              <!--可以自行增加按钮，请改变点击事件的第二个参数，父组件会根据第二个参数判断当前点击的是什么按钮-->
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.id === 'button'"
            :key="index"
            :fixed="item.fixed"
            :prop="item.id"
            :label="item.label"
            :align="item.align ? item.align : 'center'"
            :width="item.width"
            :resizable="false"
          >
            <!--if判断的是父组件传的表头是操作的id名-->
            
            <template slot-scope="scope">
              <el-button
                class="class-btn"
                type="primary"
                @click="handleEdit(scope.row, 'seedit')"
                size="mini"
                >查看</el-button
              >
              <el-button
                class="class-btn"
                type="primary"
                @click="handleEdit(scope.row, 'edit')"
                size="mini"
                >编辑</el-button
              >
              <el-button
                class="class-btn"
                type="warning"
                @click="handleEdit(scope.row, 'accountFenPei')"
                size="mini"
                >赠送会员</el-button
              >
              <!-- <el-button
                v-for="item2 in item.list"
                :key="item2.id"
                @click="handleEdit(scope.row, item2.id)"
                size="mini"
                :type="item2.type"
                >{{ item2.name }}</el-button
              > -->
              <!--可以自行增加按钮，请改变点击事件的第二个参数，父组件会根据第二个参数判断当前点击的是什么按钮-->
            </template>
          </el-table-column>
           <el-table-column
            v-else-if="item.id === 'avatar'"
            :label="item.label"
            :key="index"
            :fixed="item.fixed"
            :prop="item.id"
            :align="item.align ? item.align : 'center'"
            :width="item.width"
            :type="item.type"
            :resizable="false"
          >
            <template slot-scope="scope">
              <el-image
                :preview-src-list="[scope.row.avatar]"
                :src="scope.row.avatar"
                alt
              ></el-image>
            </template>
          </el-table-column>

          <el-table-column
            v-else-if="item.id === 'business_license_url'"
            :label="item.label"
            :key="index"
            :fixed="item.fixed"
            :prop="item.id"
            :align="item.align ? item.align : 'center'"
            :width="item.width"
            :type="item.type"
            :resizable="false"
          >
            <template slot-scope="scope">
              <el-image
                :preview-src-list="[scope.row.business_license_url]"
                :src="scope.row.business_license_url"
                alt
              ></el-image>
            </template>
          </el-table-column>



           
          <el-table-column
            v-else-if="item.index === 'index'"
            :type="item.index"
            :key="index"
            :width="item.width"
            :resizable="false"
          >
          </el-table-column>

          <el-table-column
            v-else-if="item.id === 'status'"
            :label="item.label"
            :key="index"
            :fixed="item.fixed"
            :prop="item.id"
            :align="item.align ? item.align : 'center'"
            :width="item.width"
            :type="item.type"
            :resizable="false"
          >
            <template slot-scope="scope">
              <!-- <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="changeStatus($event, scope.row)"
            >
            </el-switch> -->
              <!-- <el-switch
              :value="value"
              @change="changeStatus(scope.row)"
              active-color="#13ce66"
              :disabled="isDisabled"
              inactive-color="#ff4949"
            >
            </el-switch> -->

              <div class="status-wrapper">
                <div class="status-text" :class="{ active: scope.row.status }">
                  {{ scope.row.status ? "启用" : "禁用" }}
                </div>
                <el-switch
                  :value="!!scope.row.status"
                  @change="onAccountStatusChange($event, scope.row)"
                >
                </el-switch>
              </div>
            </template>
          </el-table-column>


         

          <el-table-column
            v-else
            :label="item.label"
            :key="index"
            :fixed="item.fixed"
            :prop="item.id"
            :align="item.align ? item.align : 'center'"
            :width="item.width"
            :type="item.type"
            :resizable="false"
          >
          </el-table-column>

          <!--可以传align,width和type来控制表格的居中，宽度和类型（比如需要序号，type传index）-->
        </template>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pagesizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "tablepublicss",
  props: {
    tableData: {
      // 表格数据源 默认为空数组
      type: Array,
      default: () => []
    },
    columns: {
      // 表格的字段展示 默认为空数组
      type: Array,
      default: () => []
    },
    pagesizes: {
      type: Array,
      default: () => []
    },
    total: { type: Number, default: 0 },
    pageSize: { type: Number, default: 0 }
  },
  created() {
    // console.log(this.tableData);
    this.windowHeight = window.innerHeight - 300 + "px";
  },
  data() {
    return {
      currentPage: 1,
      windowHeight: "",
      idKey: "store_id",

      value: true,
      setStatusHttp: null,
      isDisabled: false
    };
  },
  methods: {
    setSelectRow(multipleSelectionAll, pageData) {
      if (!multipleSelectionAll || multipleSelectionAll.length <= 0) {
        return;
      }
      let idKey = "store_id";
      let selectAllIds = [];
      // 遍历总的所选中数据取出list 的 id push 到 总选中的id集合中
      multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey]);
      });
      // console.log('multipleSelectionAll,',multipleSelectionAll);
      // console.log('selectAllIds,',selectAllIds);
      this.$refs.multipleTable.clearSelection();
      //  遍历列表 用全部选中的id集合 中有 list的id 则改条数据未选中状态
      for (let i = 0; i < pageData.length; i++) {
        // console.log('pageData',pageData);
        if (selectAllIds.indexOf(pageData[i][idKey]) >= 0) {
        // console.log("selectAllIds",selectAllIds);
          this.$refs.multipleTable.toggleRowSelection(pageData[i], true);
        }
      }
      //  console.log('selectAllIds,2222',selectAllIds);
    },

    // 按钮
    changeStatus(data) {
      console.log(data);
      let self = this;
      self.isDisabled = true;
      // self.setStatus();
    },
    // 正常
    handleSelectionChange(val) {
      console.log('val2222',val);
      this.$emit("handleSelectionChange", { val: val });
    },
    // 正常
    clickTable(row, column, event) {
      this.$emit("clickTable", { row: row, column: column, event: event });
    },
    // 正常
    handleEdit(index, row) {
      this.$emit("handleEdit", { index: index, row: row });
    },

    // 启用 禁用状态
    async onAccountStatusChange(status, rowData) {
      console.log(status, rowData);
      this.$emit("onAccountStatusChange", status, rowData);
      // let res = await updateAccountStatus({
      //   AdminID: rowData.AdminID,
      //   AdminStatus: status ? 1 : 0
      // })
      // if (res.code === 0) {
      //   if (status) {
      //     this.$message.success('帐号已启用')
      //   } else {
      //     this.$message.warning('帐号已禁用')
      //   }
      //   this.getTableList()
      // } else {
      //   this.$message.error('帐号状态操作失败')
      // }
    },

    // 正常
    handleDelete(index, row) {
      this.$emit("handleDelete", { index: index, row: row });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("handleCurrentChange", val);
    },
    tableRowClassName({ row, rowIndex }) {
      // console.log(row, rowIndex);
      if (rowIndex === 0) {
        return "warning-row";
      } else if (rowIndex === 1) {
        return "warning-row";
      }
      return "";
    }
  }
};
</script>
<style lang="less">
.el-pagination {
  margin-top: 20px;
}
//.warning-row .is-leaf 是修改table的表头的背景颜色；
.warning-row .is-leaf {
  // color: #1a68b5;
  // background-color: #e3edf7 !important;
  // opacity: 0.8;
}
</style>
