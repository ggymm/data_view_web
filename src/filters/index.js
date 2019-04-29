// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '../utils'

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function jobStatusFilter(status) {
  const statusMap = {
    1: '运行',
    2: '停止',
    100: '等待',
    200: '等待'
  }
  return statusMap[status]
}

export function processTypeFilter(status) {
  const statusMap = {
    1: '资源库转换',
    2: '文件转换',
    3: '资源库作业',
    4: '文件作业'
  }
  return statusMap[status]
}

export function modelerStatusFilter(status) {
  const statusMap = {
    1: '服务启动',
    2: '服务停止',
    100: '构建服务',
    200: '正在停止'
  }
  return statusMap[status]
}

export function formatNull(text) {
  return text === null || text === undefined ? 0 : text
}

export function openOrClose(text) {
  return text === 0 ? '未开启' : '开启'
}

export function numFormat(value) {
  if (!value) return ' '
  return Number(value).toFixed(0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
}
