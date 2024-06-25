<template>
  <el-form-item label="边框颜色">
    <el-color-picker
      v-model="optionModel.borderColor"
      @change="emitDefaultValueChange"
    >
    </el-color-picker>
  </el-form-item>
</template>

<script>
import i18n from "@vFrom/utils/i18n";
import propertyMixin from "@vFrom/components/form-designer/setting-panel/property-editor/propertyMixin";

export default {
  name: "border-color",
  mixins: [i18n, propertyMixin],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
};
</script>

<style scoped></style>
