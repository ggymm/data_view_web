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
      type: Array,
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
      this.option.dataset.source = this.apiData
      var size = this.apiData[0].length
      for (var i = 0; i < size - 1; i++) {
        this.option.series.push({
          'type': 'line'
        })
      }
      console.log(JSON.stringify(this.option))
    }
  }
}
</script>
