<template>
  <div class="container">
    <el-row class="top" :gutter="10">
      <el-col :span="6">
        <div class="card-top">
          <p class="title">今年已缴费(元)</p>
          <p class="statistics">{{ topData.paymentAmount }}</p>
        </div>
      </el-col>
      <el-col :span="6"
        ><div class="card-top">
          <p class="title">未缴费(元)</p>
          <p class="statistics">{{ topData.notPaymentAmount }}</p>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="card-top">
          <p class="title">学生数量(人)</p>
          <p class="statistics">{{ topData.studentCount }}</p>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="card-top">
          <p class="title">在校职工(人)</p>
          <p class="statistics">{{ topData.userCount }}</p>
        </div></el-col
      >
    </el-row>
    <el-row class="statistic-box" :gutter="10">
      <el-col :span="3">
        <div class="card-top">
          <p class="statistics">{{ topData.schoolCampusCount }}</p>
          <p class="title">校区(个)</p>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="card-top">
          <p class="statistics">{{ topData.schoolCount }}</p>
          <p class="title">学校(个)</p>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="card-top">
          <p class="statistics">{{ topData.majorCount }}</p>
          <p class="title">专业(个)</p>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="card-top">
          <p class="statistics">{{ topData.classCount }}</p>
          <p class="title">班级(个)</p>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="card-top">
          <p class="statistics">{{ topData.inSchooleStudentCount }}</p>
          <p class="title">在校生(人)</p>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="card-top">
          <p class="statistics">{{ topData.suspenSchooleStudentCount }}</p>
          <p class="title">休学(人)</p>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="card-top">
          <p class="statistics">{{ topData.outSchooleStudentCount }}</p>
          <p class="title">退学(人)</p>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="card-top">
          <p class="statistics">{{ topData.graduateSchooleStudentCount }}</p>
          <p class="title">毕业(人)</p>
        </div>
      </el-col>
    </el-row>
    <el-row class="echarts-box">
      <el-col :span="24">
        <div class="echarts">
          <chart-block ref="chart9"></chart-block>
        </div>
      </el-col>
    </el-row>
    <el-row class="echarts-box" :gutter="10">
      <el-col :span="12">
        <div class="echarts">
          <chart-block ref="chart6"></chart-block>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="echarts">
          <chart-block ref="chart1"></chart-block>
        </div>
      </el-col>
    </el-row>
    <el-row class="echarts-box" :gutter="10">
      <el-col :span="8">
        <div class="echarts">
          <chart-block ref="chart5"></chart-block>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="echarts">
          <chart-block ref="chart2"></chart-block>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="echarts">
          <chart-block ref="chart8"></chart-block>
        </div>
      </el-col>
    </el-row>
    <el-row class="echarts-box" :gutter="10">
      <el-col :span="8">
        <div class="echarts">
          <chart-block ref="chart3"></chart-block>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="echarts">
          <chart-block ref="chart4"></chart-block>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="echarts">
          <chart-block ref="chart7"></chart-block>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// 职工统计 -- 饼状图
let option1 = {
  title: {
    text: "职工统计",
    // subtext: "职工统计",
    left: "center",
  },
  grid: {
    left: "3%",
    right: "3%",
    bottom: "3%",
    containLabel: true,
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    top: "bottom",
    data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
  },
  series: [
    {
      name: "占比统计",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};
// 在校学生 -- 堆叠柱状图
let option2 = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {},
  grid: {
    left: "3%",
    right: "3%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "Direct",
      type: "bar",
      emphasis: {
        focus: "series",
      },
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "Email",
      type: "bar",
      stack: "Ad",
      emphasis: {
        focus: "series",
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "Union Ads",
      type: "bar",
      stack: "Ad",
      emphasis: {
        focus: "series",
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Video Ads",
      type: "bar",
      stack: "Ad",
      emphasis: {
        focus: "series",
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "Search Engine",
      type: "bar",
      data: [862, 1018, 964, 1026, 1679, 1600, 1570],
      emphasis: {
        focus: "series",
      },
      markLine: {
        lineStyle: {
          type: "dashed",
        },
        data: [[{ type: "min" }, { type: "max" }]],
      },
    },
    {
      name: "Baidu",
      type: "bar",
      barWidth: 5,
      stack: "Search Engine",
      emphasis: {
        focus: "series",
      },
      data: [620, 732, 701, 734, 1090, 1130, 1120],
    },
    {
      name: "Google",
      type: "bar",
      stack: "Search Engine",
      emphasis: {
        focus: "series",
      },
      data: [120, 132, 101, 134, 290, 230, 220],
    },
    {
      name: "Bing",
      type: "bar",
      stack: "Search Engine",
      emphasis: {
        focus: "series",
      },
      data: [60, 72, 71, 74, 190, 130, 110],
    },
    {
      name: "Others",
      type: "bar",
      stack: "Search Engine",
      emphasis: {
        focus: "series",
      },
      data: [62, 82, 91, 84, 109, 110, 120],
    },
  ],
};
// 在校学生男女比例 -- 饼状图
let option3 = option1;
// 学生退学统计 -- 堆叠柱状图
let option4 = option2;
// 收费统计 -- 柱状图
let option5 = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "3%",
    right: "3%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "Direct",
      type: "bar",
      barWidth: "60%",
      data: [10, 52, 200, 334, 390, 330, 220],
    },
  ],
};
// 在校学生专业统计 -- 柱状图
let option6 = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "3%",
    right: "3%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "Direct",
      type: "bar",
      barWidth: "60%",
      data: [10, 52, 200, 334, 390, 330, 220],
    },
  ],
};
// 住校 / 走读比例 -- 饼状图
let option7 = option1;
// 宿舍入住率统计 -- 柱状+折线
let option8 = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  grid: {
    left: "3%",
    right: "3%",
    bottom: "3%",
    containLabel: true,
  },
  legend: {
    data: ["Evaporation", "Precipitation", "Temperature"],
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisPointer: {
        type: "shadow",
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "Precipitation",
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: "{value} ml",
      },
    },
    {
      type: "value",
      name: "Temperature",
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: "{value} °C",
      },
    },
  ],
  series: [
    {
      name: "Evaporation",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + " ml";
        },
      },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
      ],
    },
    {
      name: "Precipitation",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + " ml";
        },
      },
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
      ],
    },
    {
      name: "Temperature",
      type: "line",
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + " °C";
        },
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
    },
  ],
};
// 缴费统计 -- 柱状图
let option9 = option8;

import {
  indexBi,
  userBi,
  studentsInSchoolBi,
  lossStudentsBi,
  studentsSexBi,
  feeBi,
  studentsMajor,
  liveCampusBi,
  roomBi,
  paymentAmountBi,
} from "@/api/homePage.js";
export default {
  name: "HomePage",
  data() {
    return {
      // 顶部统计对象
      topData: {
        classCount: "0", //班级数
        graduateClassCount: "0", //毕业班级数
        undergraduateClassCount: "0", //未毕业班级数
        studentCount: "0", //学生数量
        inSchooleStudentCount: "0", //在校学生数量
        suspenSchooleStudentCount: "0", //休学学生数量
        graduateSchooleStudentCount: "0", //毕业学生数量
        outSchooleStudentCount: "0", //退学学生数量
        schoolCount: "0", //学校数量
        schoolCampusCount: "0", //校区数量

        majorCount: "4", //专业数量
        notPaymentAmount: "200.00", //未缴费金额
        paymentAmount: "1000.00", //缴费金额（本年）
        userCount: "17", //在校职工
      },
    };
  },
  created() {
    // 首页校区学生等统计数量
    this.getIndexBi();
    // 职工统计(饼状图)
    this.getUserBi();
    // 在校学生数量统计（堆叠柱状图）
    this.getStudentsInSchoolBi();
    // 学生退学统计（堆叠柱状图）
    this.getLossStudentsBi();
    // 在校学生男女比例统计(饼状图)
    this.getStudentsSexBi();
    // 收费统计（堆叠柱状图）
    this.getFeeBi();
    // 在校学生专业统计（柱状或折线图）
    this.getStudentsMajor();
    // 学生住校/走读比例统计（饼状图）
    this.getLiveCampusBi();
    // 学校宿舍统计（柱状+折线）
    this.getRoomBi();
    // 缴费统计（柱状图）
    this.getPaymentAmountBi();
  },
  mounted() {},
  methods: {
    // 首页校区学生等统计数量
    getIndexBi() {
      indexBi().then((res) => {
        this.topData = res.data.item;
      });
    },
    // 职工统计(饼状图)
    getUserBi() {
      userBi().then((res) => {
        option1 = res.data.item;
        this.$refs.chart1.setOption(option1);
      });
    },
    // 在校学生数量统计（堆叠柱状图）
    getStudentsInSchoolBi() {
      studentsInSchoolBi().then((res) => {
        option2 = res.data.item;
        this.$refs.chart2.setOption(option2);
      });
    },
    // 在校学生男女比例统计(饼状图)
    getStudentsSexBi() {
      studentsSexBi().then((res) => {
        option3 = res.data.item;
        this.$refs.chart3.setOption(option3);
      });
    },
    // 学生退学统计（堆叠柱状图）
    getLossStudentsBi() {
      lossStudentsBi().then((res) => {
        option4 = res.data.item;
        this.$refs.chart4.setOption(option4);
      });
    },
    // 收费统计（堆叠柱状图）
    getFeeBi() {
      feeBi().then((res) => {
        option5 = res.data.item;
        this.$refs.chart5.setOption(option5);
      });
    },
    // 在校学生专业统计（柱状或折线图）
    getStudentsMajor() {
      studentsMajor().then((res) => {
        option6 = res.data.item;
        this.$refs.chart6.setOption(option6);
      });
    },
    // 学生住校/走读比例统计（饼状图）
    getLiveCampusBi() {
      liveCampusBi().then((res) => {
        option7 = res.data.item;
        this.$refs.chart7.setOption(option7);
      });
    },
    // 学校宿舍统计（柱状+折线）
    getRoomBi() {
      roomBi().then((res) => {
        option8 = res.data.item;
        this.$refs.chart8.setOption(option8);
      });
    },
    // 缴费统计（柱状图）
    getPaymentAmountBi() {
      paymentAmountBi({ type: 4 }).then((res) => {
        option9 = res.data.item;
        this.$refs.chart9.setOption(option9);
      });
    },
  },
};
</script>

<style scoped lang="scss">
p {
  padding: 0;
  margin: 0;
}
.top {
  .card-top {
    background-color: #fff;
    border-radius: 3px;
    padding: 30px;
    box-sizing: border-box;
    .title {
      font-size: 16px;
      color: #6f6f6f;
    }
    .statistics {
      font-size: 22px;
      font-weight: 500;
      margin-top: 30px;
    }
  }
}
.statistic-box {
  margin-top: 10px;
  .card-top {
    background-color: #fff;
    border-radius: 3px;
    padding: 30px 0;
    box-sizing: border-box;
    text-align: center;
    .title {
      font-size: 14px;
      margin-top: 10px;
    }
    .statistics {
      font-size: 20px;
      font-weight: 500;
    }
  }
}
.echarts-box {
  margin-top: 10px;
  border-radius: 3px;
  box-sizing: border-box;
  .echarts {
    width: 100%;
    height: 300px;
    background-color: #fff;
    padding: 15px;
  }
}
</style>
