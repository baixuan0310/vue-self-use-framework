import request from '@/utils/request'

// 获取列表
export function getList(data) {
    return request({
        url: `index.php?a=sxadmin&b=admin&c=getList`,
        method: 'post',
        data
    })
}
// 状态变更
export function enabledChange(data) {
    return request({
        url: `index.php?a=sxadmin&b=admin&c=enabledChange`,
        method: 'post',
        data
    })
}
// ID获取指定详情
export function getInfoById(data) {
    return request({
        url: `index.php?a=sxadmin&b=admin&c=getInfoById`,
        method: 'post',
        data
    })
}
// 保存或修改
export function saveOrUpdate(data) {
    return request({
        url: `index.php?a=sxadmin&b=admin&c=save`,
        method: 'post',
        data
    })
}
// 删除
export function delData(data) {
    return request({
        url: `index.php?a=sxadmin&b=admin&c=delete`,
        method: 'post',
        data
    })
}
// 修改密码
export function modifyPassword(data) {
    return request({
        url: `index.php?a=sxadmin&b=admin&c=modifyPassword`,
        method: 'post',
        data
    })
}

