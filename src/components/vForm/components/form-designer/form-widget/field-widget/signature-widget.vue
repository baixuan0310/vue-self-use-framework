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
        width: 100%;
        height: 200px;
        background-color: #f5f7fa;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <img
        :src="field.options.defaultValue"
        v-if="field.options.defaultValue"
        alt=""
        style="width: 100%; height: 100%; background-size: 100% 100%"
      />
      <div v-if="!field.options.defaultValue">暂无签名</div>
    </div>
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0 0px 0;
      "
    >
      <el-button @click="dialogTableVisible = true">手写</el-button
      ><el-button @click="clear">清除</el-button>
    </div>
    <el-dialog
      title="签名"
      append-to-body
      :visible.sync="dialogTableVisible"
      width="800px"
    >
      <vue-esign
        @signature="handleSignature"
        :isClearBgColor="false"
        style="width: 100%; height: 200px"
        bgColor="#f5f7fa"
        ref="esign"
      ></vue-esign>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button
        ><el-button @click="clear2">清除</el-button
        ><el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
    <!-- width	Number	800	画布宽度，即导出图片的宽度
height	Number	300	画布高度，即导出图片的高度
lineWidth	Number	4	画笔粗细
lineColor	String	#000	画笔颜色
bgColor	String	空	画布背景色，为空时画布背景透明
isCrop	Boolean	false	是否裁剪，在画布设定尺寸基础上裁掉四周空白部分
isClearBgColor	Boolean	true	清空画布时(reset)是否同时清空设置的背景色(bgColor)
format	Number	image/png	生成图片格式 image/jpeg(jpg格式下生成的图片透明背景会变黑色请慎用或指定背景色)、 image/webp
quality	Number	1	生成图片质量；在指定图片格式为 image/jpeg 或 image/webp的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。 -->
  </form-item-wrapper>
</template>

<script>
import FormItemWrapper from "./form-item-wrapper";
import emitter from "@vFrom/utils/emitter";
import i18n, { translate } from "@vFrom/utils/i18n";
import fieldMixin from "@vFrom/components/form-designer/form-widget/field-widget/fieldMixin";

export default {
  name: "signature-widget",
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
  },
  inject: ["refList", "formConfig", "globalOptionData", "globalModel"],
  data() {
    return {
      oldFieldValue: null, //field组件change之前的值
      fieldModel: null,
      rules: [],
      dialogTableVisible: false,
      mImg: "",
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
  },

  beforeDestroy() {
    this.unregisterFromRefList();
  },

  methods: {
    handleSignature(dataUrl) {
      // 处理签字数据
      console.log(dataUrl);
    },
    clear() {
      this.dialogTableVisible = false;
      this.$set(this.field.options, "defaultValue", "");
      this.$refs.esign.reset();

      this.syncUpdateFormModel("");
      this.emitFieldDataChange("", this.oldFieldValue);
    },
    clear2() {
      this.$set(this.field.options, "defaultValue", "");
      this.$refs.esign.reset();
      this.syncUpdateFormModel("");
      this.emitFieldDataChange("", this.oldFieldValue);
    },
    save() {
      this.$refs.esign
        .generate()
        .then((res) => {
          this.mImg = res;
          this.syncUpdateFormModel(res);
          this.emitFieldDataChange(res, this.oldFieldValue);
          this.$set(this.field.options, "defaultValue", res);
          this.dialogTableVisible = false;
        })
        .catch((err) => {
          this.$message({
            message: "请您签名后再保存",
            type: "warning",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../styles/global.scss"; //* form-item-wrapper已引入，还需要重复引入吗？ *//
::v-deep .el-form-item__content {
  display: flex;
}
</style>
