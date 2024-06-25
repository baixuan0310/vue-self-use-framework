<template>
  <div>
    <el-form-item label="表格宽度">
      <el-input
        v-model="optionModel.tableWidth"
        placeholder="表格宽度"
      ></el-input>
    </el-form-item>
  </div>
</template>

<script>
import i18n from "@vFrom/utils/i18n";

export default {
  name: "table-width",
  mixins: [i18n],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
};
</script>

<style scoped>
.html-content-editor {
  font-size: 13px;
}
</style>
