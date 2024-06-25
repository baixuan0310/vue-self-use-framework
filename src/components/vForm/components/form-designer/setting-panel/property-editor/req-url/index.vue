<template>
  <div>
    <el-form-item label="请求地址">
      <el-input
        v-model="optionModel.reqUrl"
        placeholder="数据请求地址"
      ></el-input>
    </el-form-item>
  </div>
</template>

<script>
import i18n from "@vFrom/utils/i18n";

export default {
  name: "req-url",
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
