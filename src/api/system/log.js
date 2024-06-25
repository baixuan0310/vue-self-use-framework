import request from '@/utils/request'

// 登录日志
export function getLoginLogList(data) {
    return request({
        url: `index.php?a=sxadmin&b=admin_log&c=getLoginLogList`,
        method: 'post',
        data
    })
}
// 清除登录日志
export function clearLoginLog(data) {
    return request({
        url: `index.php?a=sxadmin&b=admin_log&c=clearLoginLog`,
        method: 'post',
        data
    })
}
// 操作日志
export function getOperateLogList(data) {
    return request({
        url: `index.php?a=sxadmin&b=admin_log&c=getOperateLogList`,
        method: 'post',
        data
    })
}
// 清除操作日志
export function clearOperateLog(data) {
    return request({
        url: `index.php?a=sxadmin&b=admin_log&c=clearOperateLog`,
        method: 'post',
        data
    })
}