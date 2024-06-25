<template>
  <el-form-item label="是否加粗">
    <el-select v-model="optionModel.isBold">
      <el-option
        v-for="item in isBold"
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
  name: "is-Bold",
  mixins: [i18n, propertyMixin],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
  data() {
    return {
      isBold: [
        { label: "加粗", value: "bold" },
        { label: "不加粗", value: "normal" },
      ],
    };
  },
};
</script>

<style scoped></style>
