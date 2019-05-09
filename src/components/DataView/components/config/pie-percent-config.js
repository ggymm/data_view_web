const PiePercentConfig = function() {
  this.config = {
    x: 0,
    y: 0,
    width: 350,
    height: 250,
    chartType: 'piePercent',
    choose: 'false',
    refresh: 'false',
    chartData: {
      dataSourceType: '',
      database: '',
      fileName: '',
      sql: 'select * from pie',
      value: 'value',
      name: 'name'
    },
    data: [],
    interval: 8000,
    option: {
      title: {
        text: '环形百分比图',
        x: 'center',
        y: 'center',
        textStyle: {
          color: '#ffffff',
          fontSize: 20
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: [],
        textStyle: {
          color: '#ffffff'
        }
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['40%', '55%'],
          label: {
            normal: {
              formatter: ' {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            }
          },
          data: []
        }
      ],
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getPiePercentConfig = function() {
  return new PiePercentConfig().config
}

export { getPiePercentConfig }
