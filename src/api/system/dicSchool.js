import request from '@/utils/request'
import store from '@/store/index.js'
let dicAPI = {
    /**
     * 获取校区列表
     * @param {*} data 
     * k 名称 为空查全部
     * @returns 
     */
    getSchoolCampusList(data) {
        return request({
            url: `index.php?a=sxadmin&b=common&c=getSchoolCampusList`,
            method: 'post',
            data
        })
    },
    /**
     * 获取校区/学校 树状列表
     * @param {*} data 
     * type 1 完整数据 包括总校*外校
     * type 0 只有学校数据 不包括外层总校*外校
     * @returns 
     */
    getSchoolTree(data) {
        if (!data.type && data.type !== 0) data = { type: '1' }
        return request({
            url: `index.php?a=sxadmin&b=common&c=getSchoolTree`,
            method: 'post',
            data
        })
    },
    /**
     * 获取年级列表
     * @param {*} data 
     * @returns 
     */
    getGradeList(data) {
        return request({
            url: `index.php?a=sxadmin&b=common&c=getGradeList`,
            method: 'post',
            data
        })
    },
    /**
     * 获取学校列表
     * @param {*} data 
     * school_campus_id 校区ID
     * k 名称 为空查全部
     * @returns 
     */
    getSchoolList(data) {
        return request({
            url: `index.php?a=sxadmin&b=common&c=getSchoolList`,
            method: 'post',
            data
        })
    },
    /**
     * 获取班级列表
     * @param {*} data 
     * school_campus_id 校区ID
     * school_id 所属学校ID
     * grade_id 年级ID
     * @returns 
     */
    getClassList(data) {
        return request({
            url: `index.php?a=sxadmin&b=common&c=getSchoolClassList`,
            method: 'post',
            data
        })
    },
    /**
     * 获取学校对应的专业 查询的总校的专业库
     * @param {*} data 
     * grade_id 年级ID
     * school_id 学校ID
     * @returns 
     */
    getMagorList(data) {
        return request({
            url: `index.php?a=sxadmin&b=common&c=getMagorList`,
            method: 'post',
            data
        })
    },
    /**
     * 获取学校对应的专业 学校查询的 不是查询的总校的
     * @param {*} data 
     * grade_id 年级ID
     * school_id 学校ID
     * @returns 
     */
    getSchoolMajorList(data) {
        return request({
            url: `index.php?a=sxadmin&b=common&c=getSchoolMajorList`,
            method: 'post',
            data
        })
    },
    /**
     * 获取学校对应的专业学制
     * @param {*} data 
     * school_major_id 学校对应的专业ID
     * @returns 
     */
    getSchoolMajorEduSystemList(data) {
        return request({
            url: `index.php?a=sxadmin&b=common&c=getSchoolMajorEduSystemList`,
            method: 'post',
            data
        })
    },
    /**
     * 获取宿舍类型
     * @param {*} data 
     * @returns 
     */
    getPublicRoomTypeList() {
        return request({
            url: `index.php?a=sxadmin&b=common&c=getRoomTypeList`,
            method: 'post'
        })
    },

    /**
     * 获取宿舍楼列表 两个条件一个即可
     * @param {*} data 
     * school_campus_id 所属校区
     * school_id 所属学校
     * @returns 
     */
    getBuildingList(data) {
        return request({
            url: `index.php?a=sxadmin&b=common&c=getBuildingList`,
            method: 'post',
            data
        })
    },
    /**
     * 获取宿舍列表 三个条件有一个就可以了
     * @param {*} data 
     * school_campus_id 所属校区
     * school_id 所属学校
     * building_id 楼ID
     * @returns 
     */
    getRoomList(data) {
        return request({
            url: `index.php?a=sxadmin&b=common&c=getRoomList`,
            method: 'post',
            data
        })
    },
    /**
     * 获取床列表
     * @param {*} data 
     * room_id 宿舍ID
     * @returns 
     */
    getBedList(data) {
        return request({
            url: `index.php?a=sxadmin&b=common&c=getBedList`,
            method: 'post',
            data
        })
    },


    /**
     * 获取管理员列表数据
     * @param {*} data 
     * k_school_id 所属学校
     * @returns 
     */
    getAgentList(data) {
        return request({
            url: `index.php?a=sxadmin&b=common&c=getAgentList`,
            method: 'post',
            data
        })
    }

}
let dic = {
    getSchoolCampusList: 'SET_CAMPUS_LIST',
    getGradeList: 'SET_GRADE_LIST',
    getSchoolList: 'SET_SCHOOL_LIST',
    getMagorList: 'SET_MAGOR_LIST',
    getSchoolMajorList: 'SET_SPECIALITY_LIST',
    getSchoolMajorEduSystemList: 'SET_EDU_SYSTEM_LIST',
    getSchoolTree: 'SET_SCHOOL_TREE_LIST',
    getPublicRoomTypeList: 'SET_ROOM_TYPE_LIST',
    getBuildingList: 'SET_BUILDING_LIST',
    getAgentList: 'SET_AGENT_LIST',
    getClassList: 'SET_CLASS_LIST',
    getRoomList: 'SET_ROOM_LIST',
    getBedList: 'SET_BED_LIST',
}

// 通过类型获取学校字典 加载字典不进钩子vuex保存数据减少请求
export function getSchoolDic(type = '', data = {}) {
    if (type == '') return [];
    // 自定义请求 直接请求并返回某个方法的promise结果
    if (type == 'custom') {
        return dicAPI[data.fun](data.data);
    }
    dicAPI[type](data).then((res) => {
        store.commit('vuexDict/' + dic[type], res.data.item);
    })
}