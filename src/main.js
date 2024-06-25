import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 封装vuex 混入所有data()
import vuexStore from '@/store/$setVuex.mixin.js';
Vue.mixin(vuexStore);

//1.引入normalize.css
import 'normalize.css/normalize.css';

//2.引入elementui

import modal from '@/utils/modal';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$message = modal;

// 引入项目svg组件
import '@/icons';

// 图片文件上传
import ImageUpload from '@/components/ImageUpload';
import FileUpload from '@/components/FileUpload';
// 图片预览组件
import ImagePreview from '@/components/ImagePreview';
Vue.component('FileUpload', FileUpload);
Vue.component('ImageUpload', ImageUpload);
Vue.component('ImagePreview', ImagePreview);

// 打印
import Print from 'vue-print-nb'
Vue.use(Print)

// echarts组件封装
import ChartBlock from '@/components/Echarts/index.vue'
Vue.use(ChartBlock)

//签名组件--签字版
import vueEsign from 'vue-esign'
Vue.use(vueEsign)

import { resetForm } from '@/utils/utils';
Vue.prototype.resetForm = resetForm;

Vue.config.productionTip = false;

let vue = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

export default vue;
