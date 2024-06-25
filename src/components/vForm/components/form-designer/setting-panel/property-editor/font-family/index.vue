<template>
  <el-form-item label="字体">
    <el-select v-model="optionModel.fontFamily">
      <el-option
        v-for="item in fontFamily"
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
  name: "font-family",
  mixins: [i18n, propertyMixin],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
  data() {
    return {
      fontFamily: [
        { label: "微软雅黑", value: "Microsoft YaHei" },
        { label: "楷体", value: "KaiTi" },
        { label: "宋体", value: "simsun" },
        { label: "仿宋", value: "FangSong" },
      ],
    };
  },
};
</script>

<style scoped></style>
