<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />
    <!-- <div class="fuzhou">{{getDian}}</div> -->

    <div class="right-menu">
      <el-button class="refresh-btn" @click="refreshHandle" circle></el-button>
      <!-- <i class="el-icon-service service-btn" @click="service"></i> -->
      <el-badge :value="totalRemind" :max="0" class="item">
        <i
          class="el-icon-message-solid message-btn"
          @click="toggleMessageBox"
          ref="messageBtn"
        ></i>
      </el-badge>
      <!-- <div ref="messageBox" class="message-box" v-show="messageBoxState">
        <div class="message-title">
          <span class="left">订单提醒:</span>
          <span class="right" @click="messageBoxState = false">X</span>
        </div>
        <div class="message-body">
          <div
            @click="
              linkTo(
                '/bookingService/continuationOrder',
                'remindCountOfContinueLive'
              )
            "
            v-show="navBarData.remindCountOfContinueLive"
          >
            <i class="icon"></i> 续住有
            <span>{{ navBarData.remindCountOfContinueLive }}</span
            >个订单待处理
          </div>
          <div
            @click="
              linkTo('/bookingService/facilityOrder', 'remindCountOfFacility')
            "
            v-show="navBarData.remindCountOfFacility"
          >
            <i class="icon"></i> 设施预定有
            <span>{{ navBarData.remindCountOfFacility }}</span
            >个订单待处理
          </div>
          <div
            @click="
              linkTo('/bookingService/billingManager', 'remindCountOfInvoice')
            "
            v-show="navBarData.remindCountOfInvoice"
          >
            <i class="icon"></i> 开票有
            <span>{{ navBarData.remindCountOfInvoice }}</span
            >个订单待处理
          </div>
          <div
            @click="linkTo('/bookingService/wakeUpServe', 'remindCountOfWake')"
            v-show="navBarData.remindCountOfWake"
          >
            <i class="icon"></i> 叫醒有
            <span>{{ navBarData.remindCountOfWake }}</span
            >个订单待处理
          </div>
          <div
            @click="
              linkTo('/bookingService/rentCarOrder', 'remindCountOfRentCar')
            "
            v-show="navBarData.remindCountOfRentCar"
          >
            <i class="icon"></i> 租车有
            <span>{{ navBarData.remindCountOfRentCar }}</span
            >个订单待处理
          </div>
          <div @click="goToClear">
            <i class="icon"></i> 清扫有
            <span>{{ navBarData.remindCountOfClear }}</span
            >个订单待处理
          </div>
          <div @click="goToRepair">
            <i class="icon"></i> 维修有
            <span>{{ navBarData.remindCountOfRepair }}</span
            >个订单待处理
          </div>
          <div @click="goToService">
            <i class="icon"></i> 客房服务有
            <span>{{ navBarData.remindCountOfService }}</span
            >个订单待处理
          </div>
          <div @click="goToCheckOut">
            <i class="icon"></i> 一键退房有
            <span>{{ navBarData.remindCountOfCheckOut }}</span
            >个订单待处理
          </div>
        </div>
      </div> -->
      <!-- <img
        :src="avatar+'?imageView2/1/w/80/h/80'"
        class="user-avatar"
      >-->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <!-- <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>-->
          <div>
            <el-dropdown-item
              ><span>姓名: </span
              ><span> {{ adminNameParams }}</span></el-dropdown-item
            >
          </div>
          <div>
            <el-dropdown-item
              ><span>角色名称:</span> {{ rolesParams }}</el-dropdown-item
            >
          </div>
          <div @click="passwordDialog = true">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </div>
          <el-dropdown-item divided @click.native="logout">
            <el-dropdown-item style="margin:auto">退出</el-dropdown-item>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="username">{{ adminNameParams }}</span>
    </div>
    <el-dialog
      width="600px"
      :visible="passwordDialog"
      title="修改密码"
      append-to-body
      :before-close="onResetPasswordForm"
    >
      <el-form
        label-width="100px"
        :model="password"
        :rules="passwordRules"
        ref="password"
      >
        <el-form-item label="旧密码" prop="AdminPassword">
          <el-input
            type="password"
            placeholder="请输入旧密码"
            v-model="password.AdminPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="NewAdminPassword">
          <el-input
            type="password"
            placeholder="请输入新密码"
            v-model="password.NewAdminPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="ConfirmNewAdminPassword">
          <el-input
            type="password"
            placeholder="请再次输入新密码"
            v-model="password.ConfirmNewAdminPassword"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onResetPasswordForm">取 消</el-button>
        <el-button type="primary" @click="onSaveNewPass">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { updatePassword } from "@/api/user.js";
import { Loading } from "element-ui";
import {
  createSocket,
  sendWSPush,
  oncloseWS,
  onmessageWS,
  onerrorWS,
  refreshToken
} from "@/api/webSocket.js";
import socket from "@/api/_socket";
import { getOrderReminder } from "@/api/navBar.js";
import { getToken, getUid } from "@/utils/auth.js";
import { validatePassword } from "@/utils/validate";
export default {
  data() {
    // let passwordReg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/
    let validateNewPass = (rule, value, cb) => {
      if (value === "") {
        cb(new Error("请输入新密码"));
      } else if (value.length < 8 || value.length > 16) {
        cb(new Error("密码长度为8-16位"));
      } else if (!validatePassword(value)) {
        cb(new Error("密码必须字母、数字、符号组合"));
      } else {
        if (this.password.ConfirmNewAdminPassword !== "") {
          this.$refs.password.validateField("ConfirmNewAdminPassword");
        }
        cb();
      }
    };
    let validateNewConfirm = (rule, value, cb) => {
      if (value === "") {
        cb(new Error("请再次输入新密码"));
      } else if (value !== this.password.NewAdminPassword) {
        cb(new Error("两次输入密码不一致"));
      } else {
        cb();
      }
    };
    return {
      getDian: "",
      password: {
        AdminPassword: "",
        NewAdminPassword: "",
        ConfirmNewAdminPassword: ""
      },
      passwordRules: {
        AdminPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min: 8, max: 16, message: "密码长度为8-16位", trigger: "blur" }
        ],
        NewAdminPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: validateNewPass, trigger: "blur" }
        ],
        ConfirmNewAdminPassword: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: validateNewConfirm, trigger: "blur" }
        ]
      },
      passwordDialog: false,
      messageBoxState: false,
      remindCount: 0,
      remindCountOfClear: 0, // 清扫
      remindCountOfRepair: 0, // 修理
      remindCountOfService: 0, // 客房服务
      remindCountOfCheckOut: 0, // 退房
      CleanOrderIDs: [], // 清扫
      repairOrderIDs: [], // 修理
      serviceOrderIDs: [], // 客房服务
      CheckOutOrderIDs: [] // 退房
    };
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  created() {
    this.adminNameParams = sessionStorage.getItem("getRealName");
    this.rolesParams = sessionStorage.getItem("getRoleName");
    const getInfoParams = 1;
    console.log("getInfoParams", getInfoParams);
    this.getDian = sessionStorage.getItem("getJiu");
    console.log("this.getDian", this.getDian);
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "adminName", "name"]),
    navBarData() {
      return this.$store.state.wsdata.navBarData;
    },
    avatar() {
      let url =
        this.$store.state.user.userInfo.Headimgurl ||
        require("@/icons/avatar.png");
      return url;
    },
    /*
     * adminName() {
     *   return this.$store.state.user.adminName
     * },
     */
    totalRemind() {
      let total = 0;
      Object.keys(this.$store.state.wsdata.navBarData).forEach(key => {
        total += this.$store.state.wsdata.navBarData[key];
      });
      return total;
    }
  },
  // computed: {
  //   title() {
  //     return this.$store.state.user.userInfo.HotelName || ''
  //   }
  // },
  methods: {
    //  关闭并重置 密码表单
    onResetPasswordForm() {
      this.$refs.password.resetFields();
      this.passwordDialog = false;
    },
    // 保存新密码
    onSaveNewPass() {
      this.$refs.password.validate(async valid => {
        if (!valid) return;
        let loading = Loading.service();
        try {
          let res = await updatePassword({
            AdminPassword: this.password.AdminPassword,
            NewAdminPassword: this.password.NewAdminPassword
          });
          if (res.code === 0) {
            this.$message.success("修改密码成功");
            this.onResetPasswordForm();
            oncloseWS();
            window.removeEventListener("onmessageWS", this.getDataFunc);
            const info = {
              userkey: localStorage.getItem("userKey")
            };

            this.$store.dispatch("user/logout", info).then(() => {
              this.$router.push("/login");
            });
          }
        } catch (error) {
          console.log(error);
        }
        setTimeout(() => {
          loading.close();
        }, 500);
      });
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    logout() {
      let self = this;
      this.$confirm("您确定要退出吗?", "退出管理平台", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        // oncloseWS()
        window.removeEventListener("onmessageWS", this.getDataFunc);
        // const info = {
        //   userkey: localStorage.getItem("userKey")
        // };
        let uid=getUid();
        console.log(uid)
        // console.log(info)
        self.$store.dispatch("user/logout", uid).then(() => {
          self.$router.push("/login");
          location.reload();
        });
      });
    },
    refreshHandle() {
      location.reload();
    },
    service() {
      console.log("service");
    },
    message() {
      console.log("message");
    },
    toggleMessageBox() {
      this.messageBoxState = !this.messageBoxState;
    },
    /**
     * 订单提醒 点击
     * @param {String} path 路由
     * @param {String} key 订单类型
     */
    linkTo(path, key) {
      this.$router.push({ path });
      this.messageBoxState = false;
      let oldNavBarData = this.navBarData;
      oldNavBarData[key] = 0;
      this.privateDispatch(oldNavBarData);
    },
    goToClear() {
      this.$router.push({ path: "/bookingService/cleanOrder" });
      this.messageBoxState = false;
      let oldNavBarData = this.navBarData;
      oldNavBarData.remindCountOfClear = 0;
      this.privateDispatch(oldNavBarData);
    },
    goToRepair() {
      this.$router.push({ path: "/bookingService/repairOrder" });
      this.messageBoxState = false;
      let oldNavBarData = this.navBarData;
      oldNavBarData.remindCountOfRepair = 0;
      this.privateDispatch(oldNavBarData);
    },
    goToService() {
      this.$router.push({ path: "/bookingService/roomServiceOrder" });
      this.messageBoxState = false;
      let oldNavBarData = this.navBarData;
      oldNavBarData.remindCountOfService = 0;
      this.privateDispatch(oldNavBarData);
    },
    goToCheckOut() {
      this.$router.push({ path: "/bookingService/checkOutOrder" });
      this.messageBoxState = false;
      let oldNavBarData = this.navBarData;
      oldNavBarData.remindCountOfCheckOut = 0;
      this.privateDispatch(oldNavBarData);
    },
    getDataFunc(e) {
      let data = JSON.parse(e.detail.data.data);
      if (data.type === "ping") return;
      if (data.code === -1) {
        return refreshToken().then(() => {
          createSocket();
        });
      }
      let channel = data.channel;
      let msg = "";
      let reminds = this.$store.state.wsdata.navBarData;
      let oldStatisticsData = this.$store.state.wsdata.homePageData;
      switch (channel) {
        // 续住订单
        case "TOPIC_CONTINUE_LIVE_ORDER":
          reminds.remindCountOfContinueLive++;
          oldStatisticsData.ContinueLiveOrder.HandleOrderCount++;
          oldStatisticsData.ContinueLiveOrder.TodayOrderCount++;
          oldStatisticsData.ContinueLiveOrder.ThisWeekOrderCount++;
          msg = "续住";
          break;
        // 退房订单
        case "TOPIC_CKECKOUT_ORDER":
          oldStatisticsData.CheckOutOrder.HandleOrderCount++;
          oldStatisticsData.CheckOutOrder.TodayOrderCount++;
          oldStatisticsData.CheckOutOrder.ThisWeekOrderCount++;
          reminds.remindCountOfCheckOut++;
          msg = "退房";
          // this.privateDispatch(oldStatisticsData)
          break;
        // 客房服务订单
        case "TOPIC_SERVICE_ORDER":
          oldStatisticsData.ServiceOrder.HandleOrderCount++;
          oldStatisticsData.ServiceOrder.TodayOrderCount++;
          oldStatisticsData.ServiceOrder.ThisWeekOrderCount++;
          reminds.remindCountOfService++;
          msg = "客房服务";
          // this.privateDispatch(oldStatisticsData)
          break;
        // 开票订单
        case "TOPIC_INVOICE_ORDER":
          oldStatisticsData.InvoiceOrder.HandleOrderCount++;
          oldStatisticsData.InvoiceOrder.TodayOrderCount++;
          oldStatisticsData.InvoiceOrder.ThisWeekOrderCount++;
          reminds.remindCountOfInvoice++;
          msg = "开票";
          // this.privateDispatch(oldStatisticsData)
          break;
        // 清扫订单
        case "TOPIC_CLEAN_ORDER":
          oldStatisticsData.CleanOrder.HandleOrderCount++;
          oldStatisticsData.CleanOrder.TodayOrderCount++;
          oldStatisticsData.CleanOrder.ThisWeekOrderCount++;
          reminds.remindCountOfClear++;
          msg = "清扫";
          // this.privateDispatch(oldStatisticsData)
          break;
        // 维修订单
        case "TOPIC_REPAIR_ORDER":
          oldStatisticsData.RepairOrder.HandleOrderCount++;
          oldStatisticsData.RepairOrder.TodayOrderCount++;
          oldStatisticsData.RepairOrder.ThisWeekOrderCount++;
          reminds.remindCountOfRepair++;
          msg = "维修";
          // this.privateDispatch(oldStatisticsData)
          break;
        // 租车订单
        case "TOPIC_RENT_CAR_ORDER":
          msg = "租车";
          reminds.remindCountOfRentCar++;
          oldStatisticsData.RentCarOrder.HandleOrderCount++;
          oldStatisticsData.RentCarOrder.TodayOrderCount++;
          oldStatisticsData.RentCarOrder.ThisWeekOrderCount++;
          break;
        // 叫醒订单
        case "TOPIC_WAKE_ORDER":
          msg = "叫醒";
          reminds.remindCountOfWake++;
          oldStatisticsData.WakeOrder.HandleOrderCount++;
          oldStatisticsData.WakeOrder.TodayOrderCount++;
          oldStatisticsData.WakeOrder.ThisWeekOrderCount++;
          break;
        // 酒店设施订单
        case "TOPIC_FACILITY_ORDER":
          msg = "酒店设施";
          reminds.remindCountOfFacility++;
          oldStatisticsData.FacilityOrder.HandleOrderCount++;
          oldStatisticsData.FacilityOrder.TodayOrderCount++;
          oldStatisticsData.FacilityOrder.ThisWeekOrderCount++;
          break;
        default:
          break;
      }
      this.privateDispatch(reminds);
      this.dispatchStatistics(oldStatisticsData);
      if (msg) {
        this.$notify({
          title: "提示",
          message: `您有一个新的${msg}订单需要处理`,
          type: "warning"
        });
      }
    },
    privateDispatch(value) {
      this.$store.dispatch("wsdata/changeState", {
        key: "navBarData",
        value
      });
    },
    dispatchStatistics(value) {
      this.$store.dispatch("wsdata/changeState", {
        key: "homePageData",
        value
      });
    }
    /*
     * changeRemindData(e) {
     *   let channel = e.detail.data
     *   let oldNavBarData = this.navBarData
     *   switch (channel) {
     *   case 'TOPIC_CLEAN_ORDER':
     *     oldNavBarData.remindCountOfClear--
     *     this.privateDispatch(oldNavBarData)
     *     break
     *   case 'TOPIC_REPAIR_ORDER':
     *     oldNavBarData.remindCountOfRepair--
     *     this.privateDispatch(oldNavBarData)
     *     break
     *   case 'TOPIC_SERVICE_ORDER':
     *     oldNavBarData.remindCountOfService--
     *     this.privateDispatch(oldNavBarData)
     *     break
     *   case 'TOPIC_CKECKOUT_ORDER':
     *     oldNavBarData.remindCountOfCheckOut--
     *     this.privateDispatch(oldNavBarData)
     *     break
     *   default:
     *     break
     *   }
     * }
     */
    /*
     * async getRemindInfo() {
     *   let res = await getOrderReminder()
     *   let resData = res.data
     *   let obj = {
     *     remindCountOfClear: Number(resData.Handle.CleanOrder.OrderCount) || 0,
     *     remindCountOfRepair: Number(resData.Handle.RepairOrder.OrderCount) || 0,
     *     remindCountOfService:
     *       Number(resData.Handle.ServiceOrder.OrderCount) || 0,
     *     remindCountOfCheckOut:
     *       Number(resData.Handle.CheckOutOrder.OrderCount) || 0
     *   }
     *   this.$store.dispatch('wsdata/changeState', {
     *     key: 'navBarData',
     *     value: obj
     *   })
     * }
     */
  },
  mounted() {
    // socket.init();
    // this.getRemindInfo()
    this.$store.dispatch("wsdata/getRemindInfo");
    // createSocket()
    let token = getToken();
    let that = this;
    window.addEventListener("onmessageWS", this.getDataFunc);
    // window.addEventListener('onRefreshRemind', this.changeRemindData)
    this.$nextTick(() => {
      document.body.addEventListener("click", e => {
        let ev = e || event;
        ev.stopPropagation();
        try {
          if (
            ev.target !== this.$refs.messageBtn &&
            !this.$refs.messageBox.contains(ev.target)
          ) {
            this.messageBoxState = false;
          }
        } catch (error) {
          error;
        }
      });
    });
  }
};
</script>

<style lang="scss">
.navbar {
  height: 50px;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  min-width: 500px;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .el-badge {
    border: none;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    padding-top: 5px;
    position: relative;
    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-left: 30px;
      margin-right: 5px;
    }
    .service-btn {
      cursor: pointer;
      display: inline-block;
      width: 30px;
      height: 100%;
      vertical-align: top;
      font-size: 20px;
      line-height: 30px;
      padding-top: 10px;
    }
    .el-badge {
      vertical-align: top;
      height: 80%;
      margin-top: 10px;
      .message-btn {
        cursor: pointer;
        display: inline-block;
        width: 30px;
        height: 100%;
        vertical-align: top;
        font-size: 20px;
        line-height: 30px;
        text-align: right;
      }
    }
    .username {
      height: 90%;
      display: inline-block;
      vertical-align: top;
      line-height: 40px;
      margin-right: 20px;
    }
    .refresh-btn {
      vertical-align: top;
      background-image: url("../../icons/refresh.png");
      background-size: 100% 100%;
      margin-top: 10px;
      margin-right: 20px;
      border: none;
    }
    .message-box {
      user-select: none;
      width: 330px;
      // height: 182px;
      position: absolute;
      background-color: white;
      top: 42px;
      left: -260px;
      box-shadow: 0px 0px 10px 2px rgb(189, 189, 189);
      padding: 10px;
      z-index: 100;
      .message-title {
        height: 30px;
        & > span {
          display: inline-block;
          font-weight: bold;
          width: 91px;
          height: 22px;
          line-height: 22px;
          vertical-align: top;
        }
        .right {
          text-align: right;
          float: right;
          cursor: pointer;
        }
      }
      .message-body {
        & > div {
          width: 293px;
          height: 25px;
          box-shadow: 0px 0px 10px 1px rgb(221, 221, 221);
          margin: 5px auto;
          border-radius: 5px;
          line-height: 25px;
          padding-left: 10px;
          span {
            font-size: 20px;
            font-weight: bold;
            color: #faad14;
          }
          .icon {
            display: inline-block;
            width: 14px;
            height: 14px;
            background-size: 100% 100%;
            background-image: url("../../icons/wow.png");
          }
        }
        & > div:nth-of-type(1) {
          .icon {
            background-image: url("../../icons/err.png");
          }
          span {
            color: #f5222d;
          }
        }
        & > div:nth-of-type(2) {
          .icon {
            background-image: url("../../icons/wow.png");
          }
          span {
            color: #faad14;
          }
        }
        & > div:nth-of-type(3) {
          .icon {
            background-image: url("../../icons/info.png");
          }
          span {
            color: #1890ff;
          }
        }
        & > div:nth-of-type(4) {
          .icon {
            background-image: url("../../icons/yes.png");
          }
          span {
            color: #52c41a;
          }
        }
      }
    }
    &:focus {
      outline: none;
    }

    // .right-menu-item {
    //   display: inline-block;
    //   padding: 0 8px;
    //   height: 100%;
    //   font-size: 18px;
    //   color: #5a5e66;
    //   vertical-align: text-bottom;

    //   &.hover-effect {
    //     cursor: pointer;
    //     transition: background 0.3s;

    //     &:hover {
    //       background: rgba(0, 0, 0, 0.025);
    //     }
    //   }
    // }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.user-dropdown {
  top: 40px !important;
}

.el-dropdown-menu__item {
  text-align: center;
}
.fuzhou {
  float: left;
  height: 50px;
  width: calc(100% - 700px);
  margin: auto;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-weight: 700;
}
</style>
