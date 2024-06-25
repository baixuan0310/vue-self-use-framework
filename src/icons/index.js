import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg组件
// 注册为全局组件
Vue.component('svg-icon', SvgIcon)
// import IconSelect from '@/components/IconSelect';
// Vue.component('IconSelect', IconSelect)
const req = require.context('../icons/svg', false, /\.svg$/);

const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

