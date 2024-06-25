<template>
  <el-form-item label="输入框类型">
    <el-select v-model="optionModel.isTextarea">
      <el-option
        v-for="item in isTextarea"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import i18n from "@vFrom/utils/i18n";
import propertyMixin from "@vFrom/components/form-designer/setting-panel/property-editor/propertyMixin";

export default {
  name: "is-textarea",
  mixins: [i18n, propertyMixin],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
  data() {
    return {
      isTextarea: [
        { label: "单行文本框", value: false },
        { label: "多行文本域", value: true },
      ],
    };
  },
};
</script>

<style scoped></style>
