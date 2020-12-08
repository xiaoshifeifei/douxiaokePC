<template>
  <div id="jurisdiction" class="LoadingArea">
    <el-card>
      <div class="table_top" ref="heightTop">
        <div>
          <el-select  v-model="value1" placeholder="会员类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-select style="margin-left:20px"  v-model="value2" placeholder="是否蓝V">
            <el-option label="是" value='1'></el-option>
            <el-option label="否" value='0'></el-option>
          </el-select>

           <el-date-picker
            style="margin-left:20px"
            v-model="valueTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>

          <el-input
            v-model="keywords"
            prefix-icon="el-icon-search"
            placeholder="输入手机号/门店名称/抖音号搜索"
            style="min-width:350px;margin-left:20px"
            class="input-search"
          ></el-input>
          <el-button type="primary" @click="getList" icon="el-icon-search"
            >查询</el-button
          >
          <el-button type="primary" @click="reaseList" 
            >重置条件</el-button
          >
        </div>
        <div class="btnCon">
          <el-button class="btnCli" type="primary" @click="addProduct()">导出</el-button>
          <!-- <el-button type="primary" @click="createRole()">新增角色</el-button> -->
        </div>
        <div style="clear:both"></div>
      </div>
       
      <div class="table_list">
        <!-- 表格列表 -->
        <tablepublicss
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
        >
        </tablepublicss>
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
        :title="edatPa"
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
            :layout="layout"
            :labelCol="labelCol1"
            :wrapperCol="wrapperCol1"
          >
            <el-form-item
              label="商家名称"
              prop="sell_name"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="Info.sell_name"
                :disabled="edatPa == '详情'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="门店名称"
              prop="store_name"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="Info.store_name"
                :disabled="edatPa == '详情'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="联系人"
              prop="contacts"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
              hasFeedback
            >
              <el-input
                v-model="Info.contacts"
                :disabled="edatPa == '详情'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="手机号"
              prop="tel"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
              hasFeedback
            >
              <el-input
                v-model="Info.tel"
                :disabled="edatPa == '详情'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="详细地址"
              prop="address"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="Info.address"
                :disabled="edatPa == '详情'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="抖音号"
              prop="tiktok_num"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="Info.tiktok_num"
                :disabled="edatPa == '详情'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="是否蓝V号"
              prop="is_bluev"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="Info.is_bluev"
                :disabled="edatPa == '详情'"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="抖音号分享地址"
              prop="share_url"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="Info.share_url"
                :disabled="edatPa == '详情'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="门店图标"
              prop="avatar"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
              hasFeedback
            >
              <el-image
                style="width: 30%;height:200px"
                :preview-src-list="[Info.avatar]"
                :src="Info.avatar"
                alt
                :disabled="edatPa == '详情'"
              ></el-image>
            </el-form-item>
            <el-form-item
              label="营业执照照片"
              prop="business_license_url"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
              hasFeedback
            >
              <el-image
                style="width: 50%;height:200px"
                :preview-src-list="[Info.business_license_url]"
                :src="Info.business_license_url"
                alt
                :disabled="edatPa == '详情'"
              ></el-image>
            </el-form-item>
            <el-form-item
              label="门店备注"
              prop="remark"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="Info.remark"
                :disabled="edatPa == '详情'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="门店简介"
              prop="des"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="Info.des"
                :disabled="edatPa == '详情'"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="操作状态"
              prop="operate_status_text"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="Info.operate_status_text"
                :disabled="edatPa == '详情'"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="支付状态"
              prop="check_status_text"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-input
                v-model="Info.check_status_text"
                :disabled="edatPa == '详情'"
              ></el-input>
            </el-form-item>

            <!-- <el-form-item label="角色描述" prop="remark">
            <el-input
              type="textarea"
              :rows="10"
              v-model="Info.remark"
              placeholder="请输入角色描述"
            ></el-input>
          </el-form-item> -->
            <el-form-item>
              <el-button @click="dialoInfo = false">取消</el-button>
              <el-button
                type="primary"
                @click="onSaveRole"
                :disabled="edatPa == '详情'"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
      <el-dialog
        title="申请"
        :before-close="isShowClick"
        :visible.sync="isShowP"
        width="800"
        :show-close="false"
      >
        <el-form
          :model="Info"
          :rules="roleRuless"
          ref="Infoss"
          label-position="right"
          :hide-required-asterisk="false"
          label-width="150px"
        >
          <!-- <el-form-item label="抖音号" prop="tiktok_num">
            <el-input v-model="Info.tiktok_num"></el-input>
          </el-form-item>
          <el-form-item label="抖音号分享地址" prop="share_url">
            <el-input v-model="Info.share_url"></el-input>
          </el-form-item> -->
          <el-form-item label="申请理由" prop="remark">
            <el-input
              type="textarea"
              v-model="Info.remark"
              placeholder="请输入天数"
            ></el-input>
          </el-form-item>
          <div class="pl_20">
            <el-button class="btnA" type="primary" @click="commitClick">保存</el-button>
            <el-button class="btnB" @click="isShowClick">取消</el-button>
            <div style="clear:both"></div>
          </div>
        </el-form>
      </el-dialog>
      <!-- 导出部分 -->
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
          <!-- <el-table-column prop="avatar" align="center" label="门店图标">
            <template slot-scope="scope">
              <div v-show="false">
                {{scope.row.avatar}}
              </div>
              <el-image
                :preview-src-list="[scope.row.avatar]"
                :src="scope.row.avatar == '' ? '加载中...' : scope.row.avatar"
                alt
              ></el-image>
            </template>
          </el-table-column> -->
          <el-table-column prop="sell_name" align="center" label="注册手机号" />
          <el-table-column prop="store_name" align="center" label="门店名称" />
          <el-table-column prop="contacts" align="center" label="抖音号" />
          <el-table-column prop="tel" align="center" label="是否蓝V" />
          <el-table-column prop="address" align="center" label="会员类型" />
          <el-table-column prop="des" align="center" label="会员到期时间" />
          <el-table-column prop="des" align="center" label="注册时间" />
         
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
  GetTableList,
  UpdatePassword,
  SettingLimits,
  DeleteLimits,
  DeleteBatch,
  deleteRole,
  updateRole,
  updateRoleEdit,
  getSystemMenus,
  roleGrant,
  getRoleInfo,
  getAccountList,
  allotAccounts
} from "@/api/jurisdiction";
import { getList } from "../../../api/table";
import {
  // bluevList, //获取蓝V列表
  // bluevApplyList, //详情
  // videOperate //申请
  sellList, //获取列表
  rellRead, //详情
  storeSellvip  //会员赠送
} from "@/api/listvip";
import XLSX from "xlsx";
import { thirteenBitTimestamp } from "@/utils/index";
import FileSaver from "file-saver";

import JSZip from "jszip";
import axios from "axios";

import table2excel from "js-table2excel";

export default {
  data() {
    return {
      valueTime:'',
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value1: '', //会员类型
        value2: '', //是否蓝V

      allArrays:[],
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
      },
      tableLoading: false,
      edatPa: "",
      addEmpShow1: false, //导出弹窗
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
      dialoInfo: false,
      Pswd: {},
      Info: {},
      dialogAccount: false,
      isShowP: false,
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
      idKey: "store_id",
      tableHeight: 0,
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      ],
      activeId:[],
      randomKey: '',
      total: 0, // 总数
      page: 1, // 页码
      limit: 10, // 一页几条
      pageSizes: [10, 20, 50, 100],
      curPage: 1,
      myId: "",
      pageData: {
        // eslint-disable-next-line camelcase
        current_page: 1,
        rows: [],
        total: 0,
        // eslint-disable-next-line camelcase
        total_page: 0
      },
      roleRules: {
        Remark: [
          { required: true, message: "请输入申请理由" },
          { min: 0, max: 1000000, message: "请输入申请理由" }
        ]
      },
      roleRuless: {
        tiktok_num: [{ required: true, message: "请输入抖音号" }],
        share_url: [{ required: true, message: "请填写抖音号分享地址" }],
        remark: [
          { required: true, message: "请输入申请理由" },
          { min: 0, max: 1000000, message: "请输入申请理由" }
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
      paramsListArr: [],
      allArray: [], //导出的数组

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
          id: "avatar",
          type: "image",
          label: "注册手机号",
          fixed: false,
          width: "100",
          prop: "avatar",
          isShow: true,
          align: "center"
        },
         {
          id: "business_license_url",
          type: "image",
          label: "门店名称",
          fixed: false,
          width: "100",
          prop: "business_license_url",
          isShow: true,
          align: "center"
        },
        {
          id: "sell_name",
          type: "",
          label: "抖音号",
          fixed: false,
          width: "",
          prop: "sell_name",
          isShow: true,
          align: "center"
        },
        {
          id: "store_name",
          type: "",
          label: "是否蓝V",
          fixed: false,
          width: "",
          prop: "store_name",
          isShow: true,
          align: "center"
        },
        {
          id: "contacts",
          type: "",
          label: "会员类型",
          fixed: false,
          width: "",
          prop: "contacts",
          isShow: true,
          align: "center"
        },
        {
          id: "tel",
          type: "",
          label: "VIP会员到期时间",
          fixed: false,
          width: "",
          prop: "tel",
          isShow: true,
          align: "center"
        },
        {
          id: "address",
          type: "",
          label: "注册时间",
          fixed: false,
          width: "200",
          prop: "address",
          isShow: true,
          align: "center"
        },
        {
          id: "button",
          type: "button",
          label: "操作",
          fixed: "right",
          width: "270",
          prop: "",
          isShow: true,
          align: "center",
          list: [
             {
              id: "seedit",
              name: "查看",
              type: "primary"
            },
            {
              id: "edit",
              name: "编辑",
              type: "primary"
            },
            {
              id: "accountFenPei",
              name: "赠送会员",
              type: "warning"
            }
         
          ]
        }
      ]
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
      console.log('重置');
      this.keywords = ''
      this.page = 1
      this.limit = 10
      this.value1 = ''  //会员类型
      this.value2 = ''  //是否蓝V
      this.valueTime = ''    //时间日期
      this.getList();

    },
    addProduct11() {
      // 导出
      let newarr = [
        {
          name: "1111",
          baseImg: "/9j/4AAQSkZJRgABAQA"
        }
      ];
      this.StoreDowQrcode(newarr);
    },

    StoreDowQrcode(arr, blogTitle = "二维码") {
      var zip = new JSZip();
      var imgs = zip.folder(blogTitle);
      var baseList = [];
      var _this = this; //var arr = ["/images/bg.png", "/images/bg1.png"];
      for (var i = 0; i < arr.length; i++) {
        //console.log(arr[i].name);
        let name = arr[i].name; //图片名称
        let image = new Image(); // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function() {
          console.log("123456789");
          let canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          let context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, image.width, image.height);
          let url = canvas.toDataURL(); // 得到图片的base64编码数据 let url =
          canvas.toDataURL("image/png");
          baseList.push({ name: name, img: url.substring(22) });
          if (baseList.length === arr.length) {
            if (baseList.length > 0) {
              console.log(777);
              _this.$notify({
                title: "成功",
                message: "即将下载",
                type: "success"
              });
              for (let k = 0; k < baseList.length; k++) {
                imgs.file(baseList[k].name + ".png", baseList[k].img, {
                  base64: true
                });
              }
              zip.generateAsync({ type: "blob" }).then(function(content) {
                // see FileSaver.js
                FileSaver.saveAs(content, blogTitle + ".zip");
              });
            } else {
              _this.$notify.error({
                title: "错误",
                message: "暂无图片可下载"
              });
            }
          }
        };
        image.src = arr[i].baseImg = `data:image/png;base64,${arr[i].baseImg}`;
      }
    },

    // // 压缩单张照片
    // down() { // 保存二维码
    //   this.downloadIamge('http://bytetest.oss-cn-zhangjiakou.aliyuncs.com/store/business_license//20200921/0462b32f86b0d2d50acf0ae684b8e125.jpeg', 'pic')
    // },
    //  downloadIamge (imgsrc, name) { // 下载图片地址和图片名
    //   var image = new Image()
    //   // 解决跨域 Canvas 污染问题
    //   image.setAttribute('crossOrigin', 'anonymous')
    //   image.onload = function () {
    //     var canvas = document.createElement('canvas')
    //     canvas.width = image.width
    //     canvas.height = image.height
    //     var context = canvas.getContext('2d')
    //     context.drawImage(image, 0, 0, image.width, image.height)
    //     var url = canvas.toDataURL('image/png') // 得到图片的base64编码数据
    //     var a = document.createElement('a') // 生成一个a元素
    //     var event = new MouseEvent('click') // 创建一个单击事件
    //     a.download = name || 'photo' // 设置图片名称
    //     a.href = url // 将生成的URL设置为a.href属性
    //     a.dispatchEvent(event) // 触发a的单击事件
    //   }
    //   image.src = imgsrc
    // },

    // 压缩一个数组的照片
    getFile(url) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url,
          responseType: 'arraybuffer'
        }).then(data => {
          resolve(data.data)
        }).catch(error => {
          reject(error.toString())
        })
      })
    },
    // 批量下载
    async handleBatchDownload(selectImgList) {
      console.log('selectImgList',selectImgList);
      const data = this.allArrays;  //可传数组的转base64图片
      const zip = new JSZip()
      const cache = {}
      const promises = []
      await data.forEach(item => {
          const promise = this.getFile(item).then(data => { // 下载文件, 并存成ArrayBuffer对象
          const arr_name = item.split("/");
          let file_name = arr_name[arr_name.length - 1] // 获取文件名
          // if (file_name.indexOf('.png') == -1) {
         //    file_name = file_name + '.png'
         // }
          zip.file(file_name, data, {
            binary: true
          }) // 逐个添加文件
          cache[file_name] = data
        })
        promises.push(promise)
      })
      Promise.all(promises).then(() => {
        zip.generateAsync({
          type: "blob"
        }).then(content => { // 生成二进制流
          FileSaver.saveAs(content, "蓝V信息数据.zip") // 利用file-saver保存文件
        })
      })
      console.log('成功啦');
    },
    // 导出
    addProduct() {
        // console.log("multipleSelection65666", this.multipleSelectionAll);
      if (this.multipleSelection.length == 0 && this.multipleSelectionAll.length == 0) {
        this.page=1
        this.limit = 1000;
        this.getList().then(() => {
          // console.log("this.allArray6464",this.allArray);
          // this.allArray.forEach(item=>{
          //   console.log('item222',item);
          //   if(item.business_license_url.indexOf("bytetest.oss-cn-zhangjiakou.aliyuncs.com") != -1){
          //     this.allArrays.push("/oss_file" + item.business_license_url.substring(47,10000))
          //     }
          // })
          this.addEmpShow1 = true;
          return
        })
      } else if (this.multipleSelection.length > 1000 || this.multipleSelectionAll.length > 1000) {
        this.$message("导出数据不能超过1000条");
        return;
      } else if (this.multipleSelection.length > 0 || this.multipleSelectionAll.length > 0) {
        const arrayNew =[...new Set(this.multipleSelectionAll.concat(this.multipleSelection))] 
        console.log("arrayNew",arrayNew);
        this.allArray = arrayNew
        this.addEmpShow1 = true;
      }
    },

  
    // 导出确定
    exportExcel() {
      // this.addProduct11();
      // this.down()   //压缩单张照片方法
      this.handleBatchDownload(this.allArrays)  //压缩数组照片方法


      // 导出图片和表格
      // console.log("this.paramsListArr", this.allArray);
      // const column = [
      // 	{
      // 		title: '门店图标',
      // 		key: 'avatar',
      // 		type: 'image',
      // 		width: 80,
      // 		height: 40
      // 	},
      // 	{
      // 		title: '商家名称',
      // 		key: 'sell_name',
      //     type: 'text',
      //     width: 80,
      // 		height: 70
      // 	},
      // 	{
      // 		title: '门店名称',
      // 		key: 'store_name',
      //     type: 'text',
      //     width: 80,
      // 		height: 70
      // 	},
      // 	{
      // 		title: '联系人',
      // 		key: 'contacts',
      //     type: 'text',
      //     width: 80,
      // 		height: 70
      // 	},
      // 	{
      // 		title: '联系电话',
      // 		key: 'tel',
      //     type: 'text',
      //     width: 80,
      // 		height: 70
      // 	},
      // 	{
      // 		title: '详细地址',
      // 		key: 'address',
      //     type: 'text',
      //     width: 80,
      // 		height: 70
      // 	},
      // 	{
      // 		title: '门店简介',
      // 		key: 'des',
      //     type: 'text',
      //     width: 80,
      // 		height: 70
      // 	},
      // 	{
      // 		title: '审核操作状态',
      // 		key: 'operate_status_text',
      //     type: 'text',
      //     width: 80,
      // 		height: 70
      // 	},
      // 	{
      // 		title: '付款状态状态',
      // 		key: 'pay_status_text',
      //     type: 'text',
      //     width: 80,
      // 		height: 70
      // 	},
      // 	{
      // 		title: '门店备注',
      // 		key: 'remark',
      //     type: 'text',
      //     width: 80,
      // 		height: 70
      // 	},
      // 	{
      // 		title: '营业执照',
      // 		key: 'business_license_url',
      // 		type: 'image',
      // 		width: 80,
      // 		height: 40
      // 	}
      // ]
      // /** column数据的说明 */
      // // 1.title为列名
      // // 2.key为data数据每个对象对应的key
      // // 3.若为图片格式, 需要加type为image的说明,并且可以设置图片的宽高
      // const data = this.allArray
      // const excelName = '导出表格'

      // table2excel(column, data, excelName)


      // 导出表格
      const xlsxParam = {
        raw: true
      } // 转换成excel时，使用原始的格式
      let wb = ''
      wb = XLSX.utils.table_to_book(
        document.querySelector('#table_out'),
        xlsxParam
      ) // 这里就是表格
      console.log(wb)
      const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      console.log(wbout)
      // eslint-disable-next-line camelcase
      // this.$emit('update:addEmpShow1', false)

      let tittle = thirteenBitTimestamp(new Date().getTime()) + '蓝V申请表.xlsx'
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: 'application/octet-stream'
          }),
          tittle
        ) // table是自己导出文件时的命名，随意
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      // history.go(0)
    },
      // 当前页选择
    handleSelectionChange(val) {
      console.log("当前页选择",val.val);
      console.log("this.multipleSelectionAll78946",this.multipleSelectionAll);
      this.multipleSelection = val.val;
       val.val.forEach((m, i) => {
        this.activeId.push(m[this.idKey])
      })
      console.log('this.activeId',this.activeId);
    },
    // 切换每页展示条数
    handleSizeChange(val) {
      console.log("val切换每页展示条数",val);
      this.changePageCoreRecordData();
      this.limit = +val;
      this.getList();
    },
    // 切换page
    handleCurrentChange(val) {
      console.log('切换page',val);
      // eslint-disable-next-line camelcase
      // this.pageData.current_page = +val
      this.page = val;
      this.changePageCoreRecordData();
      this.getList();
    },
    // 导出取消
    handleDialogClose3() {
      // this.$refs.multipleTable.resetFields()
      this.addEmpShow1 = false;
      this.limit = 10;
    },
    // 申请取消
    isShowClick() {
      this.Info = {
        tiktok_num: "",
        share_url: "",
        remark: ""
      };
      this.$refs.Infoss.resetFields();
      this.isShowP = false;
    },
    // 申请保存
    async commitClick() {
      console.log(111);
      const data = {
        // tiktok_num: this.Info.tiktok_num,
        // share_url: this.Info.share_url,
        days: this.Info.remark,
        store_id: this.myId
      };
      try {
        let res = await storeSellvip(data);
        if (res.code === 0) {
          this.$message.success("申请成功");
          this.$refs.Infoss.resetFields();
          this.isShowP = false;
        } else {
          this.$message.error("申请失败");
        }
      } catch (error) {
        // this.$message.error("申请失败");
      }
    },
    //按钮
    handleEdit(item) {
      console.log('item222',item);
      if (item.row == "seedit") {
        console.log("查看");
        this.onAuth(item.index);
      } else if (item.row == "edit") {
        console.log("编辑");
        this.handleInfo(item.index);
      } else if (item.row == "accountFenPei") {
        console.log("会员申请",item);
        this.onAccount(item.index);
      }
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
    // 分配帐号
    onAccountCheck(e) {
      this.accountData.checked = e.reduce((ids, item) => {
        ids.push(item.id);
        return ids;
      }, []);
    },
    // 关闭 分配帐号 面板
    onAccountEditorClose() {
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
      let res = await sellList({
        keyword: this.keywords,
        page: this.page,
        limit: this.limit
      })
        .then(res => {
          console.log('res555',res);
          this.allArray = res.data.rows;
          // console.log("this.allArray", this.allArray);
          this.pageData = res.data;
          // console.log('this.multipleSelectionAll5555',this.multipleSelectionAll);
         setTimeout(()=>{
            this.$refs.chiidTable.setSelectRow(
            this.multipleSelectionAll,
            this.pageData.rows
          )
         },200)

          this.tableLoading = false;
        })
        .catch(err => {
          this.$message.error("获取列表失败");
        });

      // try {
      //   let res = await bluevList({
      //     keywords: this.keywords,
      //     page: this.page,
      //     limit: this.limit
      //   });
      //   this.tableLoading = true
      //   if (res.code === 0) {
      //     this.allArray = res.data.rows

      //     // setTimeout(() => {
      //     //   this.allArray = res.data.rows
      //     //   console.log('this.allArray',this.allArray);
      //     //   const arrayList = []
      //     //   for (let index = 0; index < this.allArray.length; index++) {
      //     //     console.log('index.business_license_url',this.allArray[index].business_license_url);
      //     //     this.imageUrlToBase64(this.allArray[index].business_license_url)
      //     //     console.log(111);
      //     //   }

      //     //   // this.allArray.forEach(item => {
      //     //   //   arrayList.push(item.business_license_url)
      //     //   // })
      //     //   // console.log('arrayList',arrayList);
      //     //   // this.paramsListArr = arrayList
      //     //   this.tableLoading = false
      //     // }, 800);

      //     this.pageData = res.data;
      //     setTimeout(() => {
      //       this.$refs.chiidTable.setSelectRow(
      //         this.multipleSelectionAll,
      //         this.pageData.rows
      //       );
      //       this.tableLoading = false
      //     }, 200);
      //   } else {
      //     this.$message.error("获取列表失败");
      //     this.tableLoading = false
      //   }
      // } catch (error) {
      //   // console.log(error);
      //   this.$message.error("获取列表失败");
      // }
    },

    // 删除角色
    onDeleteRole(roleData) {
      const { id, name } = roleData;
      this.$confirm(`确认要删除角色 【${name}】  吗?`, "提示", {
        type: "warning"
      }).then(async () => {
        id;
        try {
          let res = await deleteRole({ id });
          this.$message.success(`删除角色  ${name}  成功`);
          this.getList();
        } catch (error) {
          console.log(error);
        }
      });
    },
    // 编辑保存 角色
    onSaveRole() {
      this.$refs.Info.validate(async valid => {
        if (!valid) return;
        await this.$confirm("确认要保存对该角色的编辑吗", "提示", {
          type: "warning"
        });
        const { id, name, remark } = this.Info;
        try {
          let res = await updateRoleEdit({ id, name, remark });
          console.log(res);
          if (res.code === 0) {
            this.dialoInfo = false;
            this.$message.success("角色编辑保存成功");
            this.getList();
          } else {
            throw new Error();
          }
        } catch (error) {
          this.$message.error("角色编辑保存失败");
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
        console.log(111);
        // 选中的数组
        this.multipleSelectionAll = this.multipleSelection;
        return 
      }
      console.log(222);
      let selectAllIds = [];
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey]);
      });
      let selectIds = [];
      this.multipleSelection.forEach(row => {
        selectIds.push(row[idKey]);
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          // 选中的数组
          that.multipleSelectionAll.push(row);
        }
      });
      // 当也未选中ID
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

  
    createRole() {
      this.$router.push("/systemSet/addRole");
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
    /**
     * 打开详情窗口
     */
    handleInfo(roleData) {
      console.log('roleData,',roleData);

      this.Info = { ...roleData };
      this.dialoInfo = true;
      this.edatPa = "详情";
    },
    // 申请
    onAccount(roleData) {
      this.accountData.role = roleData;
      console.log(111111, roleData);
      this.myId = roleData.sell_id;
      this.isShowP = true;
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
    .btnB {
      float: right;
    }
    .btnA {
      float: right;
      margin-left: 20px;
    }
  }
  .table_top {
    margin-bottom: 60px;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    .btnCon {
     position: relative;
     .btnCli {
       position: absolute;
       right: 0;
     }
    }
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
</style>
