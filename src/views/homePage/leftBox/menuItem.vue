<template>
  <!-- @click="toUrl(items.path)" -->
  <div v-if="items" class="box">
    <div
      v-if="items.meta"
      @click="openMenu(items.path, items)"
      class="item"
      :style="{
        'padding-left': indent.paddingLeft,
        'background-color':
          items.path == vuexCommon.nowPath ? vuexCommon.headerBorderColor : '',
      }"
    >
      <svg-icon :iconClass="items.icon" :color="vuexCommon.leftBoxColor">
      </svg-icon>
      <div class="title-text" :style="{ color: vuexCommon.leftBoxColor }">
        {{ items.meta.title }}
      </div>
      <div class="arrow" v-if="items.children && items.children.length > 0">
        <i
          class="el-icon-arrow-right"
          :style="{
            transform: open ? 'rotate(90deg)' : 'rotate(0)',
          }"
        ></i>
      </div>
    </div>
    <div v-if="items.children" v-show="open">
      <menuItem
        v-for="(item, index) in items.children"
        :items="item"
        :key="index"
        :nowPath="vuexCommon.nowPath"
        :level="level + 1"
      ></menuItem>
    </div>
  </div>
</template>
<script>
export default {
  name: "menuItem",
  props: {
    items: {
      type: Object,
      default: () => ({}),
    },
    level: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      open: false,
      rightIcon: "arrow-right",
      downIcon: "arrow-down",
      nowUrl: "",
    };
  },
  computed: {
    indent() {
      return {
        paddingLeft: `${this.level * 20}px`,
      };
    },
  },
  mounted() {
    this.open = this.vuexCommon.nowPath.includes(this.items.path);
  },
  methods: {
    openMenu(path, item) {
      setTimeout(() => {
        this.open = !this.open;
      }, 10);

      if (path && item.children.length == 0) {
        this.toUrl(path);
      }
    },
    toUrl(url) {
      if (url) {
        this.$router.push(url);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 220px;
  position: relative;
  left: 0;
  top: 0;
}

.item {
  min-height: 40px;
  flex: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 20px;

  .svg-icon {
    font-size: 12px;
    margin-right: 6px;
  }

  .title-text {
    flex: 1;
    font-size: 14px;
    font-family: -apple-system, Segoe UI, Roboto, Helvetica Neue,
      Microsoft YaHei, PingFang SC, \5fae\8f6f\96c5\9ed1, sans-serif, system-ui;
  }

  .arrow {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 6px;

    .arrowIcon {
      width: 12px;
      height: 18px;
    }
  }
}

.item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
