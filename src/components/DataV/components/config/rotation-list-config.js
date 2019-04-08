const RotationListConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'rotationList',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: '',
      x: '',
      name: ''
    },
    data: [],
    interval: 8000,
    option: {
      column: {
        height: 35,
        fontColor: '#ffffff',
        fontSize: 13
      },
      data: {
        height: 30,
        fontColor: '#e2e2e2',
        fontSize: 12
      },
      speed: 3,
      rowNum: 4
    }
  }
}

const getRotationListConfig = function() {
  return new RotationListConfig().config
}

export { getRotationListConfig }
