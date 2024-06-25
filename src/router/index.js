import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'
import { getToken } from '@/utils/auth'
import { getMyMenuData } from "@/api/login.js";
import cloneDeep from "lodash/cloneDeep"
Vue.use(VueRouter)

const routes = [
  {
    name: "/",
    path: "/",
    meta: {
      name: 'index',
      title: '首页',
    },
    component: () => import('@/views/homePage'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      name: 'login',
      title: '登录',
    },
    component: () => import('@/views/login')
  },
  {
    path: '/changePass',
    name: 'changePass',
    meta: {
      name: 'changePass',
      title: '管理员修改密码',
    },
    component: () => import('@/views/adminUser/changePass')
  },
  {
    path: '/formDesigner',
    name: 'formDesigner',
    meta: {
      name: 'formDesigner',
      title: '表单',
    },
    component: () => import('@/views/formDesigner')
  }
]

const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const router = createRouter();
function clearRoutes() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}
// 生成路由
function createRoute(arr) {
  for (let i = 0; i < arr.length; i++) {
    // 生成meta
    arr[i].meta = {
      title: arr[i].name,
      icon: arr[i].icon
    }
    arr[i].hasChild = arr[i].children && arr[i].children.length > 0 ? true : false;

    // 后端返回url新建path字段
    arr[i].path = arr[i].url;

    // 自动生成name
    arr[i].name = arr[i].path.replace('/', '');

    if (arr[i].children && arr[i].children.length > 0) {
      createRoute(arr[i].children)
    } else {
      // 自动生成component
      // if (!arr[i].path.includes('recruitStudents') && !arr[i].path.includes('log') && !arr[i].path.includes('dormitory')) {
      arr[i].component = require(`../views${arr[i].path}/index.vue`).default;
      router.addRoute(arr[i]);
      // }
    }
  }
}
function updateRoute(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].children && arr[i].children.length > 0) {
      updateRoute(arr[i].children)
    } else {
      arr[i].component = require(`../views${arr[i].path}/index.vue`).default;
      router.addRoute(arr[i]);
    }
  }
}
// add路由
function addRoute(to, next, type) {
  let menuData = store.getters['vuexCommon/menuData'];
  if (menuData && menuData.length > 0) {
    let menu = cloneDeep(menuData);
    // 清空路由
    // clearRoutes();
    // 更新菜单
    updateRoute(menu);
    router.addRoute({ 'path': '*', component: () => import('@/views/404') })
    router.options.routes = menu;
    next({ ...to, replace: true });
  } else {
    // 请求接口返回菜单
    getMyMenuData().then((res) => {
      let menu = res.data.items;
      if (res.code == 200) {
        // 清空路由
        // clearRoutes();
        // 整理菜单
        createRoute(menu);
        router.addRoute({ 'path': '*', component: () => import('@/views/404') })
        router.options.routes = menu;
        store.commit('vuexCommon/SET_MENU_DATA', menu);
        next({ ...to, replace: true });
      }
    });
  }
}
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title + ' - ' + process.env.VUE_APP_NAME;
  // 更新菜单选中
  store.commit('vuexCommon/SET_NOW_PATH', to.path);
  // 需要全屏的页面
  let arr = ['/login'];
  if (arr.includes(to.path)) {
    store.commit('vuexCommon/SET_TOTAL_OR_PART', 1);
  } else {
    store.commit('vuexCommon/SET_TOTAL_OR_PART', 2);
  }
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      let menuData = store.getters['vuexCommon/menuData'];
      if (to.matched.length > 0 && menuData.length > 0) {
        if (router.options.routes.length > 0) {
          // 切换路由清理未完成的请求
          store.dispatch('vuexSystem/clearCancel');
          // 清理字段缓存 例如校区学校那些字典
          store.dispatch('vuexDict/clearDict');
          next();
        } else {
          addRoute(to, next);
        }

      } else {
        addRoute(to, next);
      }
    }
  } else {
    if (to.path === '/login' || to.path === '/formDesigner') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
// 防止连续点击多次路由报错
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}

export default router
