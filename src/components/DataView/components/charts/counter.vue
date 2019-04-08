<template>
  <div v-loading="loading" :style="{backgroundColor: option.backgroundColor}" class="chart">
    <div
      :style="{
        color: option.fontColor,
        fontSize: option.fontSize + 'px',
        fontWeight: option.fontWeight,
        textAlign: option.textAlign
    }">
      {{ num }}
    </div>
  </div>
</template>

<script>
import { getCounterConfig } from '../config/counter-config'
export default {
  name: 'Counter',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getCounterConfig().option
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
      chartType: 'counter',
      num: 0
    }
  },
  watch: {
    apiData: {
      deep: true,
      handler() {
        this.num = this.apiData.data
      }
    }
  }
}
</script>

<style scoped>

</style>
