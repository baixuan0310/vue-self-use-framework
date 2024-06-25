<template>
  <div>
    <ul
      class="leftbox"
      @mouseenter="enter"
      @mouseleave="leave"
      :style="{
        width: width,
        'background-image': `url(${vuexCommon.MenuImg}`,
        color: `${vuexCommon.leftBoxColor}`,
      }"
      style="transition: width 0.5s"
    >
      <div
        class="title_box"
        v-if="vuexCommon.menuItem && vuexCommon.menuItem.meta"
      >
        {{ vuexCommon.menuItem.meta.title }}
      </div>
      <li
        v-for="(item, index) in vuexCommon.menuItem.children"
        v-show="!item.hidden && vuexCommon.menuItem.children"
        :key="index"
        @click="go(item.path)"
        :style="{
          backgroundColor:
            vuexCommon.nowPath == item.path ? 'rgba(255, 255, 255, .2)' : '',
        }"
      >
        <i
          class="el-icon-s-shop svg-icon"
          :style="{ color: vuexCommon.leftBoxColor }"
        ></i>
        <span v-if="checkShow1 && item && item.meta">{{
          item.meta.title
        }}</span>
      </li>
      <div
        class="bottom_box"
        v-if="checkNum == 1 || checkNum == 2"
        @click="checkBox"
      >
        <i
          class="el-icon-s-fold"
          title="收起菜单栏"
          v-if="checkNum == 1"
          :style="{ color: `${vuexCommon.leftBoxColor}` }"
        ></i>
        <i
          class="el-icon-s-unfold"
          :style="{ color: `${vuexCommon.leftBoxColor}` }"
          v-if="checkNum == 2"
        ></i>
      </div>
      <div class="bottom_box" v-else @click="regularBox">
        <i
          class="el-icon-s-operation"
          title="固定菜单栏"
          :style="{ color: `${vuexCommon.leftBoxColor}` }"
        ></i>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LeftBox",

  data() {
    return {
      width: "220px",
      checkNum: 1 /* 状态为1的时候宽为220px 为2的时候宽为64px */,
      checkShow1: true /* 控制所有状态的显示隐藏 */,
    };
  },

  mounted() {},
  computed: {},
  methods: {
    go(url) {
      if (url) {
        this.$setVuex("vuexCommon.nowPath", url);
        this.$router.push(url);
      }
    },
    // 点击切换菜单时
    checkBox() {
      // 状态为1的时候展开状态 宽为220px
      if (this.checkNum == 1) {
        (this.width = "64px"), //设置整体盒子 宽为64px
          (this.checkShow1 = false); //控制所有该隐藏的隐藏
        this.checkNum = 2; // 设置状态为2
      } else if (this.checkNum == 2) {
        //判断状态为2的时候闭合状态 宽为64px
        this.width = "220px"; //设置整体盒子 宽为220px
        this.checkNum = 1; // 设置状态为1
        this.checkShow1 = true; //控制所有显示
      }
    },
    // 鼠标移入事件
    enter() {
      if (this.checkNum == 2) {
        //判断状态为2的时候闭合状态 宽为64px
        this.width = "220px"; //设置整体盒子 宽为220px
        this.checkNum = 3; // 设置状态为3
        setTimeout(() => {
          this.checkShow1 = true; //控制所有显示
        }, 200);
      }
    },
    // 鼠标移出事件
    leave() {
      if (this.checkNum == 3) {
        //此时鼠标移入事件已将状态修改为3
        this.width = "64px"; //设置整体盒子 宽为64px
        this.checkShow1 = false; //控制所有该隐藏的隐藏
        this.checkNum = 2; //设置状态为2
      }
    },
    // 点击固定侧边栏
    regularBox() {
      this.checkShow1 = true; //控制所有显示
      this.checkNum = 1; // 设置状态为1 恢复初始状态
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-icon {
  font-size: 12px;
  margin-right: 6px;
  color: rgba(255, 255, 255, 0.8) !important;
}

.leftbox {
  height: calc(100vh - 60px);
  overflow-y: hidden;
  overflow-x: auto;
  padding-top: 30px !important;
  color: rgba(255, 255, 255, 0.8);
  position: relative;
  background-size: cover;
  .title_box {
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    padding-left: 22px;
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  li {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 25px;

    span {
      margin-left: 10px;
      font-size: 14px;
    }
  }

  li:hover {
    background-color: rgba(255, 255, 255, 0.2) !important;
  }

  .bottom_box {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .bottom_box:hover {
    background-color: rgba(255, 255, 255, 0.2) !important;
    color: #fff !important;
  }
}
</style>
