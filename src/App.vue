<template>
  <div id="app">
    <div class="container" v-if="vuexCommon.totalOrPart == 2">
      <div class="header">
        <touBox></touBox>
      </div>
      <div class="content">
        <div class="left-menu">
          <leftBox v-if="vuexCommon.menuType == 0" />
          <Menu v-if="vuexCommon.menuType == 1"></Menu>
        </div>
        <div class="right-content">
          <div
            class="body-content"
            :style="{
              backgroundColor: $route.fullPath !== '/' ? '#fff' : '',
              padding: $route.fullPath !== '/' ? '20px' : '5px',
            }"
          >
            <router-view :key="$route.fullPath" />
          </div>
        </div>
      </div>
    </div>
    <router-view v-if="vuexCommon.totalOrPart == 1" />
  </div>
</template>

<script>
import leftBox from "./views/homePage/leftBox/leftBox";
import Menu from "./views/homePage/leftBox/menu.vue";
import touBox from "./views/homePage/headerBox/touBox.vue";
import "@/styles/global.scss";
import "@/styles/index.scss";
export default {
  computed: {},
  components: {
    touBox,
    leftBox,
    Menu,
  },
  name: "App",
  data() {
    return {
      headerBg: "",
    };
  },
  created() {},

  mounted() {
    //默认色设置
    const root = document.documentElement;
    root.style.setProperty("--themeColor", this.vuexCommon.headerBg);

    // 动态设置表格高度
    // this.resetTableHeight();
    // window.addEventListener("resize", () => {
    //   this.resetTableHeight();
    // });
  },
  methods: {
    resetTableHeight() {
      let bodyContentHeight =
        document.querySelector(".body-content").offsetHeight;
      let elFormHeight = document.querySelector(".el-form")
        ? document.querySelector(".el-form").offsetHeight
        : 0;
      let mb8Height = document.querySelector(".mb8")
        ? document.querySelector(".mb8").offsetHeight
        : 0;
      let paginationHeight = document.querySelector(".el-pagination")
        ? document.querySelector(".el-pagination").offsetHeight
        : 0;
      document.querySelector(".el-table").style.height =
        bodyContentHeight -
        (elFormHeight + mb8Height + paginationHeight + 80) +
        "px";
    },
  },
};
</script>
<style>
@page {
  size: auto;
  margin: 0mm;
}
</style>
<style lang="scss">
// * {
//   -webkit-touch-callout: none; /*系统默认菜单被禁用*/
//   -webkit-user-select: none; /*webkit浏览器*/
//   -khtml-user-select: none; /*早期浏览器*/
//   -moz-user-select: none; /*火狐*/
//   -ms-user-select: none; /*IE10*/
//   user-select: none;
// }
// 表头上下线
.mb8 {
  margin-bottom: 10px;
}
.el-table th.el-table__cell.is-leaf {
  padding: 10px 0;
  border-top: 1px solid #ebeef5;
}
// 表格隐藏字段区域样式
.table-expand {
  padding-left: 100px;
  font-size: 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
html,
body,
#app {
  width: 100vw;
  height: 100vh;
  // color: rgba(255, 255, 255, .8);
  background-color: #ffffff;
}
* {
  box-sizing: border-box;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}

li:hover {
  cursor: pointer;
}

.header {
  height: 60px;
  min-height: 60px;
}

.container {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;

  .header {
    width: 100%;
    height: 60px;
  }

  .content {
    display: flex;
    height: calc(100vh - 60px);

    .left-menu {
      height: calc(100vh - 60px);
    }

    .right-content {
      flex: 1;
      overflow: hidden;
      background-color: #f0f2f5;
      padding: 5px;
      .body-content {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: auto;
      }
    }
  }
}

.el-aside .el-form-item {
  margin-bottom: 10px !important;
}
.form-widget-list .el-form-item {
  margin-bottom: 0 !important ;
}

.el-form-item__content {
  // margin: 0 !important;
}

::v-deep .vue-treeselect {
  line-height: 35px !important;
}

.design-time-bottom-margin {
  margin: 0;
}

input {
  outline: none;
}

textarea {
  outline: none;
}
.el-select,
.el-date-editor,
.el-cascader {
  width: 100% !important;
}
//定义
:root {
  --themeColor: #090c25;
}

.el-input__inner:focus {
  border: 1px solid var(--themeColor) !important; //边框颜色
  border-radius: 5px;
}

.el-tabs__item.is-active {
  color: var(--themeColor) !important;
}

.el-tabs__item:hover {
  color: var(--themeColor) !important;
}

.el-tabs__active-bar.is-top {
  color: var(--themeColor) !important;
}

.el-tabs__active-bar {
  background-color: var(--themeColor) !important;
}

.act-item {
  border-bottom: 3px solid var(--themeColor) !important;
}

.el-button--primary,
.el-button--primary:hover,
.el-button--primary.is-active,
.el-button--primary:active,
.el-button--primary:focus {
  background-color: var(--themeColor) !important;
  border-color: var(--themeColor) !important;
  color: #fff !important;
}

.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: var(--themeColor) !important;
  border-color: var(--themeColor) !important;
  box-shadow: -1px 0 0 0 var(--themeColor) !important;
}

.ant-btn-primary {
  background-color: var(--themeColor) !important;
  border-color: var(--themeColor) !important;
}

.ant-switch-checked {
  background-color: var(--themeColor) !important;
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: var(--themeColor) !important;
  border-color: var(--themeColor) !important;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: var(--themeColor) !important;
  border-color: var(--themeColor) !important;
}

.el-select-dropdown__item.selected {
  color: var(--themeColor) !important;
}

.el-aside {
  .el-tabs,
  .el-tabs--top {
    width: 100% !important;
  }
}

.el-switch.is-checked .el-switch__core {
  border-color: var(--themeColor) !important;
  background-color: var(--themeColor) !important;
}

.el-tree-node__content:hover,
.el-upload-list__item:hover .el-tree-node__label {
  background-color: var(--themeColor) !important;
  color: #fff !important;
}

.el-tree-node:focus > .el-tree-node__content {
  background-color: var(--themeColor) !important;
  color: #fff !important;
}

.el-checkbox__inner:hover {
  border-color: var(--themeColor) !important;
}

.el-button--default {
  // color: #606266 !important;
  // background-color: #fff !important;
  // border-color: #dcdfe6 !important;
}

.el-date-editor .el-range-separator {
  min-width: 7% !important;
}

.el-table__footer-wrapper,
.el-table__header-wrapper {
  // height: 45px;
}

.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: var(--themeColor) !important;
}

.el-range-editor.is-active,
.el-range-editor.is-active:hover,
.el-select .el-input.is-focus .el-input__inner,
.el-select .el-input__inner:focus {
  border-color: var(--themeColor) !important;
}

.global-labels {
  .el-input__inner {
    // height: 32px !important;
    // line-height: 32px !important;
    // border-radius: 0.125rem !important;
    // width: 200px !important;
  }
}

.el-dialog {
  .el-input__inner {
    // height: 35px !important;
    // line-height: 35px !important;
    // border-radius: 0.125rem !important;
    // width: 230px !important;
  }

  .el-form-item {
    // margin-bottom: 0;
    // padding-top: 20px !important;
  }

  .el-radio-group {
  }
}
.mformdesign {
  .el-input__inner {
    // width: 100% !important;
  }
  .el-form-item {
    padding-top: 0 !important;
  }
}
.showSelect {
  .el-input__inner {
    height: 33px !important;
    line-height: 33px !important;
    border-radius: 50px !important;
    width: 100% !important;
  }
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: var(--themeColor) !important;
  background: var(--themeColor) !important;
}

.el-radio__input.is-checked + .el-radio__label {
  color: var(--themeColor) !important;
}

.el-popover {
  // min-width: 80px !important;
  // padding: 4px 0 !important;
}

.vue-treeselect__option {
  /* 自定义选项的样式 */
  background-color: #fff !important;
  /* 修改背景颜色 */
  color: #606266 !important;
  /* 修改文字颜色 */
  /* 其他样式属性 */
}

.vue-treeselect__multi-value-item {
  color: var(--themeColor) !important;
}

.vue-treeselect__value-remove {
  color: var(--themeColor) !important;
}

.vue-treeselect__checkbox {
  border-color: var(--themeColor) !important;
}

.vue-treeselect__checkbox.vue-treeselect__checkbox--checked:before {
  background-color: var(--themeColor) !important;
}

.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  color: var(--themeColor) !important;
}

.vue-treeselect__control {
}

.vue-treeselect__control {
  // width: 230px !important;
  // border-radius: 0.125rem !important;
}
.el-pagination {
  text-align: right;
  margin-top: 20px;
  margin-right: 20px;
}

::v-deep .vue-treeselect__input {
  /* 自定义输入框的样式 */
  /* background-color: #f2f2f2; */
  /* 修改背景颜色 */
  /* color: #333; */
  /* 修改文字颜色 */
  /* 其他样式属性 */
}

::v-deep .vue-treeselect__menu {
  /* 自定义下拉菜单的样式 */
  background-color: #fff !important;
  /* 修改背景颜色 */
  color: #333 !important;
  /* 修改文字颜色 */
  /* 其他样式属性 */
}

.avatar-uploader .el-upload:hover {
  border-color: var(--themeColor) !important;
}

.el-date-table td.today span {
  color: var(--themeColor) !important;
}

.el-date-table td.available:hover {
  color: var(--themeColor) !important;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.vue-treeselect {
  line-height: 35px !important;
}
.el-input-number--small {
  line-height: 38px !important;
}
.searchTree > .vue-treeselect__control {
  height: 32px !important;
  margin-top: 4px;
  // line-height: 32px !important;
  width: 200px !important;
}

.el-dialog__headerbtn:focus .el-dialog__close,
.el-dialog__headerbtn:hover .el-dialog__close {
  color: var(--themeColor) !important;
}
.el-table th.el-table__cell > .cell {
  padding-left: 14px !important;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: var(--themeColor) !important;
  color: #fff !important;
}
.el-loading-spinner .path {
  stroke: var(--themeColor) !important;
}
.bg_blue {
  background-color: var(--themeColor) !important;
  color: #fff !important;
}
.el-loading-spinner .el-loading-text {
  color: var(--themeColor) !important;
}
</style>
