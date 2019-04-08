<template>
  <echarts
    v-loading="loading"
    ref="chart"
    :theme="theme"
    :auto-resize="true"
    :init-options="initOption"
    :options="option"
    element-loading-text="Loading..."
    class="chart"
    @click="handleChartClick"/>
</template>
<script>
import { getPlotMapConfig } from '../config/plot-map-config'
export default {
  name: 'PlotMap',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getPlotMapConfig().option
      }
    },
    apiData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      chartType: 'plotMap',
      initOption: getPlotMapConfig().option
    }
  },
  watch: {
    apiData: function() {
      this.setData()
    }
  },
  async mounted() {
    const chart = this.$refs.chart
    this.$emit('init', {
      chart: chart
    })
  },
  methods: {
    handleChartClick(param) {
    },
    setData() {
      var _data = this.apiData
      var series1 =
        {
          name: '弱',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 1,
          large: true,
          itemStyle: {
            normal: {
              shadowBlur: 2,
              shadowColor: 'rgba(37,140,249,1)',
              color: 'rgba(37,140,249,1)'
            }
          },
          data: _data[2]
        }
      var series2 =
        {
          name: '中',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 1,
          large: true,
          itemStyle: {
            normal: {
              shadowBlur: 2,
              shadowColor: 'rgba(14,241,242,1)',
              color: 'rgba(14,241,242,1)'
            }
          },
          data: _data[1]
        }
      var series3 =
        {
          name: '强',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 1,
          large: true,
          itemStyle: {
            normal: {
              shadowBlur: 2,
              shadowColor: 'rgba(255,255,255,1)',
              color: 'rgba(255,255,255,1)'
            }
          },
          data: _data[0]
        }
      this.option.series.push(series1)
      this.option.series.push(series2)
      this.option.series.push(series3)
    }
  }
}
</script>
