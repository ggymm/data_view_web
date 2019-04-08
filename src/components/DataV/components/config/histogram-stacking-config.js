const HistogramStackingConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'histogramStacking',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select * from histogram_stacking',
      x: 'x',
      y: 'data',
      stack: 'stack',
      name: 'name'
    },
    data: {},
    interval: 8000,
    option: {
      title: { text: '堆叠柱状图', left: 'center', textStyle: { color: '#fff' }},
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }},
      legend: {
        show: true,
        data: [],
        textStyle: { color: '#fff' },
        orient: 'horizontal',
        left: '0',
        top: '0'
      },
      grid: { left: '15%', right: '4%', containLabel: false },
      xAxis: [{
        type: 'category',
        data: [],
        axisLabel: { show: true, textStyle: { color: '#fff' }, rotate: 0 }, // 分类文字的显示及颜色
        axisTick: { show: false }, // 轴上的线，一般不用，设置为false
        axisLine: { show: true, lineStyle: { color: '#ffffff' }}, // 轴线
        splitLine: { show: true, lineStyle: { color: '#ffffff' }}// 图上的分隔线
      }],
      yAxis: [{
        type: 'value',
        axisTick: { show: false },
        axisLabel: { show: true, textStyle: { color: '#fff' }},
        axisLine: { show: true, lineStyle: { color: '#ffffff' }}, // 轴线
        splitLine: { show: true, lineStyle: { color: '#ffffff' }}// 图上的分隔线
      }],
      series: [],
      backgroundColor: 'rgba(255,255,255,0)',
      histcolor: []
    }
  }
}

const getHistogramStackingConfig = function() {
  return new HistogramStackingConfig().config
}

export { getHistogramStackingConfig }
