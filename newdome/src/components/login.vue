<template>
  <section class="loginClass clearfix">
    <el-card class="loginDiv">
      <h2 class="loginTitle">系统登录</h2>
      <el-form :model="loginObj" class="loginForm">
        <el-form-item label="登录账号">
          <el-input v-model="loginObj.user" placeholder="学号" clearable></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input type="password" v-model="loginObj.password" placeholder="密码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginFunction">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>
<script>
import { login } from "@/api/api";
export default {
  data() {
    return {
      loginObj: {
        user: "",
        password: ""
      }
    };
  },
  methods: {
    loginFunction() {
      login({
        userId: this.loginObj.user,
        passWord: this.loginObj.password
      }).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
        this.resetSetItem("token", res.data.token);
        sessionStorage.setItem("userId", res.data.userId);
        sessionStorage.setItem("userName", res.data.userName);
        this.$router.push({
          name: "home",
          params:{userRouter:res.data.userRouter}
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.loginClass {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../assets/img/bg.jpg");
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;

  .loginDiv {
    margin: 0;
    width: 380px;
    height: 250px;
    padding: 40px 20px;
    box-shadow: 0 0 20px 2px #1f1f1f;
    border-radius: 5px;
    .loginTitle {
      font-size: 28px;
      font-weight: 400;
      text-align: center;
    }
    .loginForm {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      padding-top: 30px;
      .el-form-item {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        width: 340px;
        .el-input {
          width: 210px;
        }
      }
      .el-button {
        width: 300px;
      }
    }
  }
}
</style>
