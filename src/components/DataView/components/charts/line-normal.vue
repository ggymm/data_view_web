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
import { getLineNormalConfig } from '../config/line-normal-config'
export default {
  name: 'LineNormal',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getLineNormalConfig().option
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
      chartType: 'lineNormal',
      initOption: getLineNormalConfig().option
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
      const map = {}
      map.type = 'line'
      map.data = this.apiData.y[0].data
      map.name = this.apiData.y[0].name
      map.smooth = false
      map.showSymbol = this.option.showSymbol
      list.push(map)
      this.option.series = list
    }
  }
}
</script>
