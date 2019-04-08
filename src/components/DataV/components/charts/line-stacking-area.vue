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
import { getLineStackingAreaConfig } from '../config/line-stacking-area-config'
export default {
  name: 'LineStackingArea',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getLineStackingAreaConfig().option
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
      chartType: 'lineStackingArea',
      initOption: getLineStackingAreaConfig().option
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
        var map = {}
        map.type = 'line'
        map.data = this.apiData.y[i].data
        map.name = this.apiData.y[i].name
        map.smooth = true
        if (i === 0) {
          map.areaStyle = { 'color': '#3480b9' }
        } else if (i === 1) {
          map.areaStyle = { 'color': '#104dab' }
        } else {
          map.areaStyle = {}
        }
        map.showSymbol = this.option.showSymbol
        list.push(map)
      }
      this.option.series = list
      this.option.legend.data = this.apiData.legend
    }
  }
}
</script>
