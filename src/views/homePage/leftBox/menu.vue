<template>
  <div
    class="container"
    v-if="vuexCommon.leftBoxHide"
    :style="{
      'background-image': `url(${vuexCommon.MenuImg}`,
      color: `${vuexCommon.leftBoxColor}`,
    }"
  >
    <!-- <div class="search">
      <input
        type="text"
        v-model="minput"
        @input="filterMenu(minput)"
        :style="{
          height: '32px',
          paddingLeft: '20px',
          fontSize: '16px',
          zIndex: '99',
          color: `${vuexCommon.leftBoxColor}`,
        }"
        @blur="showPlaceholder = true"
        @focus="showPlaceholder = false"
        class="minput"
      />
      <div
        class="placeholder"
        v-if="showPlaceholder && !minput"
        :style="{ color: vuexCommon.leftBoxColor }"
      >
        <i class="el-icon-search"></i
        ><span
          style="
            font-size: 12px;
            margin-left: 4px;
            line-height: 18px;
            margin-bottom: 2px;
          "
          >搜索...</span
        >
      </div>
    </div> -->
    <div class="menuList">
      <div class="menu-item" v-for="(item, index) in menuList" :key="index">
        <menu-Item :items="item" :level="1" :key="index" />
      </div>
    </div>
  </div>
</template>
<script>
import menuItem from "./menuItem.vue";
export default {
  computed: {},
  components: {
    menuItem,
  },

  data() {
    return {
      minput: "",
      showPlaceholder: true,
      menuList: [],
    };
  },
  watch: {
    "vuexCommon.menuData": {
      handler: function () {
        this.menuList = this.vuexCommon.menuData;
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    filterMenu(val) {
      if (val) {
        this.menuList = this.menuList.filter((item) => {
          return item.meta.title.includes(val);
        });
      } else {
        this.menuList = this.vuexCommon.menuData;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  width: 220px !important;
  background-size: cover;
  .search {
    height: 50px;
    padding: 10px 30px 0 10px;
    display: flex;
    align-content: center;
    position: relative;

    .placeholder {
      position: absolute;
      display: flex;
      justify-content: center;
      top: 16px;
      left: 32px;
      align-items: center;
    }

    .minput {
      background: transparent;
      color: rgba(255, 255, 255, 0.8);
      border: none !important;
      padding-left: 20px !important;
      padding-top: 10px;
    }
  }

  .menuList {
    flex: 1;
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .menu-item {
      display: flex;
      width: 100%;
    }
  }
}

input {
  outline: none;
  padding: 0 !important;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

//at.alicdn.com/t/c/font_1826843_998n70vh72t.css
</style>
