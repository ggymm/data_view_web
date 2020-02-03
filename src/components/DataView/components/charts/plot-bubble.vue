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
import { getPlotBubbleConfig } from '../config/plot-bubble-config'

export default {
  name: 'PlotBubble',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getPlotBubbleConfig().option
      }
    },
    apiData: {
      type: Object,
      default() {
        return {}
      }
    },
    theme: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      chartType: 'plotBubble',
      initOption: getPlotBubbleConfig().option
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
      this.option.legend.data = this.apiData.legend
      const itemStyle = {
        normal: {
          opacity: 0.8,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
      const _data = this.apiData.data
      this.option.series = []
      for (let i = 0; i < _data.length; i++) {
        const series = {
          name: _data[i].name,
          type: 'scatter',
          symbolSize: function(data) {
            return data[2]
          },
          itemStyle: itemStyle,
          data: _data[i].value
        }
        this.option.series.push(series)
      }
      console.log(this.option.series)
    }
  }
}
</script>
