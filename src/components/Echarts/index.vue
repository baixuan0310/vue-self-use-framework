<template>
  <div ref="chartEl" style="height: 100%"></div>
</template>
<script>
import throttle from "lodash/throttle";
import echarts from "./echarts-config.js";
const ChartBlock = {
  name: "ChartBlock",
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    option: {
      handler(newValue, oldValue) {
        this.chart.setOption(newValue);
      },
      deep: true,
    },
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chartEl);
    // 添加窗口改变监听
    this.chart._resize = throttle(() => {
      this.chart.resize();
    }, 500);

    window.addEventListener("resize", this.chart._resize);
  },
  methods: {
    setOption(option) {
      this.chart && this.chart.setOption(option);
    },
  },
  beforeDestroy() {
    // 移除窗口改变监听
    window.removeEventListener("resize", this.chart._resize);
  },
};

/* 注册组件的方法 */
ChartBlock.install = (Vue) => {
  Vue.component(ChartBlock.name, ChartBlock);
};
export default ChartBlock;
</script>
