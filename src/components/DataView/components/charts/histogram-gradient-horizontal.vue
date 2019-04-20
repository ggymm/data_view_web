<template>
  <echarts
    ref="chart"
    v-loading="loading"
    :theme="theme"
    :auto-resize="true"
    :init-options="initOption"
    :options="option"
    element-loading-text="Loading..."
    class="chart"
    @click="handleChartClick"
  />
</template>
<script>
import { getHistogramGradientHorizontalConfig } from '../config/histogram-gradient-horizontal-config'
export default {
  name: 'HistogramGradientHorizontal',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getHistogramGradientHorizontalConfig().option
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
      chartType: 'histogramGradualHorizontal',
      initOption: getHistogramGradientHorizontalConfig().option
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
      var list = []
      this.apiData.x.forEach(function(seriesData, index) {
        var obj = {
          name: seriesData.name,
          type: 'bar',
          label: {
            normal: {
              show: false,
              position: 'inside'
            }
          },
          data: seriesData.value
        }
        list.push(obj)
      })
      this.option.series = list
      this.option.yAxis.data = this.apiData.y
      this.option.legend.data = this.apiData.legend
    }
  }
}
</script>
