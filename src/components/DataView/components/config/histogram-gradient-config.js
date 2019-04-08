const HistogramGradientConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'histogramGradient',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select * from histogram_gradient',
      value: 'value',
      name: 'x'
    },
    data: {
      x: [],
      value: []
    },
    interval: 8000,
    option: {
      title: {
        text: '渐变柱状图',
        left: 'center',
        textStyle: { color: '#fff' }
      },
      legend: {
        show: false
      },
      backgroundColor: '',
      grid: {
        left: '1%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        data: [],
        name: '',
        axisTick: { show: false },
        axisLine: { show: true, lineStyle: { color: '#ffffff' }},
        splitLine: { show: true, lineStyle: { color: '#ffffff' }},
        axisLabel: { show: true, inside: false, textStyle: { color: '#fff' }, rotate: -45, interval: 0 },
        z: 10
      },
      yAxis: {
        name: '',
        axisTick: { show: false },
        axisLine: { show: true, lineStyle: { color: '#ffffff' }},
        splitLine: { show: true, lineStyle: { color: '#ffffff' }},
        axisLabel: { show: true, textStyle: { color: '#fff' }}
      },
      dataZoom: [{ type: 'inside' }],
      series: [
        {
          type: 'bar',
          itemStyle: {
            normal: { 'color': 'rgba(255,255,255,0)' }
          },
          barWidth: '30%',
          barGap: '-100%',
          barCategoryGap: '0',
          data: [],
          animation: false
        },
        {
          type: 'bar',
          barWidth: '50%',
          itemStyle: { normal: { color: '' }, emphasis: { color: '' }},
          data: []
        }
      ]
    }
  }
}

const getHistogramGradientConfig = function() {
  return new HistogramGradientConfig().config
}

export { getHistogramGradientConfig }
