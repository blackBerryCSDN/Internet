import request from '@/utils/request'

export function getMonthArray () {
  const monthArray = []
  for (var i = 1; i <= 31; i++) {
    var o = {}
    o.label = i + '日'
    o.value = i
    monthArray.push(o)
  }
  return monthArray
}

export function getWeekArray () {
  const weekArray = []
  weekArray.push({label: '周一', value: '1'})
  weekArray.push({label: '周二', value: '2'})
  weekArray.push({label: '周三', value: '3'})
  weekArray.push({label: '周四', value: '4'})
  weekArray.push({label: '周五', value: '5'})
  weekArray.push({label: '周六', value: '6'})
  weekArray.push({label: '周日', value: '7'})
  return weekArray
}

export function getHourList () {
  const hourList = []
  for (var i = 0; i <= 23; i++) {
    hourList.push((i < 10 ? '0' + i : i) + ':00')
  }
  return hourList
}

export function getHourPeriodList () {
  const period = []
  for (var i = 0; i <= 23; i++) {
    period.push((i < 10 ? '0' + i : i) + ':00-' + (i + 1 < 10 ? '0' + (i + 1) : (i + 1)) + ':00')
  }
  return period
}

export function getScene (data) {
  return request({
    url: '/scene/getScene',
    method: 'post',
    data
  })
}

export function addTask (data) {
  return request({
    url: '/task/addTask',
    method: 'post',
    data
  })
}

export function getTaskInfoList (data) {
  return request({
    url: '/task/list',
    method: 'post',
    data
  })
}
