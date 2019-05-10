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
import { getHistogramGradientConfig } from '../config/histogram-gradient-config'
export default {
  name: 'HistogramGradient',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getHistogramGradientConfig().option
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
      chartType: 'histogramGradient',
      initOption: getHistogramGradientConfig().option
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
      var dataShadow = []
      for (var i = 0; i < this.apiData.data.length; i++) {
        dataShadow.push(this.apiData.yMax)
      }
      this.option.xAxis.data = this.apiData.dataAxis
      this.option.series[0].data = dataShadow
      this.option.series[1].data = this.apiData.data
    }
  }
}
</script>
