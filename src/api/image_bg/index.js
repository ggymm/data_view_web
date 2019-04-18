import request from '../../utils/request'
import dataViewBaseUrl from '../baseUrl'

export function getImageBgList(params) {
  return request({
    url: dataViewBaseUrl + 'image/list',
    method: 'get',
    params
  })
}
