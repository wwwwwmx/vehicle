<template>
  <div>
    <h4>欢迎光临车辆管理系统,亲爱的管理员{{ username }}</h4>
    <h5>{{ $store.state.desc }}</h5>
  </div>
</template>

<script>
export default {
  name: "CommonHeader",
  data() {
    return {};
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
  },
};
</script>

<style scoped>
h4 {
  height: 10px;
  margin: 10px;
}
h5 {
  height: 10px;
  margin: 20px;
}
</style>