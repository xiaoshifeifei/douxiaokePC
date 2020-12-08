<template>
  <div id="jurisdiction" class="LoadingArea">
    <el-card>
      <div class="table_top" ref="heightTop">
        <div>
          <el-input
            v-model="keywords"
            prefix-icon="el-icon-search"
            placeholder="输入用户手机号/app名称/所属分销员/所属渠道"
            style="min-width:350px;"
            class="input-search"
          ></el-input>
          <el-button type="primary" @click="getList" icon="el-icon-search"
            >查询</el-button
          >
          <el-button type="primary" @click="reaseList">重置条件</el-button>
        </div>
        <div class="btnCon">
          <!-- <el-button @click="handleDelete()">批量删除</el-button> -->
          <!-- <el-button class=" btnRole"  type="primary" @click="createManage()">新增管理</el-button> -->
          <!-- <el-button type="primary" @click="createAdd()">新增</el-button> -->
          <el-button type="primary" @click="createAdd()"
            >添加渠道商佣金设置</el-button
          >
          <el-button type="primary" @click="addProduct()">导出</el-button>
        </div>
      </div>
      <div class="table_list">
        <!-- 表格列表 -->
        <tablepublicee
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
        ></tablepublicee>
      </div>
      <el-dialog
        title="查看修订记录"
        :visible.sync="dialogAccount"
        :before-close="isAccount"
        width="95%"
      >
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="平台释放奖励" name="first">
            <el-table
              v-loading="app.tableLoading"
              :data="app.tableData.list"
              style="width:100%"
              border
              :height="windowHeight"
            >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50"
              ></el-table-column>
              <!-- <el-table-column
                v-for="(item, index) in columnsAcc"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                align="center"
                :min-width="item.width"
              >
              </el-table-column> -->

              <el-table-column
                prop="order_type_name"
                label="订单类型"
                align="center"
                :min-width="100"
              >
              </el-table-column>
              <el-table-column
                prop="distribute_name"
                label="订单标题"
                align="center"
                :min-width="100"
              >
              </el-table-column>
              <el-table-column
                prop="value"
                label="平台释放奖励"
                align="center"
                :min-width="100"
              >
                <template slot-scope="scope">
                  ￥{{ scope.row.value }}
                </template>
              </el-table-column>
              <el-table-column
                prop="create_time"
                label="生效日期"
                align="center"
                :min-width="100"
              >
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
          </el-tab-pane>
          <el-tab-pane label="分销员佣金" name="second">
            <el-table
              v-loading="app.tableLoading"
              :data="app.tableData.list"
              style="width:100%"
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
                v-for="(item, index) in columnsAccLL"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                align="center"
                :min-width="item.width"
              >
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
            ></el-pagination
          ></el-tab-pane>
        </el-tabs>

        <div slot="footer">
          <el-button
            style="margin-right:50%;transform:translataX(50%)"
            @click="isAccount"
            >取消</el-button
          >
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
        :before-close="isShowClick"
        width="60%"
        :show-close="true"
      >
        <div class="formStyle">
          <el-form
            :model="detailsInfo"
            :rules="roleRules"
            ref="detailsInfo"
            label-position="right"
            :hide-required-asterisk="false"
            label-width="150px"
            :layout="layout"
            :labelCol="labelCol1"
            :wrapperCol="wrapperCol1"
          >
            <el-form-item
              label="渠道商"
              prop="team_name"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-form-item
                v-if="qudaoTitle == '编辑' || qudaoTitle == '详情'"
                prop="projectName"
              >
                <el-input
                  :disabled="qudaoTitle == '编辑' || qudaoTitle == '详情'"
                  maxlength="20"
                  v-model="project_name"
                  type="text"
                ></el-input>
              </el-form-item>

              <el-select v-else v-model="team_id" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.team_id"
                  :label="item.team_name"
                  :value="item.team_id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="推广APP"
              prop="project_name"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
              hasFeedback
            >
              <el-form-item
                v-if="qudaoTitle == '编辑' || qudaoTitle == '详情'"
                prop="projectName"
              >
                <el-input
                  :disabled="qudaoTitle == '编辑' || qudaoTitle == '详情'"
                  maxlength="20"
                  v-model="team_name"
                  type="text"
                ></el-input>
              </el-form-item>

              <el-select v-else v-model="project_id" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.project_id"
                  :label="item.project_name"
                  :value="item.project_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div>
            <el-form
              label-position="right"
              :hide-required-asterisk="false"
              label-width="120px"
              :layout="layout"
              :labelCol="labelCol1"
              :wrapperCol="wrapperCol1"
            >
              <div class="divbox">
                <div class="box-l">
                  平台释放佣金奖励
                </div>
                <div
                  class="box-r"
                  v-for="(item, index) in qdArray"
                  :key="index"
                >
                  <div class="cha" @click="deleItem(item)">×</div>
                  <el-form-item label="订单类型" prop="order_type_id">
                    <el-form-item
                      v-if="qudaoTitle == '编辑' || qudaoTitle == '详情'"
                      prop="projectName"
                    >
                      <el-input
                        :disabled="qudaoTitle == '编辑' || qudaoTitle == '详情'"
                        maxlength="20"
                        v-model="item.order_type_name"
                        type="text"
                      ></el-input>
                    </el-form-item>

                    <el-select
                      v-else
                      v-model="item.order_type_id"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in options3"
                        :key="item.order_type_id"
                        :label="item.order_type_name"
                        :value="item.order_type_id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="订单标题" prop="projectName">
                    <el-input
                      :disabled="qudaoTitle == '详情'"
                      show-word-limit
                      maxlength="20"
                      v-model="item.distribute_name"
                      type="text"
                    ></el-input>
                  </el-form-item>

                  <el-form-item
                    label="平台释放奖励"
                    prop="projectValue"
                    class="spanman"
                  >
                    <el-input
                      v-model="item.value"
                      :disabled="qudaoTitle == '详情'"
                    ></el-input
                    ><span class="spanman1">￥</span>
                  </el-form-item>
                  <el-form-item
                    prop="projectValue"
                    v-if="qudaoTitle == '编辑'"
                    class="spanman"
                  >
                    <el-button
                      style="margin-left:80%"
                      type="primary"
                      v-if="qudaoTitle == '编辑'"
                      @click="upd(item.id, index)"
                      >确认编辑</el-button
                    >
                    <div style="clear:both"></div>
                  </el-form-item>
                </div>

                <div
                  class="box-r"
                  v-for="(item, index) in qdArray1"
                  :key="index"
                >
                  <div class="cha" @click="deleItem(item)">×</div>
                  <el-form-item label="订单类型" prop="order_type_id">
                    <el-select
                      v-model="item.order_type_id"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in options4"
                        :key="item.order_type_id"
                        :label="item.order_type_name"
                        :value="item.order_type_id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="订单标题" prop="projectName">
                    <el-input
                      :disabled="qudaoTitle == '详情'"
                      show-word-limit
                      maxlength="20"
                      v-model="item.distribute_name"
                      type="text"
                    ></el-input>
                  </el-form-item>

                  <el-form-item
                    label="平台释放奖励"
                    prop="projectValue"
                    class="spanman"
                  >
                    <el-input
                      v-model="item.value"
                      :disabled="qudaoTitle == '详情'"
                    ></el-input
                    ><span class="spanman1">￥</span>
                  </el-form-item>
                  <el-form-item
                    prop="projectValue"
                    v-if="qudaoTitle == '编辑'"
                    class="spanman"
                  >
                    <el-button
                      style="margin-left:80%"
                      type="primary"
                      @click="upd(item.id, index, '5')"
                      >确认添加</el-button
                    >
                    <div style="clear:both"></div>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <el-button
              v-if="qudaoTitle != '详情'"
              type="primary"
              size="mini"
              class="btnAdd"
              @click="addP"
              >添加</el-button
            >
          </div>

          <div v-if="qudaoTitle == '详情'">
            <el-table
              :data="tableDataArr"
              style="width:80%;margin:auto;margin-top:30px"
              max-height="700"
              border
              height="500"
            >
              <el-table-column
                v-for="(item, index) in columnsy"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                align="center"
                :min-width="item.width"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShowClick">取消</el-button>
          <el-button type="primary" v-if="qudaoTitle != '编辑'" @click="upd"
            >确认</el-button
          >
        </div>
      </el-dialog>
      <el-dialog :visible.sync="qudaoq" width="20%" :show-close="false">
        <div class="formStyle">
          <el-form
            label-position="right"
            :hide-required-asterisk="false"
            label-width="120px"
            :layout="layout"
            :labelCol="labelCol1"
            :wrapperCol="wrapperCol1"
          >
            <div class="zsh">
              确认要设置渠道商平台释放的佣金奖励吗？确认后需提醒渠道商进行分销员佣金的重新设置
            </div>
            <div>
              <el-button @click="qudaoq = false" class="btnq">取消</el-button>
              <el-button type="primary" @click="onSave">保存</el-button>
            </div>
          </el-form>
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
          <el-table-column prop="team_name" align="center" label="渠道商名称" />
          <el-table-column prop="project_name" align="center" label="APP名称">
          </el-table-column>
          <el-table-column
            prop="distribute_name"
            align="center"
            label="平台释放奖励"
          >
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.config_list" :key="index">
                <div><span>{{item.distribute_name}}</span> <span v-if="item.value"> ￥{{item.value}}</span></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" align="center" label="添加时间" />
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
  yongjinList,
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
  fenxiaoList,
  getOrderDtails, // 获取订单类型
  getTeams, // 获取渠道商
  getProjects, // 获取推广APP
  updateSaveManage, // 平台分销添加
  getDistribute, // 获取平台分佣配置详情
  updateSaveUpdate, // 平台编辑
  getHistoryList, // 平台分佣配置历史记录获取
  getAgentHistory // 分销员分佣配置历史记录获取
  // defaultService, // 默认配置获取
  // batchSave1, // 平台分佣配置批量添加
  // platBatchSave //平台分佣配置单个添加
} from "@/api/jurisdiction";

import {
  // getOrderDtails, // 获取订单类型
  // getTeams, // 获取渠道商
  // getProjects, // 获取推广APP
  // updateSaveManage, // 平台分销添加
  // getDistribute, // 获取平台分佣配置详情
  // updateSaveUpdate, // 平台编辑
  // getHistoryList, // 平台分佣配置历史记录获取
  // getAgentHistory, // 分销员分佣配置历史记录获取
  defaultService, // 默认配置获取
  batchSave1, // 平台分佣配置批量添加
  platBatchSave, //平台分佣配置单个添加
  platDistributeSave //平台分佣配置更新
} from "@/api/listvip";
import { getList } from "../../../api/table";
import { isvalidPhone } from "../../../utils/validate";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { thirteenBitTimestamp } from "@/utils/index";
import JSZip from "jszip";
import axios from "axios";
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
      params: "",
      index: "",
      team_name: "",
      projectId: "",
      qdArray1: [],
      options4: [],
      teamId: "",
      project_name: "",
      activeName: "first",
      addEmpShow1: false,
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
      tableDataArr: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      team_id: "",
      options1: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      project_id: "",

      options3: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      item: {
        order_type_id: "",
        value: "",
        distribute_name: ""
      },
      tableLoading: false,
      ddEmpShow1: false,

      qdArray: [
        {
          project_id: "",
          team_id: "",
          order_type_id: "",
          value: "",
          type: "1",
          distribute_name: ""
        }
      ],

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
      myTD: "",
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
      myParamsId: "",

      myParamsIdTeam_id: "",
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

      columnsy: [
        { prop: "order_type_name", label: "会员类型", width: 100 },
        { prop: "setting.level1", label: "直推分销员", width: 100 },
        { prop: "setting.level2", label: "一级间推分销员", width: 100 },
        { prop: "setting.level3", label: "二级间推分销员", width: 100 }
      ],

      columnsAcc: [
        {
          id: "order_type_name",
          type: "",
          label: "订单类型",
          fixed: false,
          width: "",
          prop: "order_type_name",
          isShow: true,
          align: "center"
        },
        {
          id: "distribute_name",
          type: "",
          label: "订单标题",
          fixed: false,
          width: "100",
          prop: "distribute_name",
          isShow: true,
          align: "center"
        },
        {
          id: "value",
          type: "",
          label: "平台释放奖励",
          fixed: false,
          width: "",
          prop: "value",
          isShow: true,
          align: "center"
        },
        {
          id: "create_time",
          type: "",
          label: "生效日期",
          fixed: false,
          width: "",
          prop: "create_time",
          isShow: true,
          align: "center"
        }
      ],
      columnsAccLL: [
        {
          id: "order_type_name",
          type: "",
          label: "订单类型",
          fixed: false,
          width: "",
          prop: "order_type_name",
          isShow: true,
          align: "center"
        },
        {
          id: "setting.level1",
          type: "",
          label: "直推分销员",
          fixed: false,
          width: "100",
          prop: "setting.level1",
          isShow: true,
          align: "center"
        },
        {
          id: "setting.level2",
          type: "",
          label: "一级间推分销员",
          fixed: false,
          width: "",
          prop: "setting.level2",
          isShow: true,
          align: "center"
        },
        {
          id: "setting.level3",
          type: "",
          label: "二级间推分销员",
          fixed: false,
          width: "",
          prop: "setting.level3",
          isShow: true,
          align: "center"
        },
        {
          id: "create_time",
          type: "",
          label: "生效日期",
          fixed: false,
          width: "",
          prop: "create_time",
          isShow: true,
          align: "center"
        }
      ],
      allArray: [],

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
          id: "team_name",
          type: "",
          label: "渠道商名称",
          fixed: false,
          width: "",
          prop: "team_name",
          isShow: true,
          align: "center"
        },
        {
          id: "project_name",
          type: "",
          label: "APP名称",
          fixed: false,
          width: "100",
          prop: "project_name",
          isShow: true,
          align: "center"
        },
        {
          id: "distribute_name",
          type: "",
          label: "平台释放奖金",
          fixed: false,
          width: "",
          prop: "distribute_name",
          isShow: true,
          align: "center"
        },
        {
          id: "create_time",
          type: "",
          label: "添加时间",
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
            {
              id: "edit",
              name: "编辑",
              type: "primary"
            },
            {
              id: "jilu",
              name: "修改记录",
              type: "primary"
            }
            // {
            //   id: "del",
            //   name: "删除",
            //   type: "danger"
            // }
          ]
        }
      ],

      // 渠道商列表
      qudaoq: false,
      isZh: "",
      projectName: "",
      projectValue: "",
      qudaoLook: false, //查看渠道
      qudaoLookCreat: false,
      qudaoTitle: "",
      detailsInfo: {},
      layout: "inline",
      windowHeight: 0,

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
  watch: {
    project_id: async function(val) {
      if (val) {
        this.getParamss(val);
      }
    }
  },
  mounted() {
    this.getList();
    this.windowHeight = window.innerHeight - 400 + "px";
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
    async getParamss(val) {
      console.log("val", val);
      console.log("qudaoTitle", this.qudaoTitle);
      if (this.qudaoTitle == "新增") {
        try {
          let res = await defaultService({
            project_id: val
          });
          if (res.code == 0) {
            this.$message.success("默认配置获取成功");
            if (res.data) {
              this.qdArray = res.data;
            }else {
              this.qdArray = [];
            }
            
          } else {
            this.$message.error("默认配置获取成功");
          }
        } catch (error) {}
      }
    },
    // 重置条件
    reaseList() {
      console.log("重置");
      this.keywords = "";
      this.page = this.page;
      this.limit = 10;
      this.qdArray = [
        {
          order_type_id: "",
          team_id: "",
          project_id: "",
          value: "",
          type: "1",
          distribute_name: ""
        }
      ];
      this.project_id = "";
      this.team_id = "";
      this.getList();
    },
    // 新增
    async createAdd() {
      // 获取渠道商
      let res1 = await getTeams();
      console.log("res1", res1);
      if (res1.code == 0) {
        this.options = res1.data.rows;
      } else {
        this.$message.error("获取渠道商失败");
      }

      // 获取推广APP
      let res2 = await getProjects();
      console.log("res2", res2);
      if (res2.code == 0) {
        this.options1 = res2.data.rows;
      } else {
        this.$message.error("获取推广APP失败");
      }

      // 获取订单类型
      let res = await getOrderDtails();
      console.log("res", res);
      if (res.code == 0) {
        this.options3 = res.data.rows;
      } else {
        this.$message.error("获取订单类型失败");
      }
      this.qudaoLook = true;
      this.qudaoTitle = "新增";
    },
    // 新增确认
    async onSave() {
      console.log('this.qdArray1',this.qdArray1);
      console.log('this.qdArray',this.qdArray);

      const qdArrayPara = this.qdArray.concat(this.qdArray1);
      let ary2 = [];
      for (let val of qdArrayPara) {
        if (!ary2.some(item => item.order_type_id == val.order_type_id)) {
          ary2.push(val);
        }
      }

      console.log("this.qdArray", this.qdArray);
      if (this.qudaoTitle == "新增") {
        if (this.project_id && this.team_id) {
          ary2.map(item => {
            item.team_id = this.team_id;
            item.project_id = this.project_id;
          });
        }
        console.log("ary2", ary2);
        try {
          console.log("第一步");
          // getProjects
          let res = await batchSave1(ary2);
          if (res.code == 0) {
            this.$message.success(res.msg);
            this.qudaoLook = false;
            this.qudaoq = false;
            this.getList();
            this.project_id = "";
            this.team_id = "";
            this.qdArray = [
              {
                order_type_id: "",
                team_id: "",
                value: "",
                type: "1",
                distribute_name: "",
                project_id: ""
              }
            ];
            this.qdArray1 = [];
          } else {
            this.$message.error("新增失败");
          }
          console.log("第二步");
        } catch (error) {}
      } else if (this.qudaoTitle == "编辑") {
        console.log("id", id);
        console.log("index", ary2[index]);
        let res = await storeUpdate({
          id: id,
          type: 1,
          value: ary2[index].value,
          distribute_name: ary2[index].distribute_name
        });
        if (res.code == 0) {
          this.$message.success("编辑成功");
          this.getVersionList(1);
          this.qudaoLook = false;
        } else {
          this.$message(res.msg);
        }
      }
    },
    // 新增取消
    isShowClick() {
      console.log("this.page", this.page);
      this.team_id = "";
      this.project_id = "";
      this.order_type_id = "";
      this.projectValue = "";
      this.projectName = "";
      this.qudaoLook = false;
      this.reaseList();
      this.qdArray = [
        {
          order_type_id: "",
          team_id: "",
          value: "",
          type: "1",
          distribute_name: "",
          project_id: ""
        }
      ];
      this.qdArray1 = [];
    },
    // 动态添加平台释放佣金奖励
    async addP() {
      // 获取订单类型
      let res = await getOrderDtails();
      console.log("res", res);
      if (res.code == 0) {
        this.options4 = res.data.rows;
      } else {
        this.$message.error("获取订单类型失败");
      }
      this.qdArray1.push({
        order_type_id: "",
        team_id: this.team_id,
        value: "",
        type: "1",
        distribute_name: "",
        project_id: this.project_id
      });
      this.qudaoLook = true;
    },

    getVersionLists(val) {
      console.log(`每21111页 ${val} 条`);
      this.app.tableData.page = val;

      this.handleClick();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.app.tableData.limit = val;
      this.handleClick();
    },
    // 查看修订记录
    async handleClick(tab, event) {
      console.log(tab, event);
      console.log("888", this.projectId);
      console.log("activeName", this.teamId);
      if (this.activeName == "first") {
        const data = {
          project_id: this.projectId,
          team_id: this.teamId,
          keywords: "",
          page: this.app.tableData.page,
          limit: this.app.tableData.limit
        };
        let res = await getHistoryList(data);
        if (res.code == 0) {
          console.log("res", res);
          this.app.tableData.list = res.data.rows;
          this.app.tableData.pageNo = res.data.current_page;
          this.app.tableData.totalItem = res.data.total;
        } else {
          this.$message.error("平台分佣配置历史记录获取失败");
        }
      } else if (this.activeName == "second") {
        const data = {
          project_id: this.projectId,
          team_id: this.teamId,
          keywords: "",
          page: this.app.tableData.page,
          limit: this.app.tableData.limit
        };
        let res = await getAgentHistory(data);
        if (res.code == 0) {
          console.log("res", res);
          this.app.tableData.list = res.data.rows;
          this.app.tableData.pageNo = res.data.current_page;
          this.app.tableData.totalItem = res.data.total;
        } else {
          this.$message.error("平台分佣配置历史记录获取失败");
        }
      }
    },
    async deleItem(item) {
      this.qdArray = this.qdArray.filter(item1 => {
        return item1.order_type_id != item.order_type_id;
      });
      this.qdArray1 = this.qdArray1.filter(item1 => {
        return item1.order_type_id != item.order_type_id;
      });
      // let res = await saveUpDelete({
      //   id:item.id
      // })
      // if (res.code == 0) {
      //     this.$message.success("删除成功");
      //     this.getVersionList(1);
      //     this.qudaoLook = false;
      //   } else {
      //     this.$message(res.msg);
      //   }
    },

    async upd(id, index, params) {
      if (params == "5") {
        let res = await platBatchSave({
          project_id: this.qdArray1[index].project_id,
          team_id: this.qdArray1[index].team_id,
          order_type_id: this.qdArray1[index].order_type_id,
          type: 1,
          value: this.qdArray1[index].value,
          distribute_name: this.qdArray1[index].distribute_name
        });
        if (res.code == 0) {
          this.$message.success("新增成功");
          this.getList().then(async () => {
            console.log(this.myParamsId);
            console.log(this.myParamsIdTeam_id);
              let res = await getDistribute({
                project_id: this.myParamsId,
                team_id: this.myParamsIdTeam_id
              });
              console.log("res222", res);
              this.team_name = res.data.team_name;
              this.project_name = res.data.project_name;
              this.qdArray = res.data.config_list;
              this.detailsInfo = res.data;
              this.team_id = res.data.team_id; //渠道商
              this.project_id = res.data.project_id; //推广APP
              this.order_type_id = this.valuepa3; //订单类型
              this.projectName = this.projectName; //订单标题
              this.projectValue = this.projectValue; //平台释放奖励
          });

          this.qudaoLook = true;
          this.qdArray1 = [];
        } else {
          this.$message(res.msg);
        }
        return;
      }
      console.log("456789", this.qudaoTitle);
      if (this.qudaoTitle == "新增") {
        this.qudaoq = true;
      } else if (this.qudaoTitle == "编辑") {
        let res = await platDistributeSave({
          id: id,
          type: 1,
          value: this.qdArray[index].value,
          distribute_name: this.qdArray[index].distribute_name
        });
        if (res.code == 0) {
          this.$message.success("编辑成功");
          // this.reaseList();
          // this.getList()
          this.qudaoLook = true;
        } else {
          this.$message(res.msg);
        }
      }
    },
    //按钮
    handleEdit(item) {
      if (item.row == "details") {
        console.log("查看");
        console.log(item);
        this.details(item.index);
      } else if (item.row == "edit") {
        console.log("编辑");
        this.handleInfo(item.index);
      } else if (item.row == "jilu") {
        console.log("记录");
        this.onAccount(item.index);
      } else {
        console.log("删除");
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
      console.log('id',id);
      this.myParamsId = id.project_id;
      this.myParamsIdTeam_id = id.team_id;
      // 获取渠道商
      let res1 = await getTeams();
      console.log("res1", res1);
      if (res1.code == 0) {
        this.options = res1.data.rows;
      } else {
        this.$message.error("获取渠道商失败");
      }

      // 获取推广APP
      let res2 = await getProjects();
      console.log("res2", res2);
      if (res2.code == 0) {
        this.options1 = res2.data.rows;
      } else {
        this.$message.error("获取推广APP失败");
      }

      // 获取订单类型
      let res = await getOrderDtails();
      console.log("res", res);
      if (res.code == 0) {
        this.options3 = res.data.rows;
      } else {
        this.$message.error("获取订单类型失败");
      }
      this.myTD = id.id;
      console.log("id", id);
      this.qudaoLook = true;
      this.qudaoTitle = "编辑";
      try {
        let res = await getDistribute({
          project_id: id.project_id,
          team_id: id.team_id
        });
        console.log("res", res);
        this.team_name = res.data.team_name;
        this.project_name = res.data.project_name;
        this.qdArray = res.data.config_list;
        this.detailsInfo = res.data;
        this.team_id = res.data.team_id; //渠道商
        this.project_id = res.data.project_id; //推广APP
        this.order_type_id = this.valuepa3; //订单类型
        this.projectName = this.projectName; //订单标题
        this.projectValue = this.projectValue; //平台释放奖励
      } catch (error) {}
    },

    // 渠道列表查看
    async details(id) {
      // 获取渠道商
      let res1 = await getTeams();
      console.log("res1", res1);
      if (res1.code == 0) {
        this.options = res1.data.rows;
      } else {
        this.$message.error("获取渠道商失败");
      }

      // 获取推广APP
      let res2 = await getProjects();
      console.log("res2", res2);
      if (res2.code == 0) {
        this.options1 = res2.data.rows;
      } else {
        this.$message.error("获取推广APP失败");
      }

      // 获取订单类型
      let res = await getOrderDtails();
      console.log("res", res);
      if (res.code == 0) {
        this.options3 = res.data.rows;
      } else {
        this.$message.error("获取订单类型失败");
      }
      this.qudaoLook = true;
      this.qudaoTitle = "详情";
      try {
        let res = await getDistribute({
          project_id: id.project_id,
          team_id: id.team_id
        });
        this.tableDataArr = res.data.agent_list;
        console.log("res", res);
        this.team_name = res.data.team_name;
        this.project_name = res.data.project_name;
        this.qdArray = res.data.config_list;
        this.detailsInfo = res.data;
        this.team_id = res.data.team_id; //渠道商
        this.project_id = res.data.project_id; //推广APP
        this.order_type_id = this.valuepa3; //订单类型
        this.projectName = this.projectName; //订单标题
        this.projectValue = this.projectValue; //平台释放奖励
      } catch (error) {}
    },
    handleDialogClose3() {
      // this.$refs.multipleTable.resetFields()
      this.addEmpShow1 = false;
      this.limit = 10;
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
    clickExport() {
      const xlsxParam = {
        raw: true
      }; // 转换成excel时，使用原始的格式
      let wb = XLSX.utils.table_to_book(
        document.querySelector("#table_out"),
        xlsxParam
      ); // 这里就是表格
      // console.log(document.querySelector('#table_out'))
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: "application/octet-stream"
          }),
          "渠道商列表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
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
        let res = await yongjinList({
          keywords: this.keywords,
          page: this.page,
          limit: this.limit
        });
        if (res.code === 0) {
          this.allArray = res.data.rows;
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

    // 记录
    async onAccount(roleData) {
      console.log("roleData", roleData);
      this.dialogAccount = true;
      // this.accountData.role = roleData;
      this.projectId = roleData.project_id;
      this.teamId = roleData.team_id;
      this.handleClick();
    },
    // 记录关闭
    isAccount() {
      this.dialogAccount = false;
      this.accountData.role.project_id = "";
      this.accountData.role.team_id = "";
      this.app.tableData.page = 1;
      this.app.tableData.limit = 10;
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
.divbox {
  position: relative;
  width: 100%;
  .box-l {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    width: 150px;
    height: 50px;
    padding-right: 20px;
    line-height: 50px;
    font-weight: 700;
    text-align: right;
    border-right: transparent;
  }
  .box-r {
    // position: absolute;
    // top: 0;
    // left: 50%;
    // transform: translateX(-50%);
    margin-top: 20px;
    margin-left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    width: calc(80% - 150px);
    text-align: left;
    vertical-align: top;
    border: 1px solid#CCCCCC;
    padding: 20px 50px;
    .box1 {
      width: 100%;
      padding-top: 5px;
    }
  }
}
.btnAdd {
  margin-left: 190px;
  margin-top: 20px;
}
.cha {
  margin-left: 100%;
  font-size: 30px;
  cursor: pointer;
}
.spanman {
  position: relative;
  .spanman1 {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.zsh {
  margin: 20px 20px 40px 20px;
}
.btnq {
  margin-left: 30%;
}
</style>
