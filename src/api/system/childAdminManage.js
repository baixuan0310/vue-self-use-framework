/**
data:2024-3-25
author:zhanghuan
*/

import request from '@/utils/request';

// 获取列表
export function getManageList(data) {
    return request({
        url: `index.php?a=sxadmin&b=agent&c=getList`,
        method: 'post',
        data,
    });
}
// 状态变更
export function enabledChange(data) {
    return request({
        url: `index.php?a=sxadmin&b=agent&c=enabledChange`,
        method: 'post',
        data,
    });
}
// ID获取指定详情
export function getInfoById(data) {
    return request({
        url: `index.php?a=sxadmin&b=agent&c=getInfoById`,
        method: 'post',
        data,
    });
}
// 保存或修改
export function saveOrUpdate(data) {
    return request({
        url: `index.php?a=sxadmin&b=agent&c=save`,
        method: 'post',
        data,
    });
}
// 删除
export function delData(data) {
    return request({
        url: `index.php?a=sxadmin&b=agent&c=delete`,
        method: 'post',
        data,
    });
}
