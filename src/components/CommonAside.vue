<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <!-- @open="handleOpen"
    @close="handleClose" -->
    <h3>管理员系统</h3>
    <el-menu-item
      @click="clickChange(item)"
      v-for="item in menu"
      :key="item.path"
      :index="item.path"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {
      menu: [
        {
          name: "MyHome",
          path: "/home",
          label: "首页",
          url: "home/index",
          icon: "location",
        },
        {
          name: "MySelf",
          path: "/self",
          label: "个人管理",
          url: "self/index",
          icon: "menu",
        },
        {
          name: "MyUser",
          path: "/user",
          label: "用户管理",
          url: "user/index",
          icon: "document",
        },
        {
          name: "MyCar",
          path: "/car",
          label: "车辆管理",
          url: "car/index",
          icon: "setting",
        },
        {
          name: "MyPicture",
          path: "/picture",
          label: "图像展示",
          url: "picture/index",
          icon: "s-data",
        },
      ],
    };
  },
  methods: {
    //跳转到不同的url
    clickChange(item) {
      this.$router.push({
        name: item.name,
      });
    },
  },
};
</script>

<style scoped>
.el-menu {
  height: 100%;
  background-color: rgba(252, 157, 152, 0.5);
}
</style>