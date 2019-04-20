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
import { getLineStackingConfig } from '../config/line-stacking-config'
export default {
  name: 'LineStacking',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getLineStackingConfig().option
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
      chartType: 'lineStacking',
      initOption: getLineStackingConfig().option
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
      var list = []
      for (let i = 0; i < this.apiData.y.length; i++) {
        const map = {}
        map.type = 'line'
        map.data = this.apiData.y[i].data
        map.name = this.apiData.y[i].name
        map.smooth = true
        map.showSymbol = this.option.showSymbol
        list.push(map)
      }
      this.option.series = list
      this.option.legend.data = this.apiData.legend
    }
  }
}
</script>
