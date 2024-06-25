<template>
  <form-item-wrapper
    :designer="designer"
    :field="field"
    :rules="rules"
    :design-state="designState"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :sub-form-row-index="subFormRowIndex"
    :sub-form-col-index="subFormColIndex"
    :sub-form-row-id="subFormRowId"
  >
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        cursor: pointer;
      "
      @click="dialogVisible = true"
    >
      <span v-if="selectNames == ''">{{ placeholderTexet }}</span>
      <span v-else>{{ selectNames }}</span>
    </div>
    <el-dialog
      title="请选择"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="45%"
      :before-close="handleClose"
      style="font-size: 15px"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="部门" name="second">
          <div class="department">
            <div class="p_left">
              <div class="left_box">
                <div class="left_top" style="position: relative">
                  <el-input v-model="filterText" placeholder="部门/人员名称">
                  </el-input>
                  <i
                    class="el-icon-search"
                    style="
                      position: absolute;
                      right: 15px;
                      top: 50%;
                      transform: translate(0, -50%);
                      z-index: 99;
                      cursor: pointer;
                    "
                  ></i>
                </div>
                <div class="left_bottom">
                  <el-tree
                    class="filter-tree"
                    :data="data"
                    :props="defaultProps"
                    default-expand-all
                    :filter-node-method="filterNode"
                    @node-click="nodeClick"
                    ref="tree"
                  >
                  </el-tree>
                </div>
              </div>
              <div class="center_box">
                <div
                  style="
                    top: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 0 0 3px 3px;
                    overflow: hidden;
                  "
                >
                  <!-- <img src="../../../../../src/assets/myArrow.png" /> -->
                  <!-- alt="" style="width: 15px; height: 12px; cursor: pointer" /> -->
                </div>
                <div
                  style="
                    bottom: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 3px 3px 0 0;
                    overflow: hidden;
                  "
                >
                  <!-- <img
                    src="../../../../../src/assets/myArrow.png"
                    alt=""
                    style="
                      width: 15px;
                      height: 12px;
                      transform: rotate(180deg);
                      cursor: pointer;
                    "
                  /> -->
                </div>
              </div>
              <div
                class="left_box2"
                style="
                  color: #606266;
                  font-size: 14px;
                  overflow-y: auto;
                  padding: 0 2px;
                  line-height: 26px;
                "
              >
                <div
                  v-for="(item, index) in peopleList"
                  :key="index"
                  @click="setVal(index, item)"
                  style="
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                  "
                  :class="item.name == setIndex ? 'bg_blue' : ''"
                >
                  <span>
                    {{ item.name }}
                  </span>
                  <span>
                    {{ item.department }}
                  </span>
                  <span>
                    {{ item.userIdentity }}
                  </span>
                </div>
              </div>
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                flex: 1;
                justify-content: center;
                align-items: center;
              "
            >
              <div class="dir_btn" @click="goRight">
                <svg-icon
                  iconClass="goright"
                  style="width: 22px; height: 25px"
                ></svg-icon>
              </div>
              <div class="dir_btn" @click="goLeft">
                <svg-icon
                  iconClass="goleft"
                  style="width: 22px; height: 25px"
                ></svg-icon>
              </div>
            </div>
            <div class="p_right">
              <div class="left_top" style="position: relative">
                <el-input v-model="input" placeholder="人员名称"> </el-input>
                <i
                  class="el-icon-search"
                  style="
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translate(0, -50%);
                    z-index: 99;
                    cursor: pointer;
                  "
                ></i>
              </div>
              <div
                class="left_box2"
                style="
                  color: #606266;
                  font-size: 14px;
                  overflow-y: auto;
                  padding: 0 2px;
                  line-height: 26px;
                "
              >
                <div v-if="selectPeopleList.length > 0">
                  <div
                    v-for="(item, index) in selectPeopleList"
                    :key="index"
                    @click="setVal2(index, item)"
                    style="
                      display: flex;
                      flex-direction: row;
                      justify-content: space-around;
                    "
                    class="bg_item"
                    :class="item.name == setIndex2 ? 'bg_blue' : ''"
                  >
                    <span>
                      {{ item.name }}
                    </span>
                    <span>
                      {{ item.department }}
                    </span>
                    <span>
                      {{ item.userIdentity }}
                    </span>
                  </div>
                </div>
                <div
                  v-else
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                  "
                >
                  暂无选择信息
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- <MemberPanel></MemberPanel> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </form-item-wrapper>
</template>

<script>
// import { getArchitectureOption, getMemberOption } from "@vFrom/api/common.js";
// import MemberPanel from "@vFrom/components/member-modal/index";
import FormItemWrapper from "./form-item-wrapper";
import emitter from "@vFrom/utils/emitter";
import i18n, { translate } from "@vFrom/utils/i18n";
import fieldMixin from "@vFrom/components/form-designer/form-widget/field-widget/fieldMixin";
import treeTransform from "./common/tree-transform.vue";
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  name: "member-widget",
  componentName: "FieldWidget", //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: false,
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */ type: Number,
      default: -1,
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */ type: Number,
      default: -1,
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */ type: String,
      default: "",
    },
  },
  components: {
    FormItemWrapper,
    treeTransform,
    // MemberPanel,
  },
  inject: ["refList", "formConfig", "globalOptionData", "globalModel"],
  data() {
    return {
      selectNames: "",
      tempObj: {}, //选中的obj临时对象
      selectPeopleList: [],
      setIndex: 0, //设置的index
      setIndex2: 0, //设置的index2
      peopleList: [],
      input: "", //部门搜索
      oldFieldValue: null, //field组件change之前的值
      fieldModel: null,
      rules: [],
      placeholderTexet: "请选择",
      dialogVisible: false,
      activeName: "second",
      data: [],
      value: [],
      filterText: "",
      data: [],
      defaultProps: {
        children: "child",
        label: "name",
      },
      type: 1,
    };
  },
  computed: {
    inputType() {
      if (this.field.options.type === "number") {
        return "text"; //当input的type设置为number时，如果输入非数字字符，则v-model拿到的值为空字符串，无法实现输入校验！故屏蔽之！！
      }

      return this.field.options.type;
    },
  },
  beforeCreate() {
    /* 这里不能访问方法和属性！！ */
  },

  created() {
    /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
       需要在父组件created中初始化！！ */
    this.initFieldModel();
    this.registerToRefList();
    this.initEventHandler();
    this.buildFieldRules();
    this.handleOnCreated();
  },

  mounted() {
    this.handleOnMounted();
    this.tempObj = this.peopleList[0];
    this.getTreeData();
  },

  beforeDestroy() {
    this.unregisterFromRefList();
  },

  methods: {
    nodeClick(data) {
      console.log(data);
      // getMemberOption({ type: this.type, id: data.id }).then((res) => {
      //   if (res.code == 200) {
      //     this.peopleList = res.data;
      //   }
      // });
    },
    getTreeData() {
      // getArchitectureOption({ type: this.type }).then((res) => {
      //   if (res.code == 200) {
      //     this.data = [res.data];
      //   }
      // });
    },
    confirm() {
      let tempString = "";
      for (let val of this.selectPeopleList) {
        tempString += `${val.name},`;
      }
      console.log(this.selectPeopleList, 77);
      this.selectNames = tempString.substring(0, tempString.length - 1);
      this.syncUpdateFormModel(tempString.substring(0, tempString.length - 1));
      this.emitFieldDataChange(
        tempString.substring(0, tempString.length - 1),
        this.oldFieldValue
      );
      this.dialogVisible = false;
    },
    goRight() {
      var index = this.selectPeopleList.findIndex(
        (item) => item.name === this.tempObj.name
      );
      if (index == -1) {
        this.selectPeopleList.push(this.tempObj);
      }
    },
    goLeft() {
      var index = this.selectPeopleList.findIndex(
        (item) => item.name === this.tempObj.name
      );
      console.log(index);
      if (index != -1) {
        this.selectPeopleList.splice(index, 1);
      }
    },
    setVal(index, item) {
      this.setIndex = item.name;
      this.tempObj = item;
      this.setIndex2 = "";
    },
    setVal2(index, item) {
      this.setIndex2 = item.name;
      this.tempObj = item;
      this.setIndex = "";
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleClick() {},
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
div /deep/ .el-dialog__body {
  padding: 0 20px !important;
}

div /deep/ .el-dialog__title {
  font-size: 15px;
}

.p_left {
  width: 350px;
  border: 1px solid #f5f5f5;
  display: flex;
  flex-direction: column;
}

.p_right {
  width: 350px;
  border: 1px solid #f5f5f5;
}

.department {
  display: flex;
  justify-content: space-between;
  min-height: 650px;
}

div /deep/ .el-icon-caret-right:before {
  content: "";
  display: block;
  width: 16px;
  height: 16px;
  /* background: url("../../../../../src/assets/folder.png") no-repeat; */
  background-size: cover;
}

div /deep/ .el-tree-node__expand-icon.expanded {
  transform: rotate(0deg) !important;
}

.left_top {
  height: 50px;
  background-color: rgb(246, 249, 249);
  padding: 10px 5px;
  display: flex;
  justify-content: center;
  align-content: center;
}

.left_box {
  display: flex;
  flex-direction: column;
  flex: 1;
  border-bottom: 1px solid #f5f5f5;
  height: 300px;
}

.left_bottom {
  height: 100%;
  overflow-y: auto;
}

.left_box2 {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 300px;
}

div /deep/ .el-input--medium .el-input__inner {
  border-radius: 50px !important;
  height: 33px !important;
  width: 100% !important;
}

.center_box {
  height: 50px;
  background-color: rgb(246, 249, 249);
  position: relative;
}

div /deep/ ::-webkit-scrollbar {
  /*定义滚动条整体样式*/
  width: 6px;
  /*宽度*/
  height: 6px;
  /*高度*/
  /*整体背景颜色*/
  display: block !important;
}

div /deep/ ::-webkit-scrollbar-thumb {
  /*定义滚动条内部样式*/
  /*内部背景颜色*/
  border-radius: 3px;
  /*圆角程度*/
  display: block !important;
}

div /deep/ ::-webkit-scrollbar-thumb:hover {
  background-color: #dcdcdc;
}

.center_box > div {
  width: 30px;
  height: 8px;
  background-color: #d1d4db;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}

/* .bg_blue {
  background-color: rgb(25, 103, 210);
  color: #fff;
} */

.dir_btn {
  background-color: rgb(189, 210, 226) !important;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  margin: 20px 0;
  cursor: pointer;
}

.dir_btn:hover {
  background-color: rgb(66, 179, 229) !important;
}
</style>
