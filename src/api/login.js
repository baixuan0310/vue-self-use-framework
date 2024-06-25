import request from '@/utils/request'

export function Login(data) {
  return request({
    url: `index.php?a=sxadmin&b=dl&c=yunzhidl`,
    method: 'post',
    data
  })
}
export function getMyMenuData() {
  return request({
    url: `index.php?a=sxadmin&b=menu&c=getMyMenuData`,
    method: 'post'
  })
}
