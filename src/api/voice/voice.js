import request from '@/utils/request'

export function getAllowCitys() {
  return request({
    url: 'yuYinTask/getCity',
    method: 'get'
  })
}

export function addTask(data) {
  return request({
    url: 'yuYinTask/addTask',
    method: 'post',
    data
  })
}

export function getVoiceSumReport(data) {
  return request({
    url: 'voiceAppReport/sumReport',
    method: 'post',
    data
  })
}

export function getTaskReport(data) {
  return request({
    url: 'voiceAppReport/taskReport',
    method: 'post',
    data
  })
}
