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
      sql: 'select value from pie_percent',
      value: 'value'
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
      series: [
        {
          type: 'pie',
          radius: ['40%', '55%'],
          center: ['50%', '50%'],
          silent: true,
          label: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 1,
            itemStyle: {
              normal: {
                color: '#ffffff'
              }
            }
          }]
        },
        {
          name: 'main',
          type: 'pie',
          radius: ['55%', '75%'],
          center: ['50%', '50%'],
          label: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 0
            },
            {
              value: 0,
              itemStyle: {
                normal: {
                  color: 'rgba(0,0,0,0)'
                }
              }
            }
          ]
        }
      ],
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const getPiePercentConfig = function() {
  return new PiePercentConfig().config
}

export { getPiePercentConfig }
