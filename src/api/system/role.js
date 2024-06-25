import request from '@/utils/request'

// 获取角色列表
export function getList(data) {
  return request({
    url: `index.php?a=sxadmin&b=role&c=getList`,
    method: 'post',
    data
  })
}
// 角色状态变更
export function enabledChange(data) {
  return request({
    url: `index.php?a=sxadmin&b=role&c=enabledChange`,
    method: 'post',
    data
  })
}
// ID获取指定角色信息
export function getInfoById(data) {
  return request({
    url: `index.php?a=sxadmin&b=role&c=getInfoById`,
    method: 'post',
    data
  })
}
// 保存或修改角色信息
export function saveOrUpdate(data) {
  return request({
    url: `index.php?a=sxadmin&b=role&c=save`,
    method: 'post',
    data
  })
}
// 删除角色
export function delData(data) {
  return request({
    url: `index.php?a=sxadmin&b=role&c=delete`,
    method: 'post',
    data
  })
}
