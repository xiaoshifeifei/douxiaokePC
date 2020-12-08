<!--
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-17 09:22:09
 * @LastEditors: ldh
 * @LastEditTime: 2020-07-23 10:43:22
-->
<template>
  <div class="page-container">
    <el-card>
      <el-row class="top-row" :gutter="20">
        <el-col :span="6">
          <el-input
            v-model="keywords"
            prefix-icon="el-icon-search"
            placeholder="输入帐号名称/角色名称/创建人搜索"
          ></el-input>
        </el-col>
        <el-col :span="1.5">
          <el-button type="primary" @click="getTableList" icon="el-icon-search"
            >查询</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            @click="
              () => {
                keywords = '';
                getTableList();
              }
            "
            >重置条件</el-button
          >
        </el-col>
        <el-col :span="1.5" style="float:right">
          <el-button type="primary" @click="openCreatePannel"
            >创建管理员</el-button
          >
        </el-col>
      </el-row>
    </el-card>

    <el-card ref="tablecard">
      <el-table
        :height="maxHeight"
        :data="tableData.rows"
        @selection-change="tableSelectionChange"
        :header-row-class-name="tableRowClassName"
        border
      >
        <el-table-column
          type="selection"
          min-width="55"
          align="center"
          :resizable="false"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="账号名"
          min-width="100"
          align="center"
          :resizable="false"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          min-width="100"
          align="center"
          :resizable="false"
        >
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="所属角色"
          min-width="100"
          align="center"
          :resizable="false"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="RoleName"
          label="帐号状态"
          min-width="100"
          align="center"
          :resizable="false"
        >
          <template slot-scope="scope">
            <div class="status-wrapper">
              <div
                class="status-text"
                :class="{ active: scope.row.AdminStatus }"
              >
                {{ scope.row.AdminStatus ? "启用" : "禁用" }}
              </div>
              <el-switch
                :value="!!scope.row.AdminStatus"
                @change="onAccountStatusChange($event, scope.row)"
              >
              </el-switch>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="100"
          align="center"
          :resizable="false"
        >
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="更新时间"
          min-width="100"
          align="center"
          :resizable="false"
        >
        </el-table-column>

        <el-table-column
          prop="edits"
          label="操作"
          align="center"
          min-width="130"
          fixed="right"
          :resizable="false"
        >
          <template slot-scope="scope">
            <el-button
              class="btn-action"
              @click="openAccountEditor(scope.row)"
              size="mini"
              type="primary"
              >编辑
            </el-button>

            <el-button
              class="btn-action"
              @click="onDeleteAccount(scope.row)"
              size="mini"
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-card> -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableData.current_page"
        :page-sizes="tableData.limitList"
        :page-size="tableData.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
      >
      </el-pagination>
      <!-- </el-card> -->
    </el-card>

    <!-- 创建编辑管理员帐号 -->
    <el-dialog
      :title="actionType === 0 ? '创建帐号' : '帐号编辑'"
      @close="resetAccountForm"
      width="40%"
      :visible.sync="showCreatePannel"
    >
      <el-form
        ref="accountForm"
        label-width="80px"
        :rules="rules"
        :model="accountInfo"
      >
        <!-- <el-form-item label="帐号名" prop="adminName">
          <el-input
            placeholder="请输入帐号名称"
            v-model="accountInfo.adminName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input
            placeholder="请输入真实姓名"
            v-model="accountInfo.realName"
          ></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="所属角色" prop="roleID">
          <el-select v-model="accountInfo.roleID" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.RoleID"
              :label="item.RoleName"
              :value="item.RoleID"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="帐号类型" prop="adminType" v-if="actionType===0">
                    <el-select placeholder="请选择" v-model="accountInfo.adminType">
                        <el-option
                            v-for="item in accountType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> -->
        <!-- 创建帐号 密码 -->
        <template v-if="actionType === 0">
          <el-form-item label="账号名" prop="adminName">
            <el-input
              placeholder="请输入账号名称"
              v-model="accountInfo.adminName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="realName">
            <el-input
              placeholder="请输入真实姓名"
              v-model="accountInfo.realName"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="adminPassword">
            <el-input
              placeholder="请输入密码"
              type="password"
              v-model="accountInfo.adminPassword"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              placeholder="请输入密码"
              type="password"
              v-model="accountInfo.confirmPassword"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
        </template>

        <!-- <el-form-item label="手机号" prop="tel">
          <el-input
            placeholder="请输入手机号"
            v-model="accountInfo.tel"
          ></el-input>
        </el-form-item>  -->
        <!-- 编辑帐号密码 -->
        <template v-if="actionType === 1">
          <el-form-item label="账号名" prop="adminName">
            <el-input
              disabled
              placeholder="请输入账号名称"
              v-model="accountInfo.adminName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="realName">
            <el-input
              placeholder="请输入真实姓名"
              v-model="accountInfo.realName"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="adminPassword2">
            <el-input
              placeholder="请输入密码"
              type="password"
              v-model="accountInfo.adminPassword2"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword2">
            <el-input
              placeholder="请输入密码"
              type="password"
              v-model="accountInfo.confirmPassword2"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
        </template>
        <!-- <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入描述"
            v-model="accountInfo.remark"
          ></el-input>
        </el-form-item>  -->
        <el-form-item>
          <el-button @click="resetAccountForm">取消</el-button>
          <el-button
            v-if="actionType === 0"
            type="primary"
            @click="onCreateAccount"
            >保存</el-button
          >
          <el-button v-else type="primary" @click="onSaveAccount"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAccountList,
  createAccount,
  updateAccount,
  getAccountInfo,
  deleteAccount,
  GetTableList,
  updateAccountStatus
} from "@/api/jurisdiction";
import { validatePassword } from "@/utils/validate";
export default {
  data() {
    /*
     * let passwordReg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/
     * 创建帐号时 密码较验
     */
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 8 || value.length > 16) {
        callback(new Error("密码长度为8-16位"));
      } else if (!validatePassword(value)) {
        callback(new Error("密码8-16位为写字母 数字 特殊符号组合"));
      } else {
        if (this.accountInfo.confirmPassword !== "") {
          this.$refs.accountForm.validateField("confimPassword");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.accountInfo.adminPassword) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    // 编辑时 密码较验
    let validatePassOnEdit = (rule, value, callback) => {
      if (!value && !this.accountInfo.confirmPassword2) return callback();
      if (value.length < 8 || value.length > 16) {
        callback(new Error("密码长度为8-16位"));
      } else if (!validatePassword(value)) {
        callback(new Error("密码8-16位为写字母 数字 特殊符号组合"));
      } else {
        if (this.accountInfo.confirmPassword2 !== "") {
          this.$refs.accountForm.validateField("confimPassword2");
        }
        callback();
      }
    };
    let validatePassOnEdit2 = (rule, value, callback) => {
      if (!value && !this.accountInfo.adminPassword2) return callback();
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.accountInfo.adminPassword2) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    let validateTel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (value.length !== 11) {
        callback(new Error("请输入11位手机号"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("手机号有误"));
      } else {
        callback();
      }
    };

    return {
      maxHeight: 0,
      actionType: 0, // 0 创建 1 保存
      showCreatePannel: false,
      keywords: "",
      tableData: {
        // eslint-disable-next-line camelcase
        current_page: 1,
        rows: [],
        total: 0,
        // eslint-disable-next-line camelcase
        total_page: 1,
        limitList: [10, 20, 50, 100],
        list: 20,
        limit: 10
      },
      accountInfo: {
        RoleName: "",
        adminID: "",
        adminName: "",
        adminPassword: "",
        adminPassword2: "",
        confirmPassword: "",
        confirmPassword2: "",
        roleID: "",
        adminType: "", // 账户类型 1: 平台管理员 2:酒店管理员
        tel: "",
        realName: "",
        remark: ""
      },
      rules: {
        adminName: [
          {
            required: true,
            message: "请输入账号名称"
          },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符"
          }
        ],
        roleID: [
          {
            required: true,
            message: "请选择忾所属角色",
            trigger: "blur"
          },
          {
            required: true,
            trigger: "blur"
          }
        ],
        adminType: [
          {
            required: true,
            message: "请选择帐号类型",
            trigger: "blur"
          },
          {
            required: true,
            trigger: "blur"
          }
        ],
        adminPassword: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        adminPassword2: [
          {
            validator: validatePassOnEdit,
            trigger: "blur"
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
          },
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        confirmPassword2: [
          {
            validator: validatePassOnEdit2,
            trigger: "blur"
          }
        ],
        realName: [
          {
            required: true,
            message: "请输入真实姓名"
          },
          {
            min: 2,
            max: 20,
            message: "长度在 3 到 20 个字符"
          }
        ],
        tel: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            validator: validateTel,
            trigger: "blur"
          }
        ]
      },
      roleList: [],
      accountType: [
        {
          label: "平台管理员",
          value: 1
        },
        {
          label: "酒店管理员",
          value: 2
        }
      ]
    };
  },
  mounted() {
    this.getTableList();
    this.$nextTick(function() {
      this.maxHeight =
        window.innerHeight - this.$refs.tablecard.$el.offsetTop - 200;
      window.onresize = () => {
        this.maxHeight =
          window.innerHeight - this.$refs.tablecard.$el.offsetTop - 120;
      };
    });
  },
  methods: {
    // 获取帐号列表
    getTableList() {
      this.$nextTick(async () => {
        try {
          let res = await getAccountList({
            keywords: this.keywords,
            page: this.tableData.current_page,
            limit: 10
          });
          console.log("res", res.data.rows);

          if (res.code === 0) {
            if (res.data.rows.length > 0) {
              console.log("111");
              res.data.rows.forEach(item => {
                if (item.role_name == null) {
                  item.role_name = "暂无角色";
                }
              });
            }

            this.tableData = {
              ...this.tableData,
              ...res.data
            };
          } else {
            this.$message.error("获取管理员列表失败");
          }
        } catch (error) {
          this.$message.error("获取管理员列表失败");
        }
      });
    },
    // 获取角色列表
    async getRoleList(params) {
      try {
        let res = await GetTableList({
          keywords: "",
          page: 1,
          limit: 500
        });
        if (res.code === 0) {
          this.roleList = res.data.rows;
          if (params == 1) {
            this.accountInfo = {};
            this.accountInfo.adminPassword2 = "";
            this.accountInfo.realName = "";
            this.accountInfo.confirmPassword2 = "";
            this.accountInfo.adminPassword = "";
            this.accountInfo.adminName = "";
          }
        }
      } catch (error) {
        this.$message.error("获取角色列表失败");
      }
    },
    // 获取帐号信息
    async getAccountById(id) {
      try {
        let res = await getAccountInfo(id);
        if (res.code === 0) {
          // const {
          //   accountInfo
          // } = this;
          // Object.keys(accountInfo).forEach(key => {
          //   let resKey = key.slice(0, 1).toUpperCase() + key.slice(1);
          //   this.accountInfo[key] = res.data[resKey];
          // });
          // this.accountInfo = {}
          this.accountInfo.adminPassword2 = "";
          this.accountInfo.realName = "";
          this.accountInfo.adminName = "";
          this.accountInfo.confirmPassword2 = "";
          this.accountInfo.adminPassword = "";
        }
      } catch (error) {
        this.$message.error("获取帐号信息失败");
      }
    },
    tableSelectionChange() {},
    handleSizeChange(value) {
      this.tableData.limit = +value;
      this.getTableList();
    },
    handleCurrentChange(value) {
      // eslint-disable-next-line camelcase
      this.tableData.current_page = +value;
      this.getTableList();
    },
    // 打开创建帐号 面板
    openCreatePannel() {
      this.showCreatePannel = true;
      this.actionType = 0;
      if (!this.roleList.length) {
        this.getRoleList(1);
      }
    },
    // 打开编辑帐号 面板
    openAccountEditor(rowData) {
      console.log("rowData", rowData);
      this.accountInfo.adminName = rowData.username;
      this.accountInfo.realName = rowData.name;
      this.accountInfo.adminID = rowData.id;
      this.showCreatePannel = true;
      this.actionType = 1;
      this.getAccountById(rowData.id);
      if (!this.roleList.length) {
        this.getRoleList();
      }
    },
    // 重置表单
    resetAccountForm() {
      this.accountInfo = {};
      this.$refs.accountForm.resetFields();
      this.showCreatePannel = false;
    },
    // 创建帐号
    onCreateAccount() {
      this.$refs.accountForm.validate(async valid => {
        if (!valid) return;
        try {
          let res = await createAccount({
            username: this.accountInfo.adminName,
            name: this.accountInfo.realName,
            password: this.accountInfo.adminPassword,
            confirm_password: this.accountInfo.confirmPassword,
            status: 1
            //   id: this.accountInfo.roleID || null,
            // Tel: this.accountInfo.tel,
            // AdminType: 1,
            // Remark: this.accountInfo.remark
          });
          if (res.code === 0) {
            this.$message.success("帐户创建成功");
            this.resetAccountForm();
            this.$refs.accountForm.resetFields();
            this.showCreatePannel = false;
            this.getTableList();
          } else {
            this.$message.error("帐户创建失败");
          }
        } catch (error) {
          this.$message.error("帐户创建失败");
        }
      });
    },
    // 保存帐号修改
    onSaveAccount() {
      this.$refs.accountForm.validate(valid => {
        if (!valid) return;
        this.$confirm("确认要保存对该帐号的修改吗？", "提示", {
          type: "warning"
        }).then(async () => {
          try {
            let res = await updateAccount({
              id: this.accountInfo.adminID,
              name: this.accountInfo.realName,
              password: this.accountInfo.adminPassword2,
              confirm_password: this.accountInfo.confirmPassword2,
              status: 1
              // RoleID: this.accountInfo.roleID,
              // Tel: this.accountInfo.tel,

              // Remark: this.accountInfo.remark
            });
            if (res.code === 0) {
              this.$message.success("帐号保存成功");
              this.resetAccountForm();
              this.showCreatePannel = false;
              this.getTableList();
            } else {
              this.$message.success("帐号保存失败");
            }
          } catch (error) {
            this.$message.success("帐号保存失败");
          }
        });
      });
    },
    // 删除帐号
    onDeleteAccount(rowData) {
      this.$confirm("确认要删除该帐号吗", "提示", {
        type: "warning"
      }).then(async () => {
        try {
          let res = await deleteAccount(rowData.id);
          if (res.code === 0) {
            this.$message.success("删除帐号成功");
            this.getTableList();
          } else {
            this.$message.success("删除帐号失败");
          }
        } catch (error) {
          this.$message.success("删除帐号失败");
        }
      });
    },
    // 启用 禁用状态
    async onAccountStatusChange(status, rowData) {
      console.log(status, rowData);
      let res = await updateAccountStatus({
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

<style lang="scss" scope>
.page-container {
  height: 100%;
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

.warning-row .is-leaf {
  color: #1a68b5;
  background-color: #e3edf7 !important;
  opacity: 0.8;
}
</style>
