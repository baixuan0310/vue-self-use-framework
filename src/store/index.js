import Vue from "vue"
import Vuex from "vuex"
import cloneDeep from "lodash/cloneDeep"
import _assign from "lodash/assign"
import _omit from "lodash/omit"

Vue.use(Vuex)

let lifeData = {}

try {
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = JSON.parse(window.localStorage.getItem("lifeData")) || {}
} catch (e) { }

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ["vuexCommon", "vuexUser"]

// 保存变量到本地存储中
const saveLifeData = function (key, value) {
	// 判断变量名是否在需要存储的数组中
	if (saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = JSON.parse(window.localStorage.getItem("lifeData")) || {}
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {}
		tmp[key] = value
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		window.localStorage.setItem("lifeData", JSON.stringify(tmp))
	}
}

class MakeModule {
	constructor(options) {
		// 最后的返回的
		this.module = {
			namespaced: true,
			state: {},
			getters: {},
			mutations: {},
			actions: {},
		}
		this.loaclData = options._loaclData
		options.state = _assign({}, _omit(options, ["state", "getters", "mutations", "actions", "namespaced", "_loaclData"]), options.state)
		this._modulesBuilder(options)
	}

	_modulesBuilder({ state = {}, getters = {}, mutations = {}, actions = {}, namespaced = true }) {
		Object.keys(state).map((k) => {
			this._modulesSingleBuilder({
				k,
				v: this.loaclData && this.loaclData[k] ? this.loaclData[k] : state[k],
			})
		})
		this.module.getters = _assign({}, this.module.getters, getters)
		this.module.mutations = _assign({}, this.module.mutations, mutations)
		this.module.actions = _assign({}, this.module.actions, actions)
		this.module.namespaced = namespaced
	}
	_modulesSingleBuilder({ k, v = null }) {
		let label = str2label(k)
		this.module.state[k] = v
		this.module.getters[k] = (state) => state[k]
		this.module.mutations[`SET_${label}`] = (state, vaule) => {
			state[k] = cloneDeep(vaule);
		}
		this.module.actions[`set${k.charAt(0).toUpperCase()}${k.substr(1)}`] = ({ commit }, value) => {
			commit(`SET_${label}`, cloneDeep(value))
		}
	}
}

const modulesFiles = require.context("./modules", true, /\.js$/)

// 转化
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	// set './app.js' => 'app'
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1")
	const value = modulesFiles(modulePath)
	if (lifeData[moduleName]) {
		modules[moduleName] = new MakeModule({ ...value.default, _loaclData: lifeData[moduleName] })["module"] // module(value.default)
	} else {
		modules[moduleName] = new MakeModule(value.default)["module"] // module(value.default)
	}
	return modules
}, {})

/**
 * 改变字符串为标签样式 userInfo => USER_INFO
 * @param name
 * @returns {string}
 */
function str2label(name) {
	let result = ""
	//首字母小写执行标签化
	if (!name.charAt(0).match(/[A-Z]+/)) {
		//根据大写字母进行分组
		let names = name.split(/[A-Z]+/)
		//循环数组
		for (var index = 0; index < names.length; index++) {
			let item = names[index]
			//判断index>0时进行添加字母处理
			if (index > 0) {
				//分组时干掉的字母位置
				var strlength = 0
				//循环获得字母位置
				for (var i = index; i > 0; i--) {
					strlength += names[i - 1].length
				}
				//从源字符串中截取字母
				var str = name.substring(strlength, strlength + 1)
				//将字母添加到相应位置
				names[index] = str + item
				//组合成相应标签格式
				result += "_" + names[index].toUpperCase()
			} else {
				//数组第一个不用加下划线
				result = names[index].toUpperCase()
			}
		}
	} else {
		result = name.toUpperCase()
	}
	return result
}

export default new Vuex.Store({
	modules,
	mutations: {
		// 重置vuex本地储存状态
		resetStore(state) {
			Object.keys(state).forEach((key) => {
				state[key] = cloneDeep(window.SITE_CONFIG["storeState"][key])
			})
		},
		$setVuexStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split(".")
			let saveKey = ""
			let len = nameArr.length
			if (nameArr.length >= 2) {
				let obj = state[nameArr[0]]
				for (let i = 1; i < len - 1; i++) {
					obj = obj[nameArr[i]]
				}
				obj[nameArr[len - 1]] = payload.value
				saveKey = nameArr[0]
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value
				saveKey = payload.name
			}
			saveLifeData(saveKey, state[saveKey])
		},
	},
	strict: process.env.NODE_ENV !== "production",
})
