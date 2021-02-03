import request from '@/utils/request'

export function testUrl() {
  return request({
    url: '/testUrl',
    method: 'get'
  })
}
