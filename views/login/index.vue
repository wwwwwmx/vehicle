<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h4 class="login_title">系统登录</h4>
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        autocomplete="off"
        aria-placeholder="请输入账号"
      ></el-input
    ></el-form-item>
    <el-form-item
      label="密码"
      label-width="80px"
      prop="password"
      class="password"
    >
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        aria-placeholder="请输入密码"
      ></el-input
    ></el-form-item>
    <el-form-item>
      <!-- <div id="remeber">
        <input type="checkbox" name="" placeholder="记住我" /><span
          >记住我</span
        >
      </div> -->
    </el-form-item>
    <el-form-item class="login_submit"
      ><el-button
        native-type="submit"
        type="primary"
        @click="login"
        class="login_submit"
        >登录</el-button
      ></el-form-item
    ></el-form
  >
</template>

<script>
import axios from "axios";
export default {
  name: "MyLogin",
  data() {
    return {
      form: {},
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          { min: 3, message: "用户名长度不能小于三位", trigger: "blur" },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          { min: 3, message: "密码长度不能小于三位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:8080/api/login", {
          form: this.form,
        })
        .then((value) => {
          console.log(value);
          if (value.data) {
            this.$router.push("/home");
            this.$store.commit("change", value.data.username);
            this.$store.commit("changeDesc", value.data.desc);
            // console.log(value.data.username);
          }
          // if (remeber.checked) {
          //   this.$router.push("/home");
          // }
          if (value.data === "密码错误") {
            this.$router.push({ name: "MyLogin" });
            alert("输入错误"), (this.form = {});
          }
        });
    },
  },
};
</script>

<style scoped>
.el-form {
  width: 400px;
  height: 300px;
  border-radius: 10%;
  border: 1px solid green;
  position: relative;
  margin: 0 auto;
}
.el-input {
  width: 300px;
  height: 30px;
}
span {
  font-size: 20px;
}
h4 {
  margin: 20px;
}
#remeber {
  margin-right: 80px;
}
.el-button {
  margin-right: 80px;
}
</style>