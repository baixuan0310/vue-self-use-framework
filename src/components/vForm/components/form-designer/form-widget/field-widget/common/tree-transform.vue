<template>
<div>
  <tree-transfer
        :title="title"
        :from_data='fromData'
        :to_data='toData'
        :defaultProps="{ label: 'label' }"
        @addBtn='add'
        :mode='mode'
        height='400px'
        filter
        openAll>
    </tree-transfer>
</div>
</template>

<script>
import treeTransfer from 'el-tree-transfer' // 引入

export default {
  components: {
    treeTransfer
  }, // 注册
  props: {
    url: {
      type: String,
      default: ''
    },
    title: {
      type: Array,
      default: ['未选中', '选中']
    }
  },
  data () {
    return {
      mode: "transfer", // transfer addressList
      fromData: [
      ],
      toData: []
    }
  },
  methods: {

  },
  mounted () {
    if (this.url) {
      this.$axios({
        url: this.url,
        method: 'post'
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.fromData = res.data
        }
      })
    }
  }

}
</script>
