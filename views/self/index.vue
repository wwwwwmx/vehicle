<template>
  <el-form ref="form" :model="sizeForm" size="mini">
    <el-form-item label="管理员昵称:">
      <el-input v-model="sizeForm.username"></el-input>
    </el-form-item>
    <el-form-item label="管理员密码:">
      <el-input v-model="sizeForm.password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="性别:">
      <el-radio-group v-model="sizeForm.resource" size="medium">
        <el-radio border label="男"></el-radio>
        <el-radio border label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="出生日期:">
      <el-date-picker
        type="date"
        placeholder="选择日期"
        v-model="sizeForm.birthday"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="入职日期:">
      <el-date-picker
        type="date"
        placeholder="选择日期"
        v-model="sizeForm.date"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="个性签名：">
      <el-input type="textarea" v-model="sizeForm.desc"></el-input>
    </el-form-item>
    <el-form-item size="large" class="btn">
      <el-button type="primary" @click="onSubmit" id="button"
        >立即创建</el-button
      >
      <el-button @click="cancel" id="button">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import axios from "axios";
export default {
  name: "MySelf",
  data() {
    return {
      sizeForm: {
        username: "",
        password: "",
        birthday: "",
        date: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      alert("成功保存您的信息");
      axios
        .post("http://localhost:8080/api/loginAdd", { sizeForm: this.sizeForm })
        .then(
          (value) => {
            if (value.data === "ok") {
              console.log("ok");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      this.sizeForm = {};
    },
    cancel() {
      this.sizeForm = {
        username: "",
        password: "",
        birthday: "",
        date: "",
        desc: "",
      };
    },
  },
};
</script>
<style scoped>
.year {
  width: 100%;
}
.el-select {
  margin: 0px;
  width: 500px;
  text-align: center;
}

.el-option {
  width: 500px;
}
.el-textarea {
  width: 800px;
}

.el-textarea__inner {
  padding: 5px 5px;
  height: 30px;
}
.el-button {
  margin: 10px;
}
.el-form {
  height: 500px;
  position: relative;
}
.btn {
  position: absolute;
  bottom: 50px;
  left: 50%;
}
</style>