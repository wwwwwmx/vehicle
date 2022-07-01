<template>
  <el-container>
    <el-header v-show="this.$route.meta.show">
      <keep-alive><common-header></common-header></keep-alive>
    </el-header>
    <div>
      <el-aside width="200px" v-show="this.$route.meta.show">
        <keep-alive>
          <common-aside></common-aside>
        </keep-alive>
      </el-aside>

      <el-main>
        <keep-alive> <common-main></common-main></keep-alive
      ></el-main>
    </div>
  </el-container>
</template>

<script>
import CommonAside from "../src/components/CommonAside.vue";
import CommonHeader from "../src/components/CommonHeader.vue";
import CommonMain from "../src/components/CommonMain.vue";

export default {
  name: "MyMain",
  components: { CommonAside, CommonHeader, CommonMain },
};
</script>

<style scoped>
div {
  display: flex;
}
.el-header {
  background-image: linear-gradient(to right, pink, rgba(250, 218, 141, 0.8));
  color: white;
  text-align: center;
  line-height: 20px;
}

.el-aside {
  color: #333;
  text-align: center;
  display: inline-block;
  justify-content: flex-start;
  line-height: 100%;
}

.el-main {
  color: #333;
  background-image: linear-gradient(to right, pink, rgba(250, 218, 141, 0.8));
  text-align: center;
  justify-content: flex-start;
  display: inline-block;
  width: 1000px;
  height: 1000px;
}
</style>