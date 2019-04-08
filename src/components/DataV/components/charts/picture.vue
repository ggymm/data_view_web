<template>
  <div class="chart">
    <canvas :id="'picture_' + i" style="width: 100%;height: 100%;"/>
  </div>
</template>

<script>
import { getPictureConfig } from '../config/picture-config'
export default {
  name: 'PictureV',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default() {
        return getPictureConfig().option
      }
    },
    i: {
      required: true
    }
  },
  data() {
    return {
      chartType: 'pictureV',
      num: 0
    }
  }
}
</script>

<style scoped>

</style>
