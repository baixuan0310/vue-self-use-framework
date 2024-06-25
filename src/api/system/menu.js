import request from '@/utils/request'

export function getMenuTreeData(data) {
  return request({
    url: `index.php?a=sxadmin&b=menu&c=getMenuTreeData`,
    method: 'post',
    data
  })
}
export function getMenuListForSelect(data) {
  return request({
    url: `index.php?a=sxadmin&b=menu&c=getMenuListForSelect`,
    method: 'post',
    data
  })
}
export function getMenu(data) {
  return request({
    url: `index.php?a=sxadmin&b=menu&c=getInfoById`,
    method: 'post',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: `index.php?a=sxadmin&b=menu&c=save`,
    method: 'post',
    data
  })
}
export function delData(data) {
  return request({
    url: `index.php?a=sxadmin&b=menu&c=delete`,
    method: 'post',
    data
  })
}
export function enabledChange(data) {
  return request({
    url: `index.php?a=sxadmin&b=menu&c=enabledChange`,
    method: 'post',
    data
  })
}
