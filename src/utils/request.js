import _this from '../main.js'
import axios from 'axios'
import store from '@/store/index.js'
import { Message, MessageBox } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'
let qs = require('qs');

let url = process.env.NODE_ENV === 'production' ? '/' : '/api';
const service = axios.create({
    baseURL: url,
    timeout: 10000
})
service.interceptors.request.use(
    config => {
        // 每个请求存入vuex中
        config.cancelToken = new axios.CancelToken((cancel) => {
            store.dispatch('vuexSystem/pushCancel', { cancelToken: cancel })
        });
        config.data = qs.stringify(config.data);
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        config.headers['E-Sxadmin-Token'] = getToken();
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    response => {
        // 判断是否是get请求=下载文件
        if(response.config.method === "get"){
            return response
        }
        const res = response.data;
        if (res.hasOwnProperty('code') && res.code === 200) return res;
        Message({
            message: res.msg || 'Error',
            type: 'error',
            duration: 5 * 1000
        })
        if (res.code === -1) {
            // 登录失效 主动释放中断其他所有请求 清理vuex
            store.dispatch('vuexSystem/clearCancel');
            removeToken();
            _this.$router.push({ path: '/login' })
            return Promise.reject(res);
        }
        if (res.hasOwnProperty('code') && res.code !== 200) {
            return Promise.reject(new Error(res.msg || 'Error'))
        }
    },
    error => {
        if (axios.isCancel(error)) {
            return new Promise(() => { });
        } else {
            let _errorMsg = error.response ? error.response.data.msg : error.message;
            if (_errorMsg !== '' && _errorMsg !== null) {
                Message({
                    message: _errorMsg,
                    type: 'error',
                    duration: 3 * 1000,
                    dangerouslyUseHTMLString: false
                });
            }
            return Promise.reject(error);
        }
    }
)

export default service
