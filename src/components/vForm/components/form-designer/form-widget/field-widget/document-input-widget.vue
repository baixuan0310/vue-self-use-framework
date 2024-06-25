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
    <input
      type="text"
      @focus="handleFocusCustomEvent"
      @blur="handleBlurCustomEvent"
      @input="handleInputCustomEvent"
      @change="handleChangeEvent"
      v-model="fieldModel"
      v-if="!field.options.isTextarea"
      :style="{
        'background-color': field.options.backColor,
        'border-radius': field.options.borderRadius,
        border: `1px solid ${field.options.borderColor}`,
        width: field.options.width,
        'text-align': field.options.textAlign,
        color: field.options.textColor,
        height: field.options.height,
        'font-weight': field.options.isBold,
        'line-height': field.options.lineHeight,
        'font-size': field.options.fontSize,
        fontFamily: field.options.fontFamily,
      }"
    />
    <textarea
      type="text"
      @focus="handleFocusCustomEvent"
      @blur="handleBlurCustomEvent"
      @input="handleInputCustomEvent"
      @change="handleChangeEvent"
      v-model="fieldModel"
      v-if="field.options.isTextarea"
      :style="{
        'background-color': field.options.backColor,
        'border-radius': field.options.borderRadius,
        border: `1px solid ${field.options.borderColor}`,
        width: field.options.width,
        'text-align': field.options.textAlign,
        color: field.options.textColor,
        height: field.options.height,
        'font-weight': field.options.isBold,
        'line-height': field.options.lineHeight,
        'font-size': field.options.fontSize,
        fontFamily: field.options.fontFamily,
      }"
    ></textarea>
  </form-item-wrapper>
</template>

<script>
import FormItemWrapper from "./form-item-wrapper";
import emitter from "@vFrom/utils/emitter";
import i18n, { translate } from "@vFrom/utils/i18n";
import fieldMixin from "@vFrom/components/form-designer/form-widget/field-widget/fieldMixin";

export default {
  name: "document-input-widget",
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

  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../../../../styles/global.scss"; //* form-item-wrapper已引入，还需要重复引入吗？ *//
</style>
