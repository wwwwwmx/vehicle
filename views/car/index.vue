<template>
  <div>
    <div style="margin-bottom: 15px">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select"
        ref="searchInp"
      >
        <el-button slot="append" icon="el-icon-search" @click="search"
          >搜索</el-button
        >
      </el-input>
      <!-- Button trigger modal -->
      <el-button
        type="button"
        class="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#myModal"
        @click="showAddForm"
      >
        新增
      </el-button>
      <!-- Modal -->
      <!-- 新增框 -->
      <el-dialog title="新增车辆" :visible="(dialogVisible = addBool)">
        <el-form :model="addForm" status-icon :rules="addRules" ref="addForm">
          <el-form-item
            label="车牌号"
            label-width="80px"
            prop="carId"
            class="carId"
          >
            <el-input
              type="input"
              v-model="addForm.carId"
              autocomplete="off"
              aria-placeholder="请输入车牌号"
            ></el-input
          ></el-form-item>
          <el-form-item
            label="出租时间"
            label-width="80px"
            prop="registerTime"
            class="registerTime"
          >
            <el-input
              type="text"
              v-model="addForm.registerTime"
              autocomplete="off"
              aria-placeholder="请输入出借时间"
            ></el-input
          ></el-form-item>
          <el-form-item
            label="出租时间"
            label-width="80px"
            prop="returnTime"
            class="returnTime"
          >
            <el-input
              type="text"
              v-model="addForm.returnTime"
              autocomplete="off"
              aria-placeholder="请输入返回时间"
            ></el-input></el-form-item
          ><el-form-item
            label="品牌"
            label-width="80px"
            prop="type"
            class="type"
          >
            <el-input
              type="text"
              v-model="addForm.type"
              autocomplete="off"
              aria-placeholder="请输入品牌"
            ></el-input
          ></el-form-item>
          <el-button class="button" @click="cancleAdd">取消</el-button>
          <el-button class="button" type="primary" @click="add"
            >保存信息</el-button
          >
        </el-form>
      </el-dialog>
    </div>
    <!-- //列表 -->
    <table border="1px" cellspacing="1">
      <tr>
        <td>车牌号</td>
        <td>租车日期</td>
        <td>还车日期</td>
        <td>品牌</td>
        <td>状态</td>
        <td>操作</td>
      </tr>
      <tr v-for="(item, index) in tableData" :key="item.id">
        <th>{{ item.carId }}</th>
        <th>{{ item.registerTime }}</th>
        <th>{{ item.returnTime }}</th>
        <th>{{ item.type }}</th>
        <th>{{ item.returnTime == "" ? 0 : 1 }}</th>
        <th>
          <button @click="handle(item.carId)">删除</button>
          <button type="text" @click="xiugai(index, item.carId)">修改</button>
        </th>
      </tr>
      <!-- 修改信息表 -->
      <el-dialog title="修改信息" :visible="(dialogVisible = bool)">
        <el-form :model="form" status-icon :rules="rules" ref="form">
          <el-form-item
            label="车牌号"
            label-width="80px"
            prop="carId"
            class="carId"
          >
            <el-input
              type="input"
              v-model="form.carId"
              autocomplete="off"
              aria-placeholder="请输入车牌号"
            ></el-input
          ></el-form-item>
          <el-form-item
            label="出租时间"
            label-width="80px"
            prop="registerTime"
            class="registerTime"
          >
            <el-input
              type="text"
              v-model="form.registerTime"
              autocomplete="off"
              aria-placeholder="请输入出借时间"
            ></el-input
          ></el-form-item>
          <el-form-item
            label="出租时间"
            label-width="80px"
            prop="returnTime"
            class="returnTime"
          >
            <el-input
              type="text"
              v-model="form.returnTime"
              autocomplete="off"
              aria-placeholder="请输入返回时间"
            ></el-input></el-form-item
          ><el-form-item
            label="品牌"
            label-width="80px"
            prop="type"
            class="type"
          >
            <el-input
              type="text"
              v-model="form.type"
              autocomplete="off"
              aria-placeholder="请输入品牌"
            ></el-input
          ></el-form-item>
          <el-button class="button" @click="cancle">取 消</el-button>
          <el-button class="button" type="primary" @click="confirm"
            >确 定</el-button
          >
        </el-form>
      </el-dialog>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyCar",
  data() {
    return {
      input: "",
      select: "",
      tableData: [],
      element: "",
      bool: false,
      addBool: false,
      index: "",
      updateCarId: "",
      form: {},
      addForm: {},
      timer: null,
      rules: {
        carId: [{ required: true, message: "请输入车牌号", trigger: "blur" }],
        registerTime: [
          { required: true, message: "请输入出租时间", trigger: "blur" },
        ],
        returnTime: [
          { required: true, message: "请输入返回时间", trigger: "blur" },
        ],
        type: [{ required: true, message: "请输入品牌", trigger: "blur" }],
      },
      addRules: {
        carId: [{ required: true, message: "请输入车牌号", trigger: "blur" }],
        registerTime: [
          { required: true, message: "请输入出租时间", trigger: "blur" },
        ],
        returnTime: [
          { required: true, message: "请输入返回时间", trigger: "blur" },
        ],
        type: [{ required: true, message: "请输入品牌", trigger: "blur" }],
      },
    };
  },
  mounted() {
    // 表中数据的呈现
    axios.get("http://localhost:8080/api/car").then(
      (response) => {
        this.tableData = response.data;
        response.data.forEach((element) => {
          this.element = element;
        });
      },
      (error) => {
        console.log("服务器获取数据失败" + error.message);
      }
    );
  },
  beforeDestroy() {
    this.stopTime();
  },
  methods: {
    //新增框的展示
    showAddForm() {
      this.addBool = true;
    },
    //新增车辆信息
    add() {
      axios
        .post("http://localhost:8080/api/addCarNum", { addForm: this.addForm })
        .then((value) => {
          console.log(value);
        })
        .catch((err) => {
          console.log(err);
        });
      this.addBool = false;
      this.setTime();
      this.addForm = {};
    },
    //取消添加
    cancleAdd() {
      this.addBool = false;
    },
    //修改框的展示
    xiugai(index, carId) {
      this.updateCarId = carId;
      this.bool = true;
      this.index = index;
      console.log(index);
    },
    //修改提交（有问题）
    confirm() {
      this.bool = false;
      //找出carid在数组的位置
      this.tableData.splice(this.index, 1, this.form);
      axios
        .post("http://localhost:8080/api/updateCar", {
          form: this.form,
          carId: this.updateCarId,
        })
        .then((value) => {
          console.log(value);
        })
        .catch((err) => {
          console.log(err);
        });
      this.setTime();
    },
    //修改取消
    cancle() {
      this.bool = false;
    },
    //删除
    handle(carId) {
      alert("删除成功"),
        axios
          .post("http://localhost:8080/api/deleteCar", {
            carId: carId,
          })
          .then((value) => {
            console.log(value);
          })
          .catch((error) => {
            console.log(error);
          });
      this.setTime();
    },
    //查找
    search() {
      let searchcarId = this.$refs.searchInp.value;
      axios
        .post("http://localhost:8080/api/searchCar", {
          carId: searchcarId,
        })
        .then((value) => {
          (this.tableData = []), this.tableData.push(value.data);
        })
        .catch((error) => {
          console.log(error);
        });
      this.stopTime();
    },
    setTime() {
      this.timer = setTimeout(() => {
        console.log(111);
        axios.get("http://localhost:8080/api/car").then(
          (response) => {
            this.tableData = response.data;
            response.data.forEach((element) => {
              this.element = element;
            });
          },
          (error) => {
            console.log("服务器获取数据失败" + error.message);
          }
        );
      }, 0);
    },
    stopTime() {
      clearInterval(this.timer);
      this.timer = null;
    },
  },
};
</script>
<style scoped>
.el-input {
  width: 350px;
  padding: 0px;
  margin: 0px;
}
.el-select {
  width: 100px;
}
.el-pagination {
  display: inline-block;
}
.button {
  display: inline-block;
  margin: 20px;
}
table {
  width: 100%;
}
td {
  width: 12.5%;
  height: 40px;
}
th {
  width: 12.5%;
  height: 40px;
  text-align: center;
}
a {
  margin-left: 5px;
}
.el-dialog {
  width: 500px;
  height: 350px;
  border-radius: 15px;
  border: 1px solid black;
  margin: 0 auto;
  padding: 10px;
}
.el-dialog__header {
  margin: 10px;
  padding: 0px;
}
.el-dialog__body {
  margin: 10px;
  padding: 0px;
}
</style>