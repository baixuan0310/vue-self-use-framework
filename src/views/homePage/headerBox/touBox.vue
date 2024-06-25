<template>
  <div>
    <div class="box" :style="{ background: vuexCommon.headerBg }">
      <div class="box_img">
        <img src="@/assets/menu/logo.png" alt="" srcset="" />
      </div>
      <el-tooltip class="item" effect="dark" content="首页" placement="bottom">
        <i
          class="el-icon-s-home lei"
          :style="{ color: `${vuexCommon.headerColor}` }"
          @click="$router.push('/')"
        ></i>
      </el-tooltip>
      <el-tooltip
        class="item"
        v-if="vuexCommon.menuType != 0"
        effect="dark"
        :content="
          vuexCommon.leftBoxHide == true ? '隐藏左侧菜单栏' : '显示左侧菜单栏'
        "
        placement="bottom"
      >
        <i
          class="el-icon-s-fold lei"
          v-if="vuexCommon.leftBoxHide == true"
          @click="onHide"
          :style="{ color: `${vuexCommon.headerColor}` }"
        ></i>
        <i
          class="el-icon-s-unfold lei"
          v-else
          @click="onHide"
          :style="{ color: `${vuexCommon.headerColor}` }"
        ></i>
      </el-tooltip>
      <el-tooltip
        v-if="false"
        class="item"
        effect="dark"
        content="常用菜单"
        placement="bottom"
        style="margin-right: 5px"
      >
        <i
          class="el-icon-more lei"
          ref="moreBtn"
          :style="{ color: `${vuexCommon.headerColor}` }"
          @click="Oncommon"
        ></i>
      </el-tooltip>
      <div
        class="box_border"
        :style="{ background: `${vuexCommon.headerBorderColor}` }"
      ></div>
      <ul class="box_ul" v-if="false">
        <li
          v-for="(item, index) in liArr"
          :key="index"
          :style="{ color: `${vuexCommon.headerColor}` }"
        >
          <el-tooltip
            class="item"
            effect="dark"
            :content="item"
            placement="bottom"
          >
            <span>{{ item }}</span>
          </el-tooltip>
        </li>
      </ul>
      <div
        class="box_border"
        :style="{ background: `${vuexCommon.headerBorderColor}` }"
      ></div>
      <!-- 全部应用 -->
      <div
        class="quan_box"
        v-if="vuexCommon.menuType == 0"
        @click="Onquan"
        :style="{ color: `${vuexCommon.headerColor}` }"
        ref="allbtn"
      >
        <i class="el-icon-menu"></i>
        <span class="quan_box_span">全部应用</span>
        <div
          class="jian_tou"
          :style="{
            transform: deg,
            marginBottom: marginBottom,
            borderTop: `${vuexCommon.borderTopLeft}`,
            borderLeft: `${vuexCommon.borderTopLeft}`,
          }"
        ></div>
      </div>
      <div class="right_box" :style="{ color: `${vuexCommon.headerColor}` }">
        <div
          @click="Onhome"
          ref="nameBtn"
          style="display: flex; justify-content: center"
        >
          <div
            v-if="vuexUser.info.name"
            style="display: flex"
            class="right_box_nei"
          >
            <!-- <img
              class="right_box_img"
              :src="userInfo.head_img"
              alt=""
              srcset=""
              v-if="userInfo.head_img"
            /> -->
            <!-- <div
              class="right_box_img2"
              v-if="!vuexUser.info.head_img"
              :style="{ color: vuexCommon.headerBg }"
            ></div> -->
            <span class="right_box_name"
              >{{ vuexUser.info.account ? vuexUser.info.account : "" }}({{
                vuexUser.info.name
              }})</span
            >
            <span
              class="jiantou"
              :style="{ border: boder, borderTop: vuexCommon.headerBorderTop }"
            >
            </span>
          </div>
        </div>
      </div>
      <!-- 常用菜单 -->
      <ul class="commonBox" v-if="commonShow" ref="commonBox">
        <li v-for="(item, index) in commonList" :key="index">
          <i class="el-icon-suitcase"></i>
          <span>{{ item.content }}</span>
        </li>
      </ul>
      <!-- 个人菜单 -->
      <ul class="homeBox" v-if="homeShow" ref="homeapp">
        <li
          v-for="(item, index) in homeList"
          :key="index"
          @click="enter(index)"
          v-show="item.show"
        >
          <div>
            <i class="el-icon-suitcase"></i>
            <span class="homeBox_text">{{ item.content }}</span>
          </div>
        </li>
      </ul>
      <!-- 全部应用 -->
      <div class="applyBox" v-if="quanShow" ref="allapp">
        <el-input
          placeholder="输入中文或者字母检索"
          v-model="input"
          clearable
          prefix-icon="el-icon-search"
          @change="changeInput(input)"
        >
        </el-input>
        <p class="applyBox_p" v-if="applyArr.length > 0">我的应用</p>
        <ul>
          <li
            v-for="(item, index) in applyArr"
            :key="index"
            @click="change(item)"
          >
            <div class="boxBg"></div>

            <span style="color: #333">{{ item.meta.title }}</span>
          </li>
        </ul>
        <div class="postion_but">
          <i class="el-icon-s-tools" style="color: #999"></i>
        </div>
      </div>
    </div>
    <!-- 主题选择 -->
    <div class="themeBox" v-if="themeShow" @click="themeShow = false"></div>
    <div class="themeBox_right" v-if="themeShow">
      <div class="theme">
        <h2>导航模式</h2>
        <ul class="theme_item">
          <li
            v-for="(item, index) in themeList"
            :key="index"
            @click="checkTheme(index)"
          >
            <img
              :class="index == vuexCommon.menuType ? 'themeActive' : ''"
              :src="item"
              alt=""
              srcset=""
            />
            <i
              class="el-icon-check"
              v-if="index == vuexCommon.menuType"
              style="color: #9a3434"
            ></i>
          </li>
        </ul>
      </div>
      <div style="border-bottom: 1px solid #e5e5e5"></div>
      <div class="theme">
        <h2>主题设置</h2>
        <ul class="style_item">
          <li
            v-for="(item, index) in styleList"
            :key="index"
            @click="checkStyle(index)"
          >
            <img
              :class="index == vuexCommon.MenuTheme ? 'themeActive' : ''"
              :src="item.pic"
              alt=""
              srcset=""
            />
            <i
              class="el-icon-check"
              v-if="index == vuexCommon.MenuTheme"
              style="color: #9a3434"
            ></i>
            <span>{{ item.con }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 左侧关闭按钮 -->
    <div
      class="themeBox_but"
      :style="{ backgroundColor: `${vuexCommon.closeBg}` }"
      @click="offTheme"
      v-if="themeShow"
    >
      <i class="el-icon-close"></i>
    </div>
  </div>
</template>
<script>
import { removeToken } from "@/utils/auth.js";

export default {
  name: "TouBox",
  data() {
    return {
      userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).userInfo
        : "",
      liArr: ["收文管理", "流程管理", "督查督办"],
      commonList: [
        { content: "收文登记" },
        { content: "待批收文" },
        { content: "收文查询" },
        { content: "发文跟踪" },
        { content: "收文拟稿" },
        { content: "待批发文" },
        { content: "发文查询" },
        { content: "收文跟踪" },
      ],
      homeList: [
        { content: "我的主页", show: true },
        { content: "主题选择", show: false },
        { content: "密码修改", show: true },
        { content: "退出登录", show: true },
      ],
      commonShow: false,
      homeShow: false,
      deg: "rotate(225deg)",
      input: "",
      applyArr: [],
      applyArr2: [
        { pic: require("@/assets/menu/apply_img.png"), con: "任务管理" },
        { pic: require("@/assets/menu/apply_img.png"), con: "会议管理" },
        { pic: require("@/assets/menu/apply_img.png"), con: "投票调查" },
        { pic: require("@/assets/menu/apply_img.png"), con: "报表管理" },
      ],
      quanShow: false,
      marginBottom: "3px",
      themeList: [
        require("@/assets/menu/style1.png"),
        require("@/assets/menu/style2.png"),
      ],
      styleList: [
        {
          pic: require("@/assets/menu/theme_1.png"),
          closeBg: "#4e89f8",
          borderTopLeft: "1px solid #999",
          leftBoxColor: "rgba(255,255,255,0.8)",
          con: "简约风",
          headerBg: "#ffffff",
          MenuImg: require("@/assets/menu/navbar_1.png"),
          headerColor: "#999",
          headerBorderColor: "rgba(153, 153, 153,0.1)",
          headerBorderTop: "5px solid #999",
        },
        {
          pic: require("@/assets/menu/theme_2.png"),
          closeBg: "#4662b2",
          borderTopLeft: "1px solid #fff",
          leftBoxColor: "rgba(255,255,255,0.8)",
          con: "商务风",
          headerBg: "#4662b2",
          MenuImg: require("@/assets/menu/navbar_2.png"),
          headerColor: "#ffffff",
          headerBorderColor: "rgba(255,255,255,0.1)",
          headerBorderTop: "5px solid #fff",
        },
        {
          pic: require("@/assets/menu/theme_3.png"),
          closeBg: "#9a3434",
          borderTopLeft: "1px solid #fff",
          leftBoxColor: "rgba(255,255,255,0.8)",
          con: "政务风",
          headerBg: "#9a3434",
          MenuImg: require("@/assets/menu/navbar_3.png"),
          headerColor: "#ffffff",
          headerBorderColor: "rgba(255,255,255,0.1)",
          headerBorderTop: "5px solid #fff",
        },
        {
          pic: require("@/assets/menu/theme_4.png"),
          closeBg: "#4e89f8",
          borderTopLeft: "1px solid #fff",
          leftBoxColor: "rgba(255,255,255,0.8)",
          con: "科技蓝",
          headerBg: "#090c25",
          MenuImg: require("@/assets/menu/navbar_4.png"),
          headerColor: "#ffffff",
          headerBorderColor: "rgba(255,255,255,0.1)",
          headerBorderTop: "5px solid #fff",
        },
        {
          pic: require("@/assets/menu/theme_5.png"),
          closeBg: "#31806e",
          borderTopLeft: "1px solid #fff",
          leftBoxColor: "#666666",
          con: "清爽绿",
          headerBg: "#31806e",
          MenuImg: require("@/assets/menu/navbar_5.png"),
          headerColor: "#ffffff",
          headerBorderColor: "rgba(255,255,255,1)",
          headerBorderTop: "5px solid #fff",
        },
        {
          pic: require("@/assets/menu/theme_6.png"),
          closeBg: "#4e89f8",
          borderTopLeft: "1px solid #fff",
          leftBoxColor: "rgba(255,255,255,0.8)",
          con: "幻影黑",
          headerBg: "#23283b",
          MenuImg: require("@/assets/menu/navbar_6.png"),
          headerColor: "#ffffff",
          headerBorderColor: "rgba(255,255,255,0.1)",
          headerBorderTop: "5px solid #fff",
        },
        {
          pic: require("@/assets/menu/theme_7.png"),
          closeBg: "#b36116",
          borderTopLeft: "1px solid #fff",
          leftBoxColor: "#666666",
          con: "活力橙",
          headerBg: "#e0812a",
          MenuImg: require("@/assets/menu/navbar_7.png"),
          headerColor: "#ffffff",
          headerBorderColor: "rgba(255,255,255,1)",
          headerBorderTop: "5px solid #fff",
        },
        {
          pic: require("@/assets/menu/theme_8.png"),
          closeBg: "#6838cc",
          borderTopLeft: "1px solid #fff",
          leftBoxColor: "rgba(255,255,255,0.8)",
          con: "炫光紫",
          headerBg: "#432387",
          MenuImg: require("@/assets/menu/navbar_8.png"),
          headerColor: "#ffffff",
          headerBorderColor: "rgba(255,255,255,0.1)",
          headerBorderTop: "5px solid #fff",
        },
        {
          pic: require("@/assets/menu/theme_custom.png"),
          closeBg: "#6838cc",
          borderTopLeft: "1px solid #fff",
          leftBoxColor: "rgba(255,255,255,0.8)",
          con: "自定义",
          headerBg: "#432387",
          MenuImg: require("@/assets/menu/navbar_8.png"),
          headerColor: "#ffffff",
          headerBorderColor: "rgba(255,255,255,0.1)",
          headerBorderTop: "5px solid #fff",
        },
      ],
      themeShow: false,
      boder: "5px solid transparent",
    };
  },

  mounted() {
    window.addEventListener("mousedown", (e) => {
      // 获取被点击的元素
      const clickedEl = e.target;
      const all = this.$refs.allapp;
      const allbtn = this.$refs.allbtn;
      //存在弹窗 && 点击区域不是弹窗 && 也不是按钮的时候关闭
      if (all && !all.contains(clickedEl) && !allbtn.contains(clickedEl)) {
        this.quanShow = false;
        this.deg = "rotate(225deg)";
        this.marginBottom = "3px";
      }
      const homeapp = this.$refs.homeapp;
      const nameBtn = this.$refs.nameBtn;
      //存在弹窗 && 点击区域不是弹窗 && 也不是按钮的时候关闭
      if (
        homeapp &&
        !homeapp.contains(clickedEl) &&
        !nameBtn.contains(clickedEl)
      ) {
        this.homeShow = false;
      }
      const commonBox = this.$refs.commonBox;
      const moreBtn = this.$refs.moreBtn;
      if (
        commonBox &&
        !commonBox.contains(clickedEl) &&
        !moreBtn.contains(clickedEl)
      ) {
        this.commonShow = false;
      }
    });
    // 设置默认主题
    if (!this.vuexCommon.headerBg) this.checkStyle(4);
  },

  methods: {
    change(item) {
      this.$setVuex("vuexCommon.menuItem", item);
      if (item.children) {
        this.go(item.children[0].path);
      }
      this.quanShow = false;
      if (this.quanShow == true) {
        this.deg = "rotate(45deg)";
        this.marginBottom = "-3px";
      } else {
        this.deg = "rotate(225deg)";
        this.marginBottom = "3px";
      }
    },
    go(url) {
      if (url) {
        this.$setVuex("vuexCommon.nowPath", url);
        this.$router.push(url);
      }
    },
    changeInput(val) {
      if (val) {
        this.applyArr = this.applyArr.filter((item) => {
          return item.meta.title.includes(val);
        });
        // this.applyArr2 = this.applyArr2.filter(item => {
        //   return item.con.includes(val)
        // })
      } else {
        //此处需要等接口返回菜单重新赋值
      }
    },
    Oncommon() {
      this.commonShow = !this.commonShow;
    },
    Onhome() {
      this.homeShow = !this.homeShow;
    },
    Onquan() {
      this.quanShow = !this.quanShow;
      if (this.quanShow == true) {
        this.deg = "rotate(45deg)";
        this.marginBottom = "-3px";
      } else {
        this.deg = "rotate(225deg)";
        this.marginBottom = "3px";
      }
    },
    checkTheme(index) {
      this.$setVuex("vuexCommon.menuType", index);
    },
    checkStyle(index) {
      this.styleList.forEach((item, ind) => {
        if (index == ind) {
          this.$setVuex("vuexCommon.headerBg", item.headerBg);
          this.$setVuex("vuexCommon.MenuImg", item.MenuImg);
          this.$setVuex("vuexCommon.MenuTheme", index);
          this.$setVuex("vuexCommon.headerColor", item.headerColor);
          this.$setVuex("vuexCommon.headerBorderColor", item.headerBorderColor);
          this.$setVuex("vuexCommon.headerBorderTop", item.headerBorderTop);
          this.$setVuex("vuexCommon.closeBg", item.closeBg);
          this.$setVuex("vuexCommon.borderTopLeft", item.borderTopLeft);
          this.$setVuex("vuexCommon.leftBoxColor", item.leftBoxColor);

          const root = document.documentElement;
          root.style.setProperty("--themeColor", item.headerBg);
        }
      });
    },
    enter(ind) {
      if (ind == 0) {
        this.$router.push("/");
      }
      if (ind == 1) {
        this.themeShow = true;
      }
      if (ind == 2) {
        this.$router.push("/changePass");
      }
      if (ind == 3) {
        removeToken();
        this.$message.msgSuccess("账号已经退出!");
        this.$setVuex("vuexCommon.menuData", []);
        this.$router.push("/login");
      }
    },
    offTheme() {
      this.themeShow = false;
    },
    onHide() {
      this.$setVuex("vuexCommon.leftBoxHide", !this.vuexCommon.leftBoxHide);
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 60px;
  color: white;
  display: flex;
  align-items: center;
  position: relative;

  .box_img {
    width: 220px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 130px;
    }
  }

  .lei {
    display: inline-block;
    width: 30px;
    height: 100%;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
  }

  .lei:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .box_border {
    width: 1px;
    height: 28px;
  }

  .box_ul {
    display: flex;
    align-items: center;
    height: 60px;

    li {
      height: 60px;
      line-height: 60px;
      padding: 0 10px;
      color: white;
      font-size: 14px;

      span {
        display: inline-block;
        height: 60px;
      }
    }
  }

  .quan_box {
    display: flex;
    align-items: center;
    margin-left: 10px;

    .quan_box_span {
      font-size: 14px;
      margin-left: 5px;
    }

    .jian_tou {
      width: 8px;
      height: 8px;
      margin-left: 8px;
    }
  }

  .quan_box:hover {
    cursor: pointer;
  }

  .right_box {
    height: 60px;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-content: center;
    overflow: hidden;

    .right_box_nei {
      display: flex;
      align-items: center;
    }

    .right_box_img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-left: 20px;
    }

    .right_box_img2 {
      overflow: hidden;
      width: 36px;
      height: 36px;
      line-height: 100%;
      border-radius: 50%;
      margin-left: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 36px;
      background-color: #fff;
      font-weight: bold;
      font-size: 18px;
    }

    .right_box_name {
      font-size: 14px;
      margin-left: 10px;
      display: flex;
      align-items: center;
    }

    .jiantou {
      display: inline-block;
      margin-right: 25px;
      margin-top: 6px;
      margin-left: 4px;
    }

    .right_box_name:hover {
      cursor: pointer;
    }
  }

  .commonBox {
    max-height: 748px;
    overflow-y: hidden;
    position: absolute;
    top: 60px;
    left: 260px;
    z-index: 999;
    box-shadow: 0 4px 12px #0f154b29;

    li {
      padding: 0 15px;
      color: #666;
      box-sizing: border-box;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      cursor: pointer;
      background: #ffffff; //#ffffff

      span {
        margin-left: 10px;
        margin-right: 40px;
      }
    }

    li:hover {
      background: #f3f3f3 !important;
    }
  }

  .homeBox {
    z-index: 999;
    max-height: 748px;
    position: absolute;
    top: 60px;
    right: 5px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding: 4px 0;
    margin: 2px 0 0;
    box-shadow: 0 4px 12px #0f154b29;

    li {
      padding: 0 15px;
      color: #666;
      box-sizing: border-box;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      cursor: pointer;
      background: #ffffff; //#ffffff
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;

      .xiao_homeBox {
        position: absolute;
        top: -40px;
        left: -100px;
        border: 1px solid rgba(0, 0, 0, 0.15);

        li {
          width: 90px;
          padding: 0 15px;
          color: #666;
          box-sizing: border-box;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          cursor: pointer;
          background: #ffffff; //#ffffff
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        .right_jt::after {
          content: "";
          display: inline-block;
          border: 8px solid transparent;
          border-left: 8px solid #ffffff;
          position: absolute;
          right: -16px;
          top: 41px;
        }
      }

      .homeBox_text {
        margin-left: 10px;
      }

      .arrow {
        padding-left: 10px;
      }

      .arrow::after {
        content: "";
        display: inline-block;
        width: 8px;
        height: 8px;
        border-top: 1px solid #666;
        border-left: 1px solid #666;
        transform: rotate(135deg);
      }
    }

    li:hover {
      background: #f4f4f4 !important;
    }
  }

  .applyBox {
    width: 640px;
    height: 440px;
    margin: 0;
    padding: 0px 10px 0 10px;
    background-color: #ffffff;
    position: absolute;
    top: 60px;
    left: 518px;
    box-sizing: border-box;
    z-index: 999;
    box-shadow: 0 4px 12px #0f154b29;
    border-radius: 0 0 4px 4px;

    .applyBox_p {
      font-size: 14px;
      color: #999;
      margin-left: 12px;
      margin-bottom: 5px;
      position: relative;
    }

    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      li {
        width: 16.6%;
        height: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        font-size: 14px;
        color: black;

        img {
          width: 40px;
          height: 40px;
        }
      }

      li:hover {
        background: rgb(239, 241, 245) !important;
      }
    }

    .postion_but {
      width: 46px;
      height: 27px;
      background: rgba(153, 153, 153, 0.1);
      border-radius: 20px 0 0 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 8px;
      right: 0;
      cursor: pointer;
    }
  }
}

.themeBox {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
}

.themeBox_right {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 315px;
  background: #fff;
  overflow-y: auto;
  height: 100%;
  z-index: 9999;

  .theme {
    overflow: hidden;
    margin: 20px 15px;

    h2 {
      color: #333;
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 15px;
      font-weight: 500;
    }

    .theme_item {
      display: flex;
      flex-wrap: wrap;

      li {
        margin-left: 15px;
        position: relative;

        img {
          width: 77px;
          height: 38px;
          border: 1px solid #efefef;
          background: #fff;
          border-radius: 6px;
          padding: 1px;
          cursor: pointer;
        }

        i {
          position: absolute;
          top: 9px;
          right: 18px;
          font-size: 20px;
        }
      }
    }

    .style_item {
      display: flex;
      flex-wrap: wrap;

      li {
        margin-left: 15px;
        position: relative;
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      img {
        width: 77px;
        border: 1px solid #efefef;
        background: #fff;
        border-radius: 6px;
        padding: 1px;
        cursor: pointer;
      }

      i {
        position: absolute;
        top: 20px;
        right: 18px;
        font-size: 20px;
      }

      span {
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
}

.themeBox_but {
  position: absolute;
  top: 14px;
  right: 315px;
  width: 28px;
  line-height: 28px;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  text-align: center;
  cursor: pointer;
  color: #fff;
  z-index: 9999;
}

.themeActive {
  border: 1px solid #9a3434 !important;
}
</style>
<style scoped>
/deep/ .el-input {
  width: 240px;
}

/deep/ .el-input__inner {
  background: transparent !important;
  border: none;
  color: rgb(205, 205, 205);
  font-size: 14px;
}

/deep/ .el-icon-search {
  font-size: 20px;
}

.boxBg {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    47.84deg,
    rgb(215, 93, 100) 8.67%,
    rgb(223, 115, 81) 58.32%
  );
  color: rgb(255, 255, 255);
  border-radius: 4px;
}
</style>
