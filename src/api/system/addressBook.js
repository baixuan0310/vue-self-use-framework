import request from '@/utils/request'

// 获取通讯录列表
export function getList(data) {
  return request({
    url: `index.php?a=sxadmin&b=user&c=getUserList`,
    method: 'post',
    data
  })
}
// 通讯录状态变更
export function enabledChange(data) {
  return request({
    url: `index.php?a=sxadmin&b=user&c=enabledChange`,
    method: 'post',
    data
  })
}
// ID获取指定用户详情
export function getInfoById(data) {
  return request({
    url: `index.php?a=sxadmin&b=user&c=viewUser`,
    method: 'post',
    data
  })
}
// 保存或修改通讯录信息
export function saveOrUpdate(data) {
  return request({
    url: `index.php?a=sxadmin&b=user&c=saveUser`,
    method: 'post',
    data
  })
}
// 删除通讯录
export function delData(data) {
  return request({
    url: `index.php?a=sxadmin&b=user&c=delUser`,
    method: 'post',
    data
  })
}
