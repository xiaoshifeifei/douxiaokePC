<template>
  <div id="jurisdiction" class="LoadingArea">
    <el-card>
      <div class="table_top" ref="heightTop">
        <div>
          <el-select v-model="value1" placeholder="是否为渠道商管理员">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
          <el-date-picker
            style="margin-left:20px"
            v-model="valueTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <el-input
            v-model="keywords"
            prefix-icon="el-icon-search"
            placeholder="输入渠道商名称/联系人/联系手机号"
            style="min-width:350px;margin-left:20px"
            class="input-search"
          ></el-input>
          <el-button type="primary" @click="getList" icon="el-icon-search"
            >查询</el-button
          >
          <el-button type="primary" @click="reaseList">重置条件</el-button>
        </div>
      </div>
      <div class="btnCon">
        <!-- <el-button @click="handleDelete()">批量删除</el-button> -->
        <!-- <el-button class=" btnRole"  type="primary" @click="createManage()">新增管理</el-button> -->
        <el-button class="btn2" type="primary" @click="addProduct()"
          >导出</el-button
        >
        <!-- <el-button class="btn1" type="primary" @click="createRole()">新增渠道</el-button> -->
        <div style="clear:both"></div>
      </div>
      <div class="table_list">
        <!-- 表格列表 -->
        <tablepublic
          :tableData="pageData.rows"
          :columns="columns"
          :pagesizes="pageSizes"
          @handleDelete="handleDelete"
          @handleSelectionChange="handleSelectionChange"
          @clickTable="clickTable"
          @handleEdit="handleEdit"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @onAccountStatusChange="onAccountStatusChange"
          :total="pageData.total"
          :pageSize="limit"
          ref="chiidTable"
        ></tablepublic>
      </div>
      <el-dialog
        title="分配帐号"
        :visible.sync="dialogAccount"
        width="800"
        :show-close="true"
        @close="onAccountEditorClose"
      >
        <div class="formStyle">
          <el-form label-width="100px">
            <el-form-item label="角色名称">
              <el-input :value="accountData.role.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="选择帐号">
              <el-col :span="10">
                <el-input
                  v-model="accountData.keywords"
                  prefix-icon="el-icon-search"
                  placeholder="输入帐号名搜索"
                >
                </el-input>
              </el-col>
              <el-button
                type="primary"
                @click="onSearchAccounts"
                style="margin-left:50px;"
                >搜索</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-table
                max-height="300"
                :data="accountData.list"
                @selection-change="onAccountCheck"
                border
                size="mini"
              >
                <el-table-column
                  type="selection"
                  width="100"
                  align="center"
                  :resizable="false"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="帐号名"
                  min-width="100"
                  align="center"
                  :resizable="false"
                >
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item>
              <el-button @click="onAccountEditorClose">取消</el-button>
              <el-button type="primary" @click="saveAccountChecked"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
      <el-dialog
        title="编辑"
        :visible.sync="dialoInfo"
        width="800"
        :show-close="false"
      >
        <div class="formStyle">
          <el-form
            :model="Info"
            :rules="roleRules"
            ref="Info"
            label-position="right"
            :hide-required-asterisk="false"
            label-width="120px"
          >
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="Info.name"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="remark">
              <el-input
                type="textarea"
                :rows="10"
                v-model="Info.remark"
                placeholder="请输入角色描述"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="dialoInfo = false">取消</el-button>
              <el-button type="primary" @click="onSaveRole">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
      <el-dialog
        title="授权"
        :visible.sync="dialogSetting"
        width="800"
        :show-close="false"
      >
        <!-- <div class="text"><span>所属角色</span><span>高级管理员</span></div> -->
        <!-- <div class="text"><span>账号</span><span>zhiliaokeji</span></div> -->
        <el-tree
          :data="systemMenus.list"
          show-checkbox
          :props="{ label: 'title' }"
          node-key="id"
          :accordion="true"
          :default-expanded-keys="[-1]"
          @check="onMenuTreeCheck"
          check-strictly
          :default-checked-keys="systemMenus.checkedKeys"
        >
        </el-tree>
        <div class="pl_20">
          <el-button @click="dialogSetting = false">取消</el-button>
          <el-button type="primary" @click="onRoleGrant">保存</el-button>
        </div>
      </el-dialog>

      <!-- 渠道列表查看or编辑渠道 -->

      <el-dialog
        :title="qudaoTitle"
        :visible.sync="qudaoLook"
        width="800"
        :before-close="isShowClick"
      >
        <div class="formStyle">
          <el-form
            :model="myInfo.base_info"
            :rules="myInfo.myRules"
            ref="Info"
            label-position="right"
            :hide-required-asterisk="false"
            label-width="120px"
          >
            <el-form-item
              label="分销员手机号"
              prop="mobile"
              class="bgctable bordertable"
            >
              <el-input v-model="myInfo.base_info.mobile" readonly></el-input>
            </el-form-item>
            <el-form-item
              label="一级直推"
              prop="spread_mobile"
              class="bgctable "
            >
              <el-input
                v-model="myInfo.base_info.spread_mobile"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="所属渠道商" prop="name" class="bgctable ">
              <el-input v-model="myInfo.base_info.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="注册时间" prop="create_time" class="bgctable ">
              <el-input
                v-model="myInfo.base_info.create_time"
                readonly
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button @click="isShowClick" class="diafooter">取消</el-button>
        </div>
      </el-dialog>

      <!-- 创建渠道 -->
      <el-dialog
        :title="qudaoTitle"
        :visible.sync="qudaoLookCreat"
        width="800"
        :show-close="true"
      >
        <div class="formStyle">
          <el-form
            :model="detailsInfo"
            :rules="rules"
            ref="detailsInfoCreat"
            label-position="right"
            :hide-required-asterisk="false"
            label-width="120px"
            :layout="layout"
            :labelCol="labelCol1"
            :wrapperCol="wrapperCol1"
          >
            <el-form-item
              label="渠道名称"
              prop="nameCreat"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="detailsInfo.nameCreat"
                :disabled="qudaoTitle == '详情' || qudaoTitle == '编辑'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="联系人"
              prop="linkmanCreat"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input v-model="detailsInfo.linkmanCreat"></el-input>
            </el-form-item>
            <el-form-item
              label="联系电话"
              prop="mobileCreat"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input v-model="detailsInfo.mobileCreat"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="qudaoLook = false">取消</el-button>
              <el-button type="primary" @click="onSaveRoleCreat"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>

      <el-dialog
        title="设置渠道管理员"
        :visible.sync="qudaoShow"
        width="30%"
        :before-close="isqudaoShow"
      >
        <div class="formStyle">
          <el-form
            label-position="right"
            :hide-required-asterisk="false"
            label-width="150px"
          >
            <el-form-item label="是否为渠道管理员" prop="is_team">
              <el-radio v-model="myTeam" label="1">是</el-radio>
              <el-radio v-model="myTeam" label="0">否</el-radio>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer">
          <el-button @click="isqudaoShow">取消</el-button>
              <el-button type="primary" @click="onIsqudao"
                >确定</el-button
              >
        </div>
      </el-dialog>
      <el-dialog
        title="导出"
        v-loading="tableLoading"
        :visible.sync="addEmpShow1"
        width="80%"
        :before-close="handleDialogClose3"
      >
        <el-table
          id="table_out"
          ref="multipleTable"
          :data="allArray"
          border
          class="table"
          height="300"
          header-cell-class-name="table-header"
          style="width: 100%;margin:30px auto 0 auto;"
        >
          <el-table-column label="序号" type="index" width="80" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" align="center" label="分销员手机号" />
          <el-table-column prop="nickname" align="center" label="分销员名称" />
          <el-table-column prop="spread_mobile" align="center" label="一级直推手机号" >
            <template slot-scope="scope">
                {{scope.row.spread_mobile == 0 ? '-' : scope.row.spread_mobile}}
            </template>
          </el-table-column>
          <el-table-column prop="spread_nickname" align="center" label="一级直推名称" >
            <template slot-scope="scope">
                {{scope.row.spread_nickname == 0 ? '-' : scope.row.spread_nickname}}
            </template>
          </el-table-column>
          <el-table-column prop="name" align="center" label="所属渠道商" />
          <el-table-column prop="is_team" align="center" label="是否为渠道商管理员" >
           <template slot-scope="scope">
                {{scope.row.is_team == 0 ? '否' : '是'}}
            </template>
          </el-table-column>
          <el-table-column prop="create_time" align="center" label="注册时间" />
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleDialogClose3">取 消</el-button>
          <el-button type="primary" @click="exportExcel()">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import {
  updateSetManage,
  fenxiaoList,
  getDtails,
  UpdatePassword,
  updateRoleEditCreat,
  SettingLimits,
  DeleteLimits,
  DeleteBatch,
  deleteRole,
  updateRole,
  updateQudaoRoleEdit,
  getSystemMenus,
  roleGrant,
  getRoleInfo,
  getAccountList,
  allotAccounts,
  deleteQudaoRole
} from "@/api/jurisdiction";
import { getList } from "../../../api/table";
import { isvalidPhone } from "../../../utils/validate";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { thirteenBitTimestamp } from "@/utils/index";
import JSZip from "jszip";
import axios from "axios";

import table2excel from "js-table2excel";
var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入电话号码"));
  } else if (!isvalidPhone(value)) {
    callback(new Error("请输入正确的11位手机号码"));
  } else {
    callback();
  }
};
export default {
  data() {
    return {
      myInfo: {
        base_info: {
          mobile: "",
          spread_mobile: "",
          name: "",
          create_time: ""
        }
      },
      allArray: [], //导出的数组

      tableLoading: false,
      addEmpShow1:false,
      myTeam:'',
      startTime: "",
      endTime: "",
      value1: "",
      valueTime: "",
      keywords: "", // 搜索
      dialogSetting: false,
      dialogAccount: false,
      dialoInfo: false,
      Pswd: {},
      Info: {},
      rulesPswd: {
        oldPwd: [
          { required: true, message: "请输入酒店名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        newPwd: [
          { required: true, message: "请输入酒店名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        confirmPwd: [
          { required: true, message: "请输入酒店名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      rulesInfo: {},
      multipleSelectionAll: [], // 多页选择
      multipleSelection: [], // 单页选择
      idKey: "id",
      tableHeight: 0,
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      ],
      total: 0, // 总数
      page: 1, // 页码
      limit: 10, // 一页几条
      pageSizes: [10, 20, 50, 100],
      curPage: 1,
      pageData: {
        // eslint-disable-next-line camelcase
        current_page: 1,
        rows: [],
        total: 0,
        // eslint-disable-next-line camelcase
        total_page: 0
      },
      roleRules: {
        linkman: [
          { required: true, message: "请输入联系人" },
          { min: 3, max: 500, message: "长度在 3 到 500 个字符" }
        ],
        mobile: [{ required: true, trigger: "blur", validator: validPhone }]
      },
      rules: {
        nameCreat: [
          { required: true, message: "请输入渠道名称" },
          { min: 3, max: 500, message: "长度在 3 到 500 个字符" }
        ],
        linkmanCreat: [
          { required: true, message: "请输入联系人" },
          { min: 3, max: 500, message: "长度在 3 到 500 个字符" }
        ],
        mobileCreat: [
          { required: true, trigger: "blur", validator: validPhone }
        ]
      },
      systemMenus: {
        // 授权 系统菜单列表
        list: [],
        checkedKeys: [],
        halfCheckedKeys: []
      },
      accountData: {
        role: {},
        keywords: "",
        list: [], // 搜索帐号列表
        checked: []
      },

      // 新
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
          id: "mobile",
          type: "",
          label: "分销员手机号",
          fixed: false,
          width: "",
          prop: "mobile",
          isShow: true,
          align: "center"
        },
         {
          id: "nickname",
          type: "",
          label: "分销员名称",
          fixed: false,
          width: "",
          prop: "nickname",
          isShow: true,
          align: "center"
        },
        {
          id: "spread_mobile",
          type: "",
          label: "一级直推手机号",
          fixed: false,
          width: "",
          prop: "spread_mobile",
          isShow: true,
          align: "center"
        },
         {
          id: "spread_nickname",
          type: "",
          label: "一级直推名称",
          fixed: false,
          width: "",
          prop: "spread_nickname",
          isShow: true,
          align: "center"
        },
        {
          id: "name",
          type: "",
          label: "所属渠道商",
          fixed: false,
          width: "",
          prop: "name",
          isShow: true,
          align: "center"
        },
        {
          id: "is_team",
          type: "",
          label: "是否为渠道商管理员",
          fixed: false,
          width: "",
          prop: "is_team",
          isShow: true,
          align: "center"
        },
        {
          id: "create_time",
          type: "",
          label: "注册时间",
          fixed: false,
          width: "",
          prop: "create_time",
          isShow: true,
          align: "center"
        },
        {
          id: "button",
          type: "button",
          label: "操作",
          fixed: "right",
          width: "300",
          prop: "",
          isShow: true,
          align: "center",
          list: [
            // {
            //   id: "shouquan",
            //   name: "授权",
            //   type: "info"
            // },
            {
              id: "details",
              name: "查看",
              type: "primary"
            },
            // {
            //   id: "edit",
            //   name: "编辑",
            //   type: "primary"
            // },

            {
              id: "set",
              name: "设置渠道管理员",
              type: "primary"
            }
          ]
        }
      ],

      // 渠道商列表

      qudaoLook: false, //查看渠道
      qudaoLookCreat: false,
      qudaoTitle: "",
      detailsInfo: {
        myTeam:0,
      },
      layout: "inline",
      qudaoShow: false,

      labelCol1: {
        xs: {
          span: 24
        },
        sm: {
          span: 8
        }
      },
      wrapperCol1: {
        xs: {
          span: 24
        },
        sm: {
          span: 16
        }
      },
      labelCol2: {
        xs: {
          span: 12
        },
        sm: {
          span: 18
        }
      },
      wrapperCol2: {
        xs: {
          span: 12
        },
        sm: {
          span: 18
        }
      }
    };
  },
  mounted() {
    this.getList();
    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight - this.$refs.heightTop.offsetHeight - 200 + "px";
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight =
          window.innerHeight - self.$refs.heightTop.offsetHeight - 200 + "px";
      };
    });
  },
  methods: {
    // 重置条件
    reaseList() {
      console.log("重置");
      console.log("valueTime", this.valueTime);
      // y: date.getFullYear(),
      // m: date.getMonth() + 1,
      // d: date.getDate(),

      this.keywords = "";
      this.page = 1;
      this.limit = 10;
      this.value1 = ""; //会员类型
      this.value2 = ""; //是否蓝V
      this.valueTime = ""; //时间日期
      this.getList();
    },
    handleDialogClose3() {
      // this.$refs.multipleTable.resetFields()
      this.addEmpShow1 = false;
      this.limit = 10;
    },
    //按钮
    handleEdit(item) {
      if (item.row == "details") {
        console.log(item);
        this.details(item.index);
      } else if (item.row == "edit") {
        this.handleInfo(item.index.id);
      } else if (item.row == "accountFenPei") {
        this.onAccount(item.index);
      } else if (item.row == "set") {
        // this.onDeleteRole(item.index);
        this.onSet(item.index);
      }
    },
    onSet(item) {
      this.qudaoShow = true;
      console.log('item',item);
      if (item.is_team == 0) {
        this.myTeam = '0'
      }else if (item.is_team == 1) {
        this.myTeam = '1'
      }
      this.myID = item.id
    },
    // 设置渠道管理员弹窗关闭
    isqudaoShow() {
      this.qudaoShow = false
      this.myTeam = ''
    },
    // 设置渠道管理员提交
    async onIsqudao(){
      let res = await updateSetManage({
        id:this.myID,
        is_team:this.myTeam
      })
      if (res.code == 0) {
        this.$message.success(res.msg)
        this.qudaoShow = false
        this.getList();
      }else {
        this.$message(res.msg)
      }
    },

    // 关闭详情
    isShowClick() {
      this.qudaoLook = false;
      this.myInfo = {
        base_info:{
          mobile:'',
          name:'',
          create_time:'',
          spread_mobile:''
        }
      }
    },

    createRole() {
      this.qudaoLookCreat = true;
      this.qudaoTitle = "创建";
      this.detailsInfo = {};
    },

    /**
     * 打开编辑窗口
     */
    async handleInfo(id) {
      this.qudaoLook = true;
      this.qudaoTitle = "编辑";
      try {
        let res = await getDtails({
          id
        });
        this.detailsInfo = res.data;
      } catch (error) {}
    },

    // 渠道列表查看
    async details(id) {
      console.log("id", id);
      this.qudaoLook = true;
      this.qudaoTitle = "详情";
      try {
        let res = await getDtails({
          id: id.id
        });
        this.detailsInfo = res.data;
        this.myInfo.base_info = { ...res.data };
        this.myInfo.base_info.spread_mobile =
          id.spread_mobile == 0 ? "-" : id.spread_mobile;
      } catch (error) {}
    },

    // 编辑保存渠道
    async onSaveRole() {
      this.$refs.detailsInfo.validate(async valid => {
        if (!valid) return;
        await this.$confirm("确认要保存对该渠道的编辑吗", "提示", {
          type: "warning"
        });
        const { id, linkman, mobile } = this.detailsInfo;
        try {
          let res = await updateQudaoRoleEdit({ id, linkman, mobile });
          console.log(res);
          if (res.code === 0) {
            this.qudaoLook = false;
            this.$message.success("渠道编辑保存成功");
            this.getList();
          } else {
            throw new Error();
          }
        } catch (error) {
          this.$message.error("渠道编辑保存失败");
        }
      });
    },
    // 创建保存渠道
    onSaveRoleCreat() {
      this.$refs.detailsInfoCreat.validate(async valid => {
        if (!valid) return;
        // await this.$confirm("确认要保存对该渠道的编辑吗", "提示", {
        //   type: "warning"
        // });
        const { nameCreat, linkmanCreat, mobileCreat } = this.detailsInfo;
        try {
          let res = await updateRoleEditCreat({
            name: nameCreat,
            linkman: linkmanCreat,
            mobile: mobileCreat
          });
          console.log(res);
          if (res.code === 0) {
            this.qudaoLookCreat = false;
            this.$message.success("渠道编辑保存成功");
            this.getList();
          } else {
            throw new Error();
          }
        } catch (error) {
          this.$message.error("渠道编辑保存失败");
        }
      });
    },

   // 导出
    addProduct() {
      console.log("multipleSelection65666", this.multipleSelectionAll);
      console.log("this.multipleSelection", this.multipleSelection);
      if (
        this.multipleSelection.length == 0 &&
        this.multipleSelectionAll.length == 0
      ) {
        this.page = 1;
        this.limit = 5000;
        this.getList().then(() => {
          this.addEmpShow1 = true;
          return;
        });
      } else if (
        this.multipleSelection.length > 5000 ||
        this.multipleSelectionAll.length > 5000
      ) {
        this.$message("导出数据不能超过5000条");
        return;
      } else if (
        this.multipleSelection.length > 0 ||
        this.multipleSelectionAll.length > 0
      ) {
        const arrayNew = [
          ...new Set(this.multipleSelectionAll.concat(this.multipleSelection))
        ];
        console.log("arrayNew", arrayNew);

        let ary2 = [];
        for (let val of arrayNew) {
          if (!ary2.some(item => item.id == val.id)) {
            ary2.push(val);
          }
        }
        this.allArray = ary2;

        this.addEmpShow1 = true;
      }
    },

    // 导出确定
    exportExcel() {
      // this.addProduct11();
      // this.down()   //压缩单张照片方法
      // this.handleBatchDownload(this.allArrays)  //压缩数组照片方法


      // 导出表格
      const xlsxParam = {
        raw: true
      }; // 转换成excel时，使用原始的格式
      let wb = "";
      wb = XLSX.utils.table_to_book(
        document.querySelector("#table_out"),
        xlsxParam
      ); // 这里就是表格
      console.log(wb);
      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      console.log(wbout);
      // eslint-disable-next-line camelcase
      // this.$emit('update:addEmpShow1', false)

      let tittle =
        thirteenBitTimestamp(new Date().getTime()) + "分销员列表.xlsx";
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: "application/octet-stream"
          }),
          tittle
        ); // table是自己导出文件时的命名，随意
      } catch (e) {
        if (typeof console !== "undefined") {
          console.log(e, wbout);
        }
      }
      // history.go(0)
    },

    clickTable() {},

    // 分配帐号搜索
    async onSearchAccounts() {
      try {
        let res = await getAccountList({
          Keywords: this.accountData.keywords,
          page: 1,
          limit: 500
        });
        if (res.code === 0) {
          this.accountData.list = res.data.rows;
        } else {
          this.$message.error("搜索帐号失败");
        }
      } catch (error) {
        this.$message.error("搜索帐号失败");
      }
    },
    // 分配帐号
    onAccountCheck(e) {
      this.accountData.checked = e.reduce((ids, item) => {
        ids.push(item.id);
        return ids;
      }, []);
    },
    // 关闭 分配帐号 面板
    onAccountEditorClose() {
      this.dialogAccount = false;
      this.accountData.list = [];
      this.accountData.checked = [];
      this.accountData.keywords = "";
    },
    // 保存 帐号分配
    async saveAccountChecked() {
      let res = await allotAccounts(
        this.accountData.role.id,
        this.accountData.checked.join(",")
      );
      if (res.code === 0) {
        this.$message.success("帐号分配保存成功");
        this.onAccountEditorClose();
      } else {
        this.$message.error("帐号分配保存失败");
      }
    },
    // 获取角色列表
    async getList() {

      this.tableLoading = true;
      if (this.valueTime != "") {
        this.startTime =
          this.valueTime[0].getFullYear() +
          "-" +
          (this.valueTime[0].getMonth() + 1) +
          "-" +
          this.valueTime[0].getDate();
        this.endTime =
          this.valueTime[1].getFullYear() +
          "-" +
          (this.valueTime[1].getMonth() + 1) +
          "-" +
          this.valueTime[1].getDate();
      } else {
        this.startTime = "";
        this.endTime = "";
      }
      const data = {
        keywords: this.keywords,
        is_team: this.value1,
        page: this.page,
        start_time: this.startTime,
        end_time: this.endTime,
        limit: this.limit
      }

      console.log("data",data);
      
      let res = await fenxiaoList(data);
      if (res.code === 0) {
        this.allArray = res.data.rows;
        console.log("this.allArray", this.allArray);
        this.pageData = res.data;
        setTimeout(() => {
          this.$refs.chiidTable.setSelectRow(
            this.multipleSelectionAll,
            this.pageData.rows
          );
        }, 200);
         this.tableLoading = false;
      } else {
        this.$message.error("获取列表失败");
      }
    },
    // 删除角色
    onDeleteRole(roleData) {
      const { id, name } = roleData;
      this.$confirm(`确认要删除渠道 【${name}】  吗?`, "提示", {
        type: "warning"
      }).then(async () => {
        id;
        try {
          let res = await deleteQudaoRole({ id });
          this.$message.success(`删除渠道  ${name}  成功`);
          this.getList();
        } catch (error) {
          console.log(error);
        }
      });
    },

    // 批量删除
    handleDelete() {
      let selectIdArr = [];
      this.multipleSelectionAll.forEach(row => {
        selectIdArr.push(row.MenuID);
      });
      this.$confirm("确认上架选中的数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 代换接口
        DeleteBatch({ MenuIDArr: selectIdArr })
          .then(res => {
            this.$message.success(res.msg);
            this.getList();
            this.multipleSelectionAll = [];
          })
          .catch(err => {
            this.$message.error(err.msg);
          });
      });
    },

    // 记忆选择核心方法
    changePageCoreRecordData() {
      let idKey = this.idKey;
      let that = this;
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection;
        return false;
      }
      let selectAllIds = [];
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey]);
      });
      // console.log("总选择的key", selectAllIds);
      let selectIds = [];
      this.multipleSelection.forEach(row => {
        selectIds.push(row[idKey]);
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row);
        }
      });
      let noSelectIds = [];
      this.pageData.rows.forEach(row => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey]);
        }
      });
      noSelectIds.forEach(id => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] == id) {
              that.multipleSelectionAll.splice(i, 1);
              break;
            }
          }
        }
      });
    },

    // 当前页选择
    handleSelectionChange(val) {
      console.log(val.val);
      this.multipleSelection = val.val;
      // this.setSelectRow();
    },
    // 切换每页展示条数
    handleSizeChange(val) {
      this.changePageCoreRecordData();
      this.limit = +val;
      this.getList();
    },
    // 切换page
    handleCurrentChange(val) {
      this.changePageCoreRecordData();
      // console.log(val);
      // eslint-disable-next-line camelcase
      // this.pageData.current_page = +val
      this.page = val;
      this.getList();
    },

    createManage() {
      this.$router.push("/systemSet/mana");
    },
    handleUpdate() {
      this.dialogPsw = true;
    },
    /**
     * 授权编辑窗口
     */
    async onAuth(roleData) {
      this.systemMenus.checkedKeys = [];
      this.systemMenus.halfCheckedKeys = [];
      this.dialogSetting = true;
      this.systemMenus.roleId = roleData.id;
      // 获取角色已有权限信息
      try {
        let info = await getRoleInfo(roleData.id);
        if (info.code === 0) {
          this.systemMenus.checkedKeys = info.data.rules
            ? info.data.rules.split(",")
            : [];
        } else {
          this.dialogSetting = false;
        }
      } catch (error) {
        this.dialogSetting = false;
      }
      // 菜单列表
      if (this.systemMenus.list.length) {
        let list = this.systemMenus.list;
        this.systemMenus.list = [];
        return this.$nextTick(() => {
          this.systemMenus.list = list;
        });
      }
      try {
        let res = await getSystemMenus();
        if (res.code === 0) {
          this.meuns2Class(res.data);
        } else {
          throw new Error("获取权限菜单失败");
        }
      } catch (error) {
        this.$message.error("获取权限菜单失败");
        this.dialogSetting = true;
      }
    },
    /**
     * 菜单归类整理
     */
    meuns2Class(menus) {
      if (!menus.length) return [];
      menus.sort((a, b) => b.Sort - a.Sort);
      let mArr = [];
      console.log(menus);
      menus.forEach(m => {
        if (m.parent_id === 0) {
          mArr.push({
            ...m,
            children: []
          });
        } else {
          this.children2Class(mArr, m);
        }
      });
      console.log(mArr);
      this.systemMenus.list = [
        {
          id: -1,
          title: "全选",
          children: mArr
        }
      ];
    },
    // 子菜单归类
    children2Class(mArr, menu) {
      return mArr.forEach(v => {
        if (v.id === menu.parent_id) {
          v.children.push({
            ...menu,
            children: []
          });
        } else {
          this.children2Class(v.children, menu);
        }
      });
    },
    // 授权菜单 check事件
    onMenuTreeCheck(menu, node) {
      this.systemMenus.checkedKeys = node.checkedKeys;
      this.systemMenus.halfCheckedKeys = node.halfCheckedKeys;
    },
    // 保存 授权
    async onRoleGrant() {
      const { roleId, checkedKeys } = this.systemMenus;
      if (!checkedKeys.length) {
        return this.$message.warning("角色权限不能为空");
      }
      try {
        let menuIds = checkedKeys.sort((a, b) => parseInt(a) - parseInt(b));
        // // if (menuIds.includes("-1") || menuIds.includes(1)) {
        // //   menuIds.shift();
        // // }
        let res = await roleGrant(roleId, menuIds.join(","));
        if (res.code === 0) {
          this.$message.success("角色权限保存成功");
          this.dialogSetting = false;
        }
      } catch (error) {
        // console.log(error);
        this.$message.error("角色权限保存失败");
      }
    },

    // 分配帐号
    onAccount(roleData) {
      this.dialogAccount = true;
      this.accountData.role = roleData;
    },
    // 启用 禁用状态
    async onAccountStatusChange(status, rowData) {
      console.log(status, rowData);
      let res = await upDateRole({
        AdminID: rowData.AdminID,
        AdminStatus: status ? 1 : 0
      });
      if (res.code === 0) {
        if (status) {
          this.$message.success("帐号已启用");
        } else {
          this.$message.warning("帐号已禁用");
        }
        this.getTableList();
      } else {
        this.$message.error("帐号状态操作失败");
      }
    }
  }
};
</script>
<style lang="less" scoped>
#jurisdiction {
  .input-search {
    width: 200px;
    margin-right: 20px;
  }
  .text {
    padding-left: 10px;
  }
  .text span:nth-child(2) {
    padding-left: 15px;
    font-weight: bold;
  }
  .pl_20 {
    padding: 20px 0 0 40px;
  }
  .table_top {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-dialog__title {
    font-size: 18px;
    color: #000;
  }
  .el-dialog__header {
    padding: 10px;
    // background: #1890ff;
  }
  .btnRole {
    margin-left: 20px;
  }
}
.btn-action {
  font-size: 15px;
}

.status-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  .status-text {
    color: #999;
    margin-right: 20px;
    &.active {
      color: #1890ff;
    }
  }
}
.btn-action {
  font-size: 15px;
}
.btnCon {
  margin-bottom: 20px;
  .btn1 {
    float: right;
  }
  .btn2 {
    float: right;
    margin-left: 20px;
  }
}

/deep/ .el-form-item__label {
  text-align: center !important;
  padding: 0;
}
/deep/ .el-form-item {
  margin-bottom: 0;
}
.bgctable {
  background-color: #f2f2f2;
}
.bordertable {
  border: 1px solid #e6e6e6;
}
.bortop {
  border: 1px solid #e6e6e6;
  border-top: transparent;
}
/deep/ .el-input__inner {
  border-radius: 0;
  //  border: 1px solid transparent !important;
}
.diafooter {
  margin-top: 20px;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
