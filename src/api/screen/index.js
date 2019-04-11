import request from '../../utils/request'
import dataViewBaseUrl from '../baseUrl'

export function getChartData(params) {
  return request({
    url: dataViewBaseUrl + 'chart_data',
    method: 'get',
    params
  })
}
