<template>
  <el-form-item :label="i18nt('designer.setting.labelWidth')">
    <el-input
      type="number"
      v-model="optionModel.labelWidth"
      @input.native="inputNumberHandler"
      min="0"
      class="hide-spin-button"
    ></el-input>
  </el-form-item>
</template>

<script>
import i18n from "@vFrom/utils/i18n";
import propertyMixin from "@vFrom/components/form-designer/setting-panel/property-editor/propertyMixin";

export default {
  name: "labelWidth-editor",
  mixins: [i18n, propertyMixin],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
};
</script>

<style scoped></style>
