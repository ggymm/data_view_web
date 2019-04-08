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
import { getHistogramComplexConfig } from '../config/histogram-complex-config'
export default {
  name: 'HistogramComplex',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getHistogramComplexConfig().option
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
      chartType: 'HistogramComplex',
      initOption: getHistogramComplexConfig().option
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
      var _self = this
      _self.apiData.x.forEach(function(data, index) {
        _self.option.xAxis[index].data = data
      })
      _self.apiData.value.forEach(function(seriesData, index) {
        _self.option.series[index].name = seriesData.name
        _self.option.series[index].data = seriesData.data
      })
      _self.option.legend.data = _self.apiData.legend
    }
  }
}
</script>
