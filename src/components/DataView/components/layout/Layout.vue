<template>
  <div
    id="data-view-container-layout"
    ref="item"
    :style="{background: backgroundColor,
             backgroundImage: backgroundImg,
             backgroundRepeat: 'no-repeat',
             backgroundSize: '100% 100%'}"
    class="data-view-container-layout">
    <slot/>
  </div>
</template>

<script>
import Vue from 'vue'
import Item from './Item'
export default {
  name: 'Layout',
  provide() {
    return {
      eventBus: null
    }
  },
  components: {
    Item
  },
  props: {
    backgroundColor: {
      type: String,
      required: true,
      default: '#263546'
    },
    backgroundImg: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
    }
  },
  watch: {},
  created() {
    var self = this
    self.dragEventHandler = function(eventType, i, x, y, h, w) {
      self.dragEvent(eventType, i, x, y, h, w)
    }
    self.resizeEventHandler = function(eventType, i, x, y, h, w) {
      self.resizeEvent(eventType, i, x, y, h, w)
    }
    self._provided.eventBus = new Vue()
    self.eventBus = self._provided.eventBus
    self.eventBus.$on('dragEvent', self.dragEventHandler)
    self.eventBus.$on('resizeEvent', self.resizeEventHandler)
  },
  beforeDestroy: function() {
    this.eventBus.$off('dragEvent', this.dragEventHandler)
    this.eventBus.$off('resizeEvent', this.resizeEventHandler)
  },
  methods: {
    dragEvent: function(eventName, id, x, y, h, w) {
      // 可能会有什么操作之类的
      // 告诉Item层更新元素状态
      this.eventBus.$emit('compact')
      var layout = { id: id, x: x, y: y }
      if (eventName === 'dragend') this.$emit('layoutUpdated', layout)
    },
    resizeEvent: function(eventName, id, x, y, h, w) {
      // 可能会有什么操作之类的
      // 告诉Item层更新元素状态
      this.eventBus.$emit('compact')
      var size = { id: id, h: h, w: w }
      if (eventName === 'resizeend') this.$emit('sizeUpdate', size)
    }
  }
}
</script>
