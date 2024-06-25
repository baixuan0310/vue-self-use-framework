import request from '@/utils/request'

// 首页校区学生等统计数量
export function indexBi() {
  return request({
    url: `index.php?a=sxadmin&b=index&c=indexBi`,
    method: 'post',
  })
}
// 职工统计(饼状图)
export function userBi() {
  return request({
    url: `index.php?a=sxadmin&b=index&c=userBi`,
    method: 'post',
  })
}
// 在校学生数量统计（堆叠柱状图）
export function studentsInSchoolBi() {
  return request({
    url: `index.php?a=sxadmin&b=index&c=a=sxadmin&b=index&c=studentsInSchoolBi`,
    method: 'post',
  })
}
// 学生退学统计（堆叠柱状图）
export function lossStudentsBi() {
  return request({
    url: `index.php?a=sxadmin&b=index&c=a=sxadmin&b=index&c=lossStudentsBi`,
    method: 'post',
  })
}
// 在校学生男女比例统计(饼状图)
export function studentsSexBi() {
  return request({
    url: `index.php?a=sxadmin&b=index&c=a=sxadmin&b=index&c=studentsSexBi`,
    method: 'post',
  })
}
// 收费统计（堆叠柱状图）
export function feeBi() {
  return request({
    url: `index.php?a=sxadmin&b=index&c=a=sxadmin&b=index&c=feeBi`,
    method: 'post',
  })
}
// 在校学生专业统计（柱状或折线图）
export function studentsMajor() {
  return request({
    url: `index.php?a=sxadmin&b=index&c=a=sxadmin&b=index&c=studentsMajor`,
    method: 'post'
  })
}
// 学生住校/走读比例统计（饼状图）
export function liveCampusBi() {
  return request({
    url: `index.php?a=sxadmin&b=index&c=a=sxadmin&b=index&c=liveCampusBi`,
    method: 'post'
  })
}
// 学校宿舍统计（柱状+折线）
export function roomBi() {
  return request({
    url: `index.php?a=sxadmin&b=index&c=a=sxadmin&b=index&c=roomBi`,
    method: 'post'
  })
}
// 缴费统计（柱状图） type  1:30天/ 2：周/ 3：月/ 4年
export function paymentAmountBi(data) {
  return request({
    url: `index.php?a=sxadmin&b=index&c=a=sxadmin&b=index&c=paymentAmountBi`,
    method: 'post',
    data
  })
}