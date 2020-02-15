import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.withCredentials = true

// 创建axios实例
const service = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: '', // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // 添加防止缓存参数
    const timeStr = new Date().getTime().toString()
    let url = config.url
    if (url.indexOf('_t') >= 0) {
      return config
    }
    if (url.indexOf('?') < 0) {
      url = url + '?_t=' + timeStr
    } else if (url.indexOf('?') >= 0) {
      url = url + '&_t=' + timeStr
    }
    config.url = url
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200抛错 可结合自己业务进行修改
     */
    const data = response.data
    if (data.status !== 200) {
      Message({
        message: data.msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.error(error)
    Message({
      message: error.response.data.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
