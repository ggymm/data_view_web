const LineNormalConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'lineNormal',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select x,y,name from line_normal',
      x: 'x',
      y: 'y'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        text: '普通折线图',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: { readOnly: false },
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {}
        }
      },
      legend: {
        show: true,
        data: [],
        orient: 'vertical',
        left: '0',
        top: '0',
        textStyle: { color: '#fff' }
      },
      grid: {
        left: '1%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        name: '',
        type: 'category', // 坐标轴类型 time category log value,存在时间轴折线图
        axisLabel: { show: true, textStyle: { color: '#fff' }, rotate: 0 },
        splitLine: { show: true, lineStyle: { color: '#ffffff' }},
        axisTick: { show: false },
        boundaryGap: false,
        data: [],
        axisLine: { show: true, lineStyle: { color: '#FFFFFF' }}
      },
      yAxis: {
        name: '',
        type: 'value',
        axisTick: { show: false },
        axisLabel: { show: true, textStyle: { color: '#fff' }},
        splitLine: { show: true, lineStyle: { color: '#ffffff' }},
        axisLine: { show: true, lineStyle: { color: '#FFFFFF' }}
      },
      series: [],
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getLineNormalConfig = function() {
  return new LineNormalConfig().config
}

export { getLineNormalConfig }
