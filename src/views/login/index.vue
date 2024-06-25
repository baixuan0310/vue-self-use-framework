<template>
  <div class="login">
    <div class="formBack">
      <div class="title">龙翔学生管理系统</div>
      <div class="form-card">
        <img src="@/assets/login/left.png" alt="" />
        <div class="line"></div>
        <div class="form">
          <div class="welcome">
            <div>欢迎登录</div>
          </div>
          <el-form
            ref="ruleForm"
            size="small"
            :model="ruleForm"
            :rules="rules"
            class="ruleForm"
            @submit.native.prevent
            :show-message="false"
          >
            <el-form-item prop="account" class="account">
              <div class="icon" :class="nowCheck == 'account' ? 'active' : ''">
                <i class="el-icon-user"></i>
                <div class="right-line"></div>
              </div>
              <el-input
                v-model.number="ruleForm.account"
                placeholder="请输入用户名"
                @focus="nowCheck = 'account'"
                @blur="nowCheck = ''"
              />
            </el-form-item>
            <el-form-item prop="password" class="password">
              <div class="icon" :class="nowCheck == 'password' ? 'active' : ''">
                <i class="el-icon-lock"></i>
                <div class="right-line"></div>
              </div>
              <el-input
                v-model="ruleForm.password"
                type="password"
                autocomplete="off"
                show-password
                placeholder="请输入密码"
                @keyup.enter.native="submitForm"
                @focus="nowCheck = 'password'"
                @blur="nowCheck = ''"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                class="login"
                type="primary"
                :loading="btn_loading"
                @click="submitForm"
                >立即登录</el-button
              >
              <div class="check-admin-href">
                <el-link type="primary" :href="childLink" target="_blank"
                  >登录子后台</el-link
                >
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Login, getMyMenuData } from "@/api/login.js";
import { setToken } from "@/utils/auth.js";
export default {
  name: "Login",
  computed: {},
  data() {
    return {
      childLink: process.env.VUE_APP_BASE_API + "lx_child/login",
      btn_loading: false,
      // 当前选中的输入框
      nowCheck: "",
      ruleForm: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "change" }],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    // 登录
    submitForm() {
      if (!this.ruleForm.account || !this.ruleForm.password) {
        return this.$message.msgError("账号或密码都不能为空");
      }
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          let data = {
            account: this.ruleForm.account,
            password: this.ruleForm.password,
          };
          Login(data).then((res) => {
            setToken(res.data.token);
            this.$setVuex("vuexUser.info", {
              account: res.data.account,
              name: res.data.name,
            });
            this.$router.push("/");
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.check-admin-href {
  text-align: center;
}
.ruleForm .password {
  margin-top: 28px !important;
}
.password .icon i,
.password .icon .right-line {
  margin-top: 5px;
}
.password input {
  padding-bottom: 26px !important;
}
::v-deep .el-input input {
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #eaeaea;
  padding-left: 45px;
  font-size: 15px;
  padding: 28px 0;
  padding-left: 72px;
  padding-bottom: 20px;
  -webkit-box-shadow: 0 0 0 1000px #fff inset;
  &:focus {
    border: none !important;
    border-radius: 0;
    border-bottom: 1px solid #5ea3f8 !important;
  }
}
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/login/back.jpg") no-repeat center;
  background-size: cover;
  position: relative;
  .formBack {
    width: 1155px;
    height: 581px;
    background: url("../../assets/login/formBack.png");
    background-size: cover;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    .title {
      font-size: 57px;
      color: #fff;
      margin-top: -114px;
      font-weight: 500;
      letter-spacing: 6.5px;
      margin-left: 362px;
    }
    .form-card {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      margin-top: 50px;
      img {
        width: 408px;
        margin-left: 134px;
        margin-top: -50px;
      }
      .line {
        width: 1px;
        height: 80%;
        background: -webkit-linear-gradient(
          top,
          #fff -4%,
          #dfdfdf 50%,
          #fff 100%
        );
        margin-left: 20px;
        margin-right: 42px;
      }
      .form {
        width: 395px;
        height: 100%;
        .welcome {
          width: 100%;
          border-bottom: 1px solid #e9e9e9;
          div {
            width: 60%;
            margin: auto;
            margin-bottom: -1px;
            letter-spacing: 1px;
            padding: 20px 0;
            margin-top: 80px;
            color: #4e8cf6;
            text-align: center;
            border-bottom: 1px solid #529af6;
            font-size: 25px;
          }
        }
        .ruleForm {
          margin-top: 60px;
          overflow: hidden;
          .account,
          .password {
            position: relative;
            .icon {
              height: 100%;
              position: absolute;
              z-index: 9;
              left: 0;
              top: 0;
              display: flex;
              align-items: center;
              padding-left: 10px;
              font-size: 23px;
              margin-left: 8px;
              i {
                color: #d5d5d5;
              }
              .right-line {
                background-color: #d5d5d5;
                margin-left: 11px;
                width: 2px;
                height: 43%;
              }
            }
            .active {
              i {
                color: #4e8cf6;
              }
              .right-line {
                background-color: #4e8cf6;
              }
            }
          }
          .password {
            margin-top: 20px;
          }
          .login {
            display: block;
            margin: 79px auto;
            margin-bottom: 10px;
            width: 225px;
            border: none !important;
            padding: 21px 0;
            border-radius: 33px;
            letter-spacing: 2px;
            box-shadow: 0px 0px 10px -2px #3d7bf6;
            background: linear-gradient(to right, #3e7af4, #4390f7);
            font-size: 16px;
            letter-spacing: 3px;
          }
        }
      }
    }
  }
}
</style>
