<template>
  <div>
    <!-- <h4>各品牌车销售状况图</h4> -->
    <div style="width: 1000px; height: 400px" id="main" ref="main"></div>
  </div>
</template>

<script>
import axios from "axios";
//通过this.$echarts来使用
export default {
  name: "MyPicture",
  data() {
    return {
      xData: [],
      sData: [],
      tData: [],
    };
  },
  mounted() {
    axios.get("http://localhost:8080/api/car").then(
      (response) => {
        response.data.forEach((element) => {
          this.tData.push(element.type);
        });
        this.tData = this.sum(this.tData);
        this.tData.forEach((element) => {
          this.xData.push(element.split(":")[0]);
          this.sData.push(element.split(":")[1]);
        });
        this.echartsInit();
      },
      (error) => {
        console.log("错误啦" + error.message);
      }
    );
  },
  methods: {
    //初始化echarts
    echartsInit() {
      //柱形图
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(this.$refs.main).setOption({
        xAxis: {
          type: "category",
          data: this.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.sData,
            type: "bar",
            color: "rgba(174, 221, 129, 0.8)",
            showBackground: true,
          },
        ],
      });
    },
    sum(arr) {
      var ary = [];
      arr.sort(); //排个序
      for (var i = 0; i < arr.length; ) {
        var count = 0;
        for (var b = i; b < arr.length; b++) {
          if (arr[i] == arr[b]) {
            count++;
          }
        }
        ary.push([arr[i], count]);
        i += count;
      }
      var are = [];
      for (i = 0; i < ary.length; i++) {
        are.push(ary[i][0] + ":" + ary[i][1]);
      }
      return are;
    },
  },
};
</script>
<style scoped>
canvas {
  width: 1000px;
}
</style>
