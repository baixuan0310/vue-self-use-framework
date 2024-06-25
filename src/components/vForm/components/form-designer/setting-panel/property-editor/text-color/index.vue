<template>
  <el-form-item label="文字颜色">
    <el-color-picker
      v-model="optionModel.textColor"
      @change="emitDefaultValueChange"
    >
    </el-color-picker>
  </el-form-item>
</template>

<script>
import i18n from "@vFrom/utils/i18n";
import propertyMixin from "@vFrom/components/form-designer/setting-panel/property-editor/propertyMixin";

export default {
  name: "text-color",
  mixins: [i18n, propertyMixin],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
};
</script>

<style scoped></style>
