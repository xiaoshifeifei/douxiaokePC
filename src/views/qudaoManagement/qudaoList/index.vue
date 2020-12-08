<template>
  <div id="jurisdiction" class="LoadingArea">
    <el-card>
      <div class="table_top" ref="heightTop">
        <div>
          <el-input
            v-model="keywords"
            prefix-icon="el-icon-search"
            placeholder="输入渠道商名称/联系人/联系手机号"
            style="min-width:350px;"
            class="input-search"
          ></el-input>
          <el-button type="primary" @click="getList" icon="el-icon-search"
            >查询</el-button
          >
          <el-button
            type="primary"
            @click="reaseList"
            >重置条件</el-button
          >
        </div>
        <div class="btnCon">
          <!-- <el-button @click="handleDelete()">批量删除</el-button> -->
          <!-- <el-button class=" btnRole"  type="primary" @click="createManage()">新增管理</el-button> -->
          <el-button type="primary" @click="createRole()">新增渠道</el-button>
          <el-button type="primary" @click="clickExport()">导出</el-button>
        </div>
      </div>
      <div class="table_list">
        <!-- 表格列表 -->
        <tablepublic
          id="table_out"
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
              <el-button  @click="onAccountEditorClose">取消</el-button>
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
        :show-close="true"
      >
        <div class="formStyle">
          <el-form
            :model="detailsInfo"
            :rules="roleRules"
            ref="detailsInfo"
            label-position="right"
            :hide-required-asterisk="false"
            label-width="120px"
            :layout="layout"
            :labelCol="labelCol1"
            :wrapperCol="wrapperCol1"
          >
            <el-form-item
              label="渠道名称"
              prop="name"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="detailsInfo.name"
                :disabled="qudaoTitle == '详情'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="联系人"
              prop="linkman"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                type="text"
                maxlength="10"
                show-word-limit
                v-model="detailsInfo.linkman"
                :disabled="qudaoTitle == '详情'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="联系电话"
              prop="mobile"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="detailsInfo.mobile"
                :disabled="qudaoTitle == '详情'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="渠道码"
              prop="code"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="detailsInfo.code"
                :disabled="qudaoTitle == '详情' || qudaoTitle == '编辑'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="渠道二维码地址"
              prop="qrcode"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
              hasFeedback
            >
              <el-image
                style="width: 20%;height:150px"
                :preview-src-list="[detailsInfo.qrcode]"
                :src="detailsInfo.qrcode"
                alt
              ></el-image>
            </el-form-item>
            <el-form-item
              label="创建时间"
              prop="create_time"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="detailsInfo.create_time"
                :disabled="qudaoTitle == '详情' || qudaoTitle == '编辑'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="更新时间"
              prop="update_time"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="detailsInfo.update_time"
                :disabled="qudaoTitle == '详情' || qudaoTitle == '编辑'"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button class="btnQx" @click="qudaoLook = false">取消</el-button>
              <el-button
                type="primary"
                @click="onSaveRole"
                :disabled="qudaoTitle == '详情'"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>

      <!-- 创建渠道 -->
      <el-dialog
        :title="qudaoTitle"
        :visible.sync="qudaoLookCreat"
        :before-close="handleDialogClose3"
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
              <!--  prop="nameCreat" -->

            <el-form-item
              label="渠道名称"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="detailsInfo.nameCreat"
                :disabled="qudaoTitle == '详情' || qudaoTitle == '编辑'"
              ></el-input>
            </el-form-item>
              <!-- prop="linkmanCreat" -->

            <el-form-item
              label="联系人"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                type="text"
                maxlength="10"
                show-word-limit
                v-model="detailsInfo.linkmanCreat"
              ></el-input>
            </el-form-item>
              <!-- prop="mobileCreat" -->

            <el-form-item
              label="联系电话"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input v-model="detailsInfo.mobileCreat"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="btnQx" @click="handleDialogClose3">取消</el-button>
              <el-button type="primary" @click="onSaveRoleCreat"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import {
  qudaoList,
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
  deleteQudaoRole,
  getDtailsTeam
} from "@/api/jurisdiction";
import { getList } from "../../../api/table";
import { isvalidPhone } from "../../../utils/validate";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import JSZip from "jszip";
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
      keywords: "", // 搜索
      data: [
        {
          id: 1,
          label: "权限管理",
          children: [
            {
              id: 2,
              label: "人员管理",
              children: [
                {
                  id: 11,
                  label: "查看"
                },
                {
                  id: 12,
                  label: "添加"
                },
                {
                  id: 13,
                  label: "修改"
                },
                {
                  id: 14,
                  label: "删除"
                }
              ]
            },
            {
              id: 3,
              label: "清扫请求",
              children: [
                {
                  id: 15,
                  label: "查看"
                },
                {
                  id: 16,
                  label: "添加"
                },
                {
                  id: 17,
                  label: "修改"
                },
                {
                  id: 18,
                  label: "删除"
                },
                {
                  id: 19,
                  label: "接收订单"
                }
              ]
            },
            {
              id: 4,
              label: "维权请求",
              children: [
                {
                  id: 20,
                  label: "查看"
                },
                {
                  id: 21,
                  label: "添加"
                },
                {
                  id: 22,
                  label: "修改"
                },
                {
                  id: 23,
                  label: "删除"
                },
                {
                  id: 24,
                  label: "接收订单"
                }
              ]
            },
            {
              id: 5,
              label: "退房请求",
              children: [
                {
                  id: 25,
                  label: "查看"
                },
                {
                  id: 26,
                  label: "添加"
                },
                {
                  id: 27,
                  label: "修改"
                },
                {
                  id: 28,
                  label: "删除"
                },
                {
                  id: 29,
                  label: "接收订单"
                }
              ]
            },
            {
              id: 6,
              label: "评论管理",
              children: [
                {
                  id: 30,
                  label: "查看"
                },
                {
                  id: 31,
                  label: "回复"
                }
              ]
            },
            {
              id: 7,
              label: "租赁订单",
              children: [
                {
                  id: 32,
                  label: "查看"
                },
                {
                  id: 33,
                  label: "添加"
                },
                {
                  id: 34,
                  label: "修改"
                },
                {
                  id: 35,
                  label: "删除"
                },
                {
                  id: 36,
                  label: "接收订单"
                }
              ]
            },
            {
              id: 8,
              label: "客户订单",
              children: [
                {
                  id: 37,
                  label: "查看"
                },
                {
                  id: 38,
                  label: "添加"
                },
                {
                  id: 39,
                  label: "修改"
                },
                {
                  id: 40,
                  label: "删除"
                },
                {
                  id: 41,
                  label: "接收订单"
                }
              ]
            },
            {
              id: 9,
              label: "客户服务",
              children: [
                {
                  id: 42,
                  label: "查看"
                },
                {
                  id: 43,
                  label: "添加"
                },
                {
                  id: 44,
                  label: "修改"
                },
                {
                  id: 45,
                  label: "删除"
                },
                {
                  id: 46,
                  label: "接收订单"
                }
              ]
            },
            {
              id: 10,
              label: "banner管理",
              children: [
                {
                  id: 47,
                  label: "查看"
                },
                {
                  id: 48,
                  label: "添加"
                },
                {
                  id: 49,
                  label: "修改"
                },
                {
                  id: 50,
                  label: "删除"
                },
                {
                  id: 51,
                  label: "接收订单"
                }
              ]
            }
          ]
        }
      ],
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
      idKey: "RoleID",
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
          { min: 1, max: 500, message: "长度在 1 到 500 个字符" }
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
          { min: 1, max: 10, message: "长度在 10 个字符以内" }
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
          id: "name",
          type: "",
          label: "渠道名称",
          fixed: false,
          width: "",
          prop: "name",
          isShow: true,
          align: "center"
        },
        {
          id: "qrcode",
          type: "",
          label: "渠道二维码",
          fixed: false,
          width: "100",
          prop: "qrcode",
          isShow: true,
          align: "center"
        },
        {
          id: "code",
          type: "",
          label: "渠道编码",
          fixed: false,
          width: "",
          prop: "code",
          isShow: true,
          align: "center"
        },
        {
          id: "linkman",
          type: "",
          label: "联系人",
          fixed: false,
          width: "",
          prop: "linkman",
          isShow: true,
          align: "center"
        },
        {
          id: "mobile",
          type: "",
          label: "联系电话",
          fixed: false,
          width: "",
          prop: "mobile",
          isShow: true,
          align: "center"
        },
        {
          id: "total_spread",
          type: "",
          label: "接入分销员数",
          fixed: false,
          width: "",
          prop: "total_spread",
          isShow: true,
          align: "center"
        },
        {
          id: "create_time",
          type: "",
          label: "入驻时间",
          fixed: false,
          width: "",
          prop: "create_time",
          isShow: true,
          align: "center"
        },

        // {
        //   id: "status",
        //   type: "",
        //   label: "角色状态",
        //   fixed: false,
        //   width: "",
        //   prop: "status",
        //   isShow: true,
        //   align: "center"
        // },

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
            {
              id: "edit",
              name: "编辑",
              type: "primary"
            },

            {
              id: "del",
              name: "删除",
              type: "danger",
              isShow: true
            }
          ]
        }
      ],

      // 渠道商列表

      qudaoLook: false, //查看渠道
      qudaoLookCreat: false,
      qudaoTitle: "",
      detailsInfo: {},
      layout: "inline",

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
    handleDialogClose3() {
      this.detailsInfo = {};
      this.qudaoLookCreat = false;
      this.$refs.detailsInfoCreat.resetFields();
    },
    //按钮
    handleEdit(item) {
      if (item.row == "details") {
        console.log(item);
        this.details(item.index.id);
      } else if (item.row == "edit") {
        this.handleInfo(item.index.id);
      } else if (item.row == "accountFenPei") {
        this.onAccount(item.index);
      } else {
        this.onDeleteRole(item.index);
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
        let res = await getDtailsTeam({
          id
        });
        this.detailsInfo = res.data;
      } catch (error) {}
    },

    // 渠道列表查看
    async details(id) {
      this.qudaoLook = true;
      this.qudaoTitle = "详情";
      try {
        let res = await getDtailsTeam({
          id
        });
        this.detailsInfo = res.data;
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
            this.detailsInfo = {};
            this.$refs.detailsInfoCreat.resetFields();
            this.$message.success("渠道编辑保存成功");
            this.getList();
          } else {
            throw new Error();
          }
        } catch (error) {
          this.$message(res.msg);
        }
      });
    },

    // 导出
    clickExport() {
      // 导出图片和表格
      console.log("this.paramsListArr", this.allArray);
      const column = [
      	{
      		title: '渠道名称',
      		key: 'name',
      		type: 'text',
      		width: 80,
      		height: 40
      	},
      	{
      		title: '渠道二维码',
      		key: 'qrcode',
          type: 'image',
          width: 80,
      		height: 70
      	},
      	{
      		title: '渠道编码',
      		key: 'code',
          type: 'text',
          width: 80,
      		height: 70
      	},
      	{
      		title: '联系人',
      		key: 'linkman',
          type: 'text',
          width: 80,
      		height: 70
      	},
      	{
      		title: '联系电话',
      		key: 'mobile',
          type: 'text',
          width: 80,
      		height: 70
      	},
      	{
      		title: '接入分销员数',
      		key: 'total_spread',
          type: 'text',
          width: 80,
      		height: 70
      	},
      	{
      		title: '入驻时间',
      		key: 'create_time',
          type: 'text',
          width: 80,
      		height: 70
      	},
      ]
      /** column数据的说明 */
      // 1.title为列名
      // 2.key为data数据每个对象对应的key
      // 3.若为图片格式, 需要加type为image的说明,并且可以设置图片的宽高
      const data = this.allArray
      const excelName = '导出表格'

      table2excel(column, data, excelName)





      // const xlsxParam = {
      //   raw: true
      // }; // 转换成excel时，使用原始的格式
      // let wb = XLSX.utils.table_to_book(
      //   document.querySelector("#table_out"),
      //   xlsxParam
      // ); // 这里就是表格
      // // console.log(document.querySelector('#table_out'))
      // let wbout = XLSX.write(wb, {
      //   bookType: "xlsx",
      //   bookSST: true,
      //   type: "array"
      // });
      // try {
      //   FileSaver.saveAs(
      //     new Blob([wbout], {
      //       type: "application/octet-stream"
      //     }),
      //     "渠道商列表.xlsx"
      //   );
      // } catch (e) {
      //   if (typeof console !== "undefined") console.log(e, wbout);
      // }
      // return wbout;
    },

    clickTable() {},

    // 分配帐号搜索
    async onSearchAccounts() {
      try {
        let res = await getAccountList({
          keywords: this.accountData.keywords,
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
     // 重置条件
    reaseList() {
      this.keywords = "";
      this.page = 1;
      this.limit = 10;
      this.value1 = ""; //会员类型
      this.value2 = ""; //是否蓝V
      this.valueTime = ""; //时间日期
      this.getList();
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
      try {
        let res = await qudaoList({
          keywords: this.keywords,
          page: this.page,
          limit: this.limit
        });
        if (res.code === 0) {
          this.allArray = res.data.rows
          // console.log("res", res);
          this.pageData = res.data;
          setTimeout(() => {
            this.$refs.chiidTable.setSelectRow(
              this.multipleSelectionAll,
              this.pageData.rows
            );
          }, 200);
        } else {
          this.$message.error("获取列表失败");
        }
      } catch (error) {
        // console.log(error);
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
      // this.changePageCoreRecordData();
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
.btnQx {
  margin-left: 33%;
  margin-top: 20px;
}
</style>
