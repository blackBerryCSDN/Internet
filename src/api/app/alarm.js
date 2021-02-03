import request from '@/utils/request'

export function getAlarmList (data) {
  return request({
    url: '/scene/alarmList',
    method: 'post',
    data
  })
}

export function getAlarmCount (data) {
  return request({
    url: '/scene/alarmCount',
    method: 'post',
    data
  })
}
