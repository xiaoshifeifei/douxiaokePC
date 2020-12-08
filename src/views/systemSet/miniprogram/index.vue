/* eslint-disable vue/no-unused-vars */
<template>
  <div id="mini" class="main LoadingArea">
    <div class="table_top clearfix" ref="heightTop">
      <!-- <div class="fl btnCon">
        <el-button class="fl" @click="setCurrent(tableData[1])">批量删除</el-button>
      </div> -->
      <div class="fr btnCon">
        <el-button class="fr btnRole"  type="primary" @click="HandleUpBatch()">批量上架</el-button>
        <el-button class="fr" type="primary" @click="HandleDownBatch()">批量下架</el-button>
      </div>
    </div>
    <div class="table_list">
      <el-table
        ref="table"
        :data="tableData"
        :height="tableHeight"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          :resizable="false"
          min-width="55"
          align="center">
        </el-table-column>
        <!-- <el-table-column
          prop="MenuID"
          label="ID"
          :resizable="false"
          min-width="80"
          align="center">
          <template slot-scope="scope">{{ scope.row.MenuID }}</template>
        </el-table-column> -->
        <el-table-column
          prop="MenuName"
          label="标题"
          :resizable="false"
          min-width="120"
          align="center">
          <template slot-scope="scope">{{ scope.row.MenuName }}</template>
        </el-table-column>
        <el-table-column
          prop="IconUrl"
          label="图标"
          :resizable="false"
          align="center"
          min-width='120'>
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.IconUrl">
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="Sort"
          label="排序"
          :resizable="false"
          min-width="100"
          align="center">
          <template slot-scope="scope">{{ scope.row.Sort }}</template>
        </el-table-column>
        <el-table-column
          prop="ServiceOpenTime"
          min-width="130"
          :resizable="false"
          label="服务时间"
          align="center">
          <template slot-scope="scope">{{ scope.row.ServiceOpenTime }}</template>
        </el-table-column>
        <el-table-column
          prop="ComeFromID"
          min-width="80"
          :resizable="false"
          label="小程序"
          align="center">
          <template slot-scope="scope">{{ scope.row.ComeFromID }}</template>
        </el-table-column>
        <el-table-column
          prop="MenuStatus"
          min-width="80"
          :resizable="false"
          label="是否上架"
          align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.MenuStatus"
              :active-value="1"
              :nactive-value="-1"
              @change="handleUpDown(scope.row.MenuID)"
              active-color="#1890ff"
              inactive-color="#DCDFE6">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="IsFrontendShow"
          min-width="80"
          :resizable="false"
          label="前台可见"
          align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.IsFrontendShow"
              :active-value="1"
              :nactive-value="0"
              @change="handleIsShow(scope.row.MenuID)"
              active-color="#1890ff"
              inactive-color="#DCDFE6">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="OperatorName"
          min-width="80"
          :resizable="false"
          label="操作人"
          align="center">
          <!-- <template slot-scope="scope">{{ scope.row.ParentID }}</template> -->
        </el-table-column>
        <el-table-column
          prop="MenuID"
          min-width="100"
          :resizable="false"
          fixed="right"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row.MenuID)" type="text" >编辑</el-button>
            <!-- <el-button @click="handleDelete(scope.row.MenuID)" type="text" >删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        v-show="total>0"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="parseInt(curPage)"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev,pager,next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="一键WIFI小程序修改" :visible.sync="dialogTableVisible" width="800" :show-close="false">
      <div class="formStyle">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right" :hide-required-asterisk="false" label-width="120px">
          <el-form-item label="标题" prop="MenuName">
            <el-input v-model="ruleForm.MenuName" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="Sort">
            <el-input v-model="ruleForm.Sort" placeholder="请输入排序"></el-input>
          </el-form-item>
          <el-form-item label="服务时间" prop="ServiceOpenTime">
            <el-time-picker
              is-range
              v-model="ruleForm.ServiceOpenTime"
              format='HH:mm'
              value-format="HH:mm"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="是否上架" prop="MenuStatus">
            <el-switch :active-value="1" :inactive-value="-1" v-model="ruleForm.MenuStatus"></el-switch>
          </el-form-item>
          <el-form-item label="前台可见" prop="IsFrontendShow">
            <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.IsFrontendShow"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogTableVisible = false">取消</el-button>
            <el-button type="primary" @click="saveEdit()">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetTableList, GetDetail, UpdateMini, IsUpDown, IsShow, DeleteMenu, UpBatch, DownBatch } from '@/api/miniprogram'
export default {
  data() {
    return {
      multipleSelectionAll: [], // 多页选择
      multipleSelection: [], // 当页选择
      idKey: 'MenuID',
      dialogTableVisible: false,
      tableHeight: 0,
      isShowVal: 0,
      tableData: [],
      MenuID: '',
      ruleForm: {
        MenuName: '',
        Sort: '',
        ServiceOpenTime: '',
        MenuStatus: 0,
        IsFrontendShow: 0
      },
      rules: {
        Sort: [
          { required: true,
            message: '请输入酒店名称',
            trigger: 'blur' }
        ],
        ServiceOpenTime: [
          { required: true,
            message: '请输入酒店名称',
            trigger: 'blur' }
        ],
        IsFrontendShow: [
          { required: true,
            message: '请输入酒店名称',
            trigger: 'blur' }
        ],
        MenuStatus: [
          { required: true,
            message: '请输入酒店名称',
            trigger: 'blur' }
        ]
      },
      value1: '',
      total: 50, // 总数
      page: 1, // 页码
      limit: 10, // 一页几条
      pageSizes: [10, 20, 50, 100],
      curPage: 1,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  mounted() {
    this.getList()
    this.$nextTick(function() {
      this.tableHeight = window.innerHeight - this.$refs.heightTop.offsetHeight - 200 + 'px'
      // 监听窗口大小变化
      let self = this
      window.onresize = function () {
        self.tableHeight = window.innerHeight - self.$refs.heightTop.offsetHeight - 200 + 'px'
      }
    })
  },
  methods: {
    async getList() {
      let res = await GetTableList({ page: this.page, limit: this.limit })
      for (let j = 0; j < res.data.rows.length; j++) {
        if (res.data.rows[j].ComeFromID == 1) {
          res.data.rows[j].ComeFromID = '小程序C端'
        } else if (res.data.rows[j].ComeFromID == 2) {
          res.data.rows[j].ComeFromID = '小程序B端'
        } else if (res.data.rows[j].ComeFromID == 3) {
          res.data.rows[j].ComeFromID = '公众号'
        } else if (res.data.rows[j].ComeFromID == 4) {
          res.data.rows[j].ComeFromID = '民宿'
        } else if (res.data.rows[j].ComeFromID == 5) {
          res.data.rows[j].ComeFromID = '好评返现'
        } else {
          res.data.rows[j].ComeFromID = '分时酒店'
        }
      }
      this.tableData = res.data.rows
      this.curPage = res.data.current_page
      this.total = res.data.total
      this.$nextTick(() => {
        this.setSelectRow()
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 批量上架
    HandleUpBatch() {
      this.changePageCoreRecordData()
      let selectIdArr = []
      this.multipleSelectionAll.forEach(row => {
        selectIdArr.push(row.MenuID)
      })
      if(selectIdArr.length===0){
          this.$alert('请选择要操作的数据!', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
          })
      }else{
        this.$confirm('确认上架选中的数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          UpBatch({ MenuIDArr: selectIdArr })
            .then(res => {
              this.$message.success(res.msg)
              this.getList()
              this.multipleSelectionAll = []
            })
            .catch(err => {
              this.$message.error(err.msg)
            })
        })
      }

    },
    // 批量下架
    HandleDownBatch() {
      this.changePageCoreRecordData()
      let selectIdArr = []
      this.multipleSelectionAll.forEach(row => {
        selectIdArr.push(row.MenuID)
      })
      if(selectIdArr.length===0){
          this.$alert('请选择要操作的数据!', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
          })
      }else{
          this.$confirm('确认下架选中的数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            DownBatch({ MenuIDArr: selectIdArr })
              .then(res => {
                this.$message.success(res.msg)
                this.getList()
                this.multipleSelectionAll = []
              })
              .catch(err => {
                this.$message.error(err.msg)
              })
          })
      }

    },
    // 是否上架
    handleUpDown(MenuID) {
      IsUpDown({ MenuID })
        .then(res => {
          this.$message.success(res.msg)
        })
        .catch(err => {
          this.$message.error(err.msg)
        })
    },
    // 是否前台可见
    handleIsShow(MenuID) {
      IsShow({ MenuID })
        .then(res => {
          this.$message.success(res.msg)
        })
        .catch(err => {
          this.$message.error(err.msg)
        })
    },
    // 保存
    async saveEdit() {
      let newTime = this.ruleForm.ServiceOpenTime[0] + '-' + this.ruleForm.ServiceOpenTime[1]
      let obj = this.ruleForm
      let data = {
        MenuID: this.MenuID,
        MenuName: obj.MenuName,
        MenuStatus: obj.MenuStatus,
        ServiceOpenTime: newTime,
        Sort: obj.Sort,
        IsFrontendShow: obj.IsFrontendShow
      }
      let res = await UpdateMini(data)
      if (res.code === 0) {
        this.$message.success('保存成功')
        this.getList()
        this.dialogTableVisible = false
      }
    },
    // 删除
    handleDelete(MenuID) {
      this.$confirm('确认删除该项数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteMenu({ MenuID })
          .then(res => {
            this.$message.success(res.msg)
          })
          .catch(err => {
            this.$message.error(err.msg)
          })
      })
    },
    // 编辑
    async handleEdit(MenuID) {
      this.MenuID = MenuID
      this.dialogTableVisible = true
      let res = await GetDetail({ MenuID })
      for (let i in res.data) {
        for (let j in this.ruleForm) {
          if (i == j) {
            this.ruleForm[j] = res.data[i]
          }
        }
      }
      this.ruleForm.ServiceOpenTime = this.ruleForm.ServiceOpenTime.split('-')
    },
    // 切换每页展示条数
    handleSizeChange(val) {
      this.limit = val
      this.getList()
    },
    // 切换page
    handleCurrentChange(val) {
      this.page = val
      this.changePageCoreRecordData()
      this.getList()
    },
    // 设置选中的方法
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return
      }
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const selectAllIds = []
      const that = this
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      this.$refs.table.clearSelection()
      for (let i = 0; i < this.tableData.length; i++) {
        if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.tableData[i], true)
        }
      }
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const that = this
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection
        return
      }
      // 总选择里面的key集合
      const selectAllIds = []
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      const selectIds = []
      // 获取当前页选中的id
      this.multipleSelection.forEach(row => {
        selectIds.push(row[idKey])
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row)
        }
      })
      const noSelectIds = []
      // 得到当前页没有选中的id
      this.tableData.forEach(row => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey])
        }
      })
      noSelectIds.forEach(id => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] == id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1)
              break
            }
          }
        }
      })
    }
  },
  destroyed() {
    window.onresize = null
  }
}
</script>
<style lang="less">
  #mini{
    .table_top{
      margin-bottom: 20px;
    }
    .btnCon{
      width:50%;
    }
    .btnRole{
      margin-left: 20px;
    }
    .formStyle{
      width:470px;
      margin: 0 auto;
    }
    .el-dialog__title {
      font-size: 18px;
      color: #000;
    }
    .el-dialog__header {
      padding: 10px;
      // background: #1890ff;
    }
    .el-input--suffix .el-input__inner {
      padding-right: 15px;
    }
  }
</style>
