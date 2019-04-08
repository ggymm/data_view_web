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
import { getWordCloudConfig } from '../config/word-cloud-config'
export default {
  name: 'WordCloud',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getWordCloudConfig().option
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
      chartType: 'wordCloud',
      initOption: getWordCloudConfig().option
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
      this.option.series[0].data = this.apiData
    }
  }
}
</script>
