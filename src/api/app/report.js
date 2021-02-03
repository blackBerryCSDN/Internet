import request from '@/utils/request'

export function getAppSumReport(data) {
  return request({
    url: 'reportSum/appSumReport',
    method: 'post',
    data
  })
}

export function getServiceListByTaskId(data) {
  return request({
    url: '/service/getServiceListByTaskId?taskId=' + data,
    method: 'post'
  })
}
