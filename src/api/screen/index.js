import request from '../../utils/request'
import dataViewBaseUrl from '../baseUrl'

export function getScreenInstanceParams(params) {
  return request({
    url: dataViewBaseUrl + 'chart/getScreenInstanceParams',
    method: 'get',
    params
  })
}

export function saveScreenInstanceParams(params) {
  return request.post(dataViewBaseUrl + 'chart/saveScreenInstanceParams', params)
}

export function getChartData(params) {
  return request({
    url: dataViewBaseUrl + 'chart_data',
    method: 'get',
    params
  })
}
