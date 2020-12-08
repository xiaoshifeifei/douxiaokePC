<template>
  <div class="table" style="height:100%">
    <!-- <el-card> -->
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
              v-for="item2 in item.list"
              :key="item2.id"
              @click="handleEdit(scope.row, item2.id)"
              size="mini"
              :type="item2.type"
              :disabled="item2.isShow == true && scope.row.total_spread > 0"
              >{{ item2.name }}</el-button
            >
          </template>
          <!--可以自行增加按钮，请改变点击事件的第二个参数，父组件会根据第二个参数判断当前点击的是什么按钮-->
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
          v-else-if="item.id === 'is_team'"
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
            {{ scope.row.is_team == 1 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.id === 'spread_mobile'"
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
            {{ scope.row.spread_mobile == 0 ? "-" : scope.row.spread_mobile }}
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.id === 'spread_nickname'"
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
            {{ scope.row.spread_nickname == 0 ? "-" : scope.row.spread_nickname }}
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.id === 'distribute_name'"
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
            <!-- {{scope.row.config_list}} -->

            <div v-for="(item, index) in scope.row.config_list" :key="index">
              <div>
                <span>{{ item.distribute_name }}</span>
                <span v-if="item.value"> ￥{{ item.value }}</span>
              </div>
            </div>
            {{
              scope.row.distribute_name == 0 ? "-" : scope.row.distribute_name
            }}
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.id === 'statusCheck'"
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
          v-else-if="item.id === 'qrcode'"
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
            <div class="zy_elImage">
              <el-image
                :preview-src-list="[scope.row.qrcode]"
                :src="scope.row.qrcode"
                alt
              ></el-image>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.id === 'distribute_name'"
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
            <p v-for="item5 in scope.row.config_list" :key="item5.id">
              {{ item5.distribute_name }}
            </p>
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
    <!-- </el-card> -->
  </div>
</template>
<script>
export default {
  name: "projectlc",
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
    myKey: { type: String, default: '' },
    pageSize: { type: Number, default: 0 }
  },
  created() {
    // console.log(this.tableData);
    // document.querySelector(".el-table__body-wrapper").setAttribute("style", "overflow: auto !important;")
    this.windowHeight = window.innerHeight - 400 + "px";
  },
  data() {
    return {
      currentPage: 1,
      windowHeight: "",
      idKey: "team_id",

      value: true,
      setStatusHttp: null,
      isDisabled: false,
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg"
      ]
    };
  },
  methods: {
    setSelectRow(multipleSelectionAll, pageData) {
      console.log("multipleSelectionAll", multipleSelectionAll);
      if (!multipleSelectionAll || multipleSelectionAll.length <= 0) {
        return;
      }
      let idKey = this.myKey;
      console.log(99999,idKey);
      let selectAllIds = [];
      // 遍历总的所选中数据取出list 的 id push 到 总选中的id集合中
      multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey]);
      });
      // console.log(selectAllIds);
      this.$refs.multipleTable.clearSelection();

      //  遍历列表 用全部选中的id集合 中有 list的id 则改条数据未选中状态
      for (let i = 0; i < pageData.length; i++) {
        if (selectAllIds.indexOf(pageData[i][idKey]) >= 0) {
          this.$refs.multipleTable.toggleRowSelection(pageData[i], true);
        }
      }
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
      // console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
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
.el-table__body-wrapper {
  overflow-y: auto !important;
}
</style>
