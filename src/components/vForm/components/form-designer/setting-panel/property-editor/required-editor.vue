<template>
  <el-form-item :label="i18nt('designer.setting.required')">
    <el-switch v-model="optionModel.required"></el-switch>
  </el-form-item>
</template>

<script>
import i18n from "@vFrom/utils/i18n";

export default {
  name: "required-editor",
  mixins: [i18n],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
};
</script>

<style scoped></style>
