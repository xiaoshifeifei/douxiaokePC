<template>
  <div class="login-container">
    <div class="container_box">
      <div class="container_left"></div>
      <div class="container_right">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">抖小客后台管理系统</h3>
            <h6 class="title-b">HAIZHILIAO SYSTEM</h6>
          </div>
          <el-form-item prop="AdminName">
            <p>账号</p>
            <el-input
              ref="username"
              v-model="loginForm.AdminName"
              placeholder="请输入用户名"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
          <!-- <el-tooltip
            v-model="capsTooltip"
            content="Caps lock is On"
            placement="right"
            manual
          > -->
          <el-form-item prop="AdminPassword">
            <p>密码</p>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.AdminPassword"
              show-password
              placeholder="请输入登录密码"
              name="password"
              tabindex="2"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <!-- </el-tooltip> -->
          <el-row type="flex">
            <el-button
              :loading="loading"
              type="primary"
              style="width:100%;padding:15px;background-color: #409EFF;border-color: #409EFF;"
              @click.native.prevent="handleLogin"
              >登 录</el-button
            >
          </el-row>
        </el-form>
      </div>
    </div>

    <div class="footer-text">
      <div>
        请使用Chrome浏览器以获得最佳使用体验
      </div>
      <div style="margin-top:10px;">Copyright @ 知了科技</div>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { firstLoginState } from "@/api/firstLogin.js";
import { getOrderReminder } from "@/api/navBar.js";

export default {
  name: "Login",
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入账号"));
      } else {
        return callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码有误，请重新输入"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        AdminName: "",
        AdminPassword: ""
      },
      loginRules: {
        AdminName: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        AdminPassword: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    // eslint-disable-next-line camelcase
    const { status, uid, token, refresh_token } = this.$route.query;
    if (status === "1") {
      this.$store
        .dispatch("user/loginByScanCode", {
          // eslint-disable-next-line camelcase
          uid,
          token,
          refresh_token
        })
        .then(res => {
          this.$router.push({
            path: this.redirect || "/"
          });
          this.$store.dispatch("wsdata/getRemindInfo");
        })
        .catch(err => {
          console.log(err);
        });
    } else if (status === "-1") {
      this.$message.warning("未绑定微信号");
      this.$router.replace({ path: this.$route.path });
    } else if (status === "0") {
      this.$message.error("帐号已禁用");
      this.$router.replace({ path: this.$route.path });
    }
  },
  mounted() {
    if (this.loginForm.AdminName === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.AdminPassword === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    useWxLogin() {
      let baseUrl = process.env.VUE_APP_BASE_API;
      let appid = process.env.VUE_APP_APPID;

      let redirect_uri = encodeURIComponent(`${baseUrl}/wechat/auth`);
      let href = `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_login&state=#wechat_redirect`;
      location.href = href;
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
            sessionStorage.setItem("getRealName",this.loginForm.AdminName)
              // 抖登录
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
              this.loading = false;


              // // this.getRemindInfo()
              // this.$store.dispatch("wsdata/getRemindInfo");
              // firstLoginState().then(res => {
              //   let step = res.data.step;
              //   switch (step) {
              //     case -1:
              //     case 6:
              //       this.$router.push({
              //         path: this.redirect || "/",
              //         query: this.otherQuery
              //       });

              //       break;

              //     default:
              //       this.$router.replace({ path: "/setup" });
              //       break;
              //   }
              //   this.loading = false;
              // });
            })
            .catch(err => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="scss">
.icon-wx {
  width: 30px;
}
.login-container {
  position: relative;
  background-position: center;
  background-size: 100%;
  height: 100%;
  background-color: #f1f1f1;
  background-image: linear-gradient(to right, #5d80fe, #56c9ff);
  min-width: 1450px;
  min-height: 720px;
  overflow: hidden;
  .container_box {
    position: relative;
    top: 10%;

    .container_left {
      display: inline-block;

      min-width: 800px;
      min-height: 670px;
      margin-left: 14%;
      background-image: url("../../assets/loginImg/login_bg.png");
      background-size: 100% 100%;
    }
    .container_right {
      vertical-align: top;
      display: inline-block;
      min-width: 380px;
      min-height: 264px;
      margin-top: 200px;
      background: #fff;
      border-radius: 6px;
      padding: 0px 40px 20px 40px;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;

      .el-form {
        .el-form-item {
          // margin-bottom: 20px;
          p {
            color: gray;
          }
        }
      }
      .zlLogo {
        width: 17px;
        height: 27px;
        vertical-align: bottom;
      }
      .title-container {
        border-bottom: 1px solid #ccc;
        padding: 15px 0;
        .title {
          font-size: 25px;
          text-align: center;
        }
        .title-b {
          text-align: center;
          padding-top: 10px;
        }
      }
    }
    .container_foot {
      position: absolute;
      width: 100%;
      text-align: center;
      color: gray;
      font-size: 15px;
      bottom: 3vh;
    }
  }
  .footer-text {
    width: 100%;
    position: absolute;
    color: white;
    bottom: 1.5vh;
    text-align: center;
  }
}
</style>
