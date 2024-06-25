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
    <el-date-picker
      ref="fieldEditor"
      :type="field.options.type"
      v-model="fieldModel"
      class="full-width-input"
      :disabled="field.options.disabled"
      :readonly="field.options.readonly"
      style="flex: 1"
      :size="field.options.size"
      :clearable="field.options.clearable"
      :editable="field.options.editable"
      :format="field.options.format"
      :value-format="field.options.valueFormat"
      :start-placeholder="
        field.options.startPlaceholder ||
        i18nt('render.hint.startDatePlaceholder')
      "
      :end-placeholder="
        field.options.endPlaceholder || i18nt('render.hint.endDatePlaceholder')
      "
      @focus="handleFocusCustomEvent"
      @blur="handleBlurCustomEvent"
      @change="handleChangeEvent"
    >
    </el-date-picker>
    <div style="width: 100px; margin-left: 20px; color: #000">
      共{{ intervalTime }}天
    </div>
  </form-item-wrapper>
</template>

<script>
import FormItemWrapper from "./form-item-wrapper";
import emitter from "@vFrom/utils/emitter";
import i18n, { translate } from "@vFrom/utils/i18n";
import fieldMixin from "@vFrom/components/form-designer/form-widget/field-widget/fieldMixin";

export default {
  name: "date-range-widget",
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
      // intervalTime: 0,
    };
  },
  computed: {
    intervalTime() {
      if (this.fieldModel && this.fieldModel[0] && this.fieldModel[1]) {
        let diffTime =
          new Date(this.fieldModel[1]) - new Date(this.fieldModel[0]);
        return (diffTime / 86400000).toFixed(0);
      } else {
        return 0;
      }
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
    mhandleChangeEvent() {},
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../styles/global.scss"; //* form-item-wrapper已引入，还需要重复引入吗？ *//

.full-width-input {
  width: 100% !important;
}
</style>
