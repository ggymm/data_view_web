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
import { getHistogramStackingConfig } from '../config/histogram-stacking-config'
export default {
  name: 'HistogramStacking',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getHistogramStackingConfig().option
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
      chartType: 'HistogramStacking',
      initOption: getHistogramStackingConfig().option
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
      this.option.xAxis.data = this.apiData.x
      this.option.legend.data = this.apiData.legend
      var list = []
      this.apiData.value.forEach(function(seriesData, index) {
        var obj = {
          name: seriesData.name,
          type: 'bar',
          data: seriesData.data,
          stack: seriesData.stack
        }
        list.push(obj)
      })
      this.option.series = list
    }
  }
}
</script>
