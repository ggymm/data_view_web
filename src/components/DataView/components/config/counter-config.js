const CounterConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'counter',
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
      fontColor: '#ffffff',
      fontSize: 12,
      fontWeight: 'normal',
      textAlign: 'center',
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getCounterConfig = function() {
  return new CounterConfig().config
}

export { getCounterConfig }
