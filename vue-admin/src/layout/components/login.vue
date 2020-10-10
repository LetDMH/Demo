<template>
  <div class="login-page">
    <transition name="form-fade" mode="in-out">
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        class="login-form"
      >
        <div class="title">
          <h3>登陆页面</h3>
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            type="text"
            v-model="loginForm.username"
            placeholder="用户名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="password"
            :type="passwordType"
            v-model="loginForm.password"
            placeholder="密码"
            autocomplete="off"
            @keyup.enter.native="handleLogin"
          ></el-input>
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="handleLogin"
          >登陆</el-button
        >
      </el-form>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码必须大于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "111111",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  methods: {
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
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$router.push('/');
          // this.$store
          //   .dispatch("login", this.loginForm)
          //   .then(() => {
          //     this.$router.push('/home');
          //     this.loading = false;
          //   })
          //   .catch(() => {
          //     this.loading = false;
          //   });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login-page {
  background-color: #283443;
  height: 100%;
  width: 100%;
  .login-form {
    width: 450px;
    padding-top: 160px;
    margin: 0 auto;
    overflow: hidden;
    .title {
      font-size: 26px;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
      margin-bottom: 22px;
      .svg-container {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
      }
      .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: #889aa4;
        cursor: pointer;
        user-select: none;
      }
    }
    .el-button {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      border: 1px solid #dcdfe6;
      transition: 0.1s;
      font-weight: 500;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
      background-color: #409eff;
      border-color: #409eff;
      color: #606266;
      font-size: 16px;
      &:hover {
        background: #66b1ff;
        border-color: #66b1ff;
        color: #fff;
      }
    }
  }
}
</style>
<style lang="scss">
.el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    position: relative;
    .el-input__inner {
      background: transparent;
      border: 0px;
      line-height: 40px;
      border-radius: 0px;
      // padding: 12px 5px 12px 15px;
      color: #fff;
      caret-color: #fff;
      box-sizing: border-box;
      outline: none;
      font-size: 14px;
    }
  }
}
</style>