<template>
  <el-form-item label="容器高度">
    <el-input v-model="optionModel.height"></el-input>
  </el-form-item>
</template>

<script>
import i18n from "@vFrom/utils/i18n";
import propertyMixin from "@vFrom/components/form-designer/setting-panel/property-editor/propertyMixin";

export default {
  name: "container-height",
  mixins: [i18n, propertyMixin],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
};
</script>

<style scoped></style>
