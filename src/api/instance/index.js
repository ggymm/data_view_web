import request from '../../utils/request'
import dataViewBaseUrl from '../baseUrl'

export function getInstancePage(params) {
  return request({
    url: dataViewBaseUrl + 'screen_instance',
    method: 'get',
    params
  })
}
