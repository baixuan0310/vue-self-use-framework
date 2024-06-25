<template>
  <el-form-item label="背景颜色">
    <el-color-picker
      v-model="optionModel.backColor"
      @change="emitDefaultValueChange"
    >
    </el-color-picker>
  </el-form-item>
</template>

<script>
import i18n from "@vFrom/utils/i18n";
import propertyMixin from "@vFrom/components/form-designer/setting-panel/property-editor/propertyMixin";

export default {
  name: "back-color",
  mixins: [i18n, propertyMixin],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
};
</script>

<style scoped></style>
