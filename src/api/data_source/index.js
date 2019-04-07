import request from '../../utils/request'
import dataViewBaseUrl from '../baseUrl'

export function getDataSourcePage(params) {
  return request({
    url: dataViewBaseUrl + 'data_source',
    method: 'get',
    params
  })
}

export function getDataSource(params) {
  return request({
    url: dataViewBaseUrl + 'data_source/' + params,
    method: 'get'
  })
}

export function saveDataSource(params) {
  return request({
    url: dataViewBaseUrl + 'data_source',
    method: 'post',
    data: params
  })
}

export function updateDataSource(params) {
  return request.post(dataViewBaseUrl + 'dataSource/updateDataSource', params)
}

export function deleteDataSource(params) {
  return request({
    url: dataViewBaseUrl + 'data_source/' + params,
    method: 'delete'
  })
}

export function testConnection(params) {
  return request({
    url: dataViewBaseUrl + 'data_source/test_connection',
    method: 'post',
    data: params
  })
}

