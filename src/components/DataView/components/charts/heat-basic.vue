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
import { getHeatBasicConfig } from '../config/heat-basic-config'
export default {
  name: 'HeatBasic',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getHeatBasicConfig().option
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
      chartType: 'heatBasic',
      chart: null,
      initOption: getHeatBasicConfig().option
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
      const item = {
        type: 'heatmap',
        coordinateSystem: 'bmap',
        data: this.apiData,
        pointSize: 5,
        blurSize: 6
      }
      this.option.series.push(item)
    }
  }
}
</script>
