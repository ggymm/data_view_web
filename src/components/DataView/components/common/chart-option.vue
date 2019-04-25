<template>
  <div>
    <component
      :is="OptionComponentMap[item.chartType]"
      :item="item"
      :data-source-list="dataSourceList"
      @handleDeleteItem="handleDeleteItem"
      @handleEditOption="handleEditOption"
    />
    <el-dialog
      title="编辑图表Option"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="optionJsonDialogVisible"
      width="60%"
    >
      <codemirror
        v-model="option"
        :options="editorOption"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="optionJsonDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="changeOption">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  PlotBubbleOption,
  PlotMapOption,

  LineNormalOption,
  LineCoordinateOption,
  LineStackingOption,
  LineStackingAreaOption,

  HistogramGradientOption,
  HistogramGradientHorizontalOption,
  HistogramStackingOption,
  HistogramComplexOption,

  MapChinaOption,
  MapWorldOption,
  MapProvinceOption,

  PieNormalOption,
  PieRingOption,
  Pie2DOption,
  PiePercentOption,
  PieRingsOption,

  RadarBasicOption,

  HeatBasicOption,
  HeatProvinceOption,
  HeatMapOption,
  HeatMapLargePiecewiseOption,

  RelationOneOption,
  RelationTwoOption,
  RelationThreeOption,
  RelationFourOption,
  RelationFiveOption,

  WordCloudOption,
  RotationListOption,
  CounterOption,
  TitleTextOption,
  ProgressBarOption,
  PictureOption
} from '../options'

import OptionComponentMap from '../../config/option-component-map'
import { codemirror } from 'vue-codemirror-lite'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css'

export default {
  name: 'ChartOption',
  components: {
    PlotBubbleOption,
    PlotMapOption,

    LineNormalOption,
    LineCoordinateOption,
    LineStackingOption,
    LineStackingAreaOption,

    HistogramGradientOption,
    HistogramGradientHorizontalOption,
    HistogramStackingOption,
    HistogramComplexOption,

    MapChinaOption,
    MapWorldOption,
    MapProvinceOption,

    PieNormalOption,
    PieRingOption,
    Pie2DOption,
    PiePercentOption,
    PieRingsOption,

    RadarBasicOption,

    HeatBasicOption,
    HeatProvinceOption,
    HeatMapOption,
    HeatMapLargePiecewiseOption,

    RelationOneOption,
    RelationTwoOption,
    RelationThreeOption,
    RelationFourOption,
    RelationFiveOption,

    WordCloudOption,
    RotationListOption,
    CounterOption,
    TitleTextOption,
    ProgressBarOption,
    PictureOption,

    codemirror
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    dataSourceList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      OptionComponentMap,
      optionJsonDialogVisible: false,
      editorOption: {
        tabSize: 4,
        mode: 'application/json',
        theme: 'idea',
        lineNumbers: true,
        line: true
      },
      option: ''
    }
  },
  methods: {
    handleDeleteItem(item) {
      this.$emit('handleDeleteItem', item)
    },
    handleEditOption(option) {
      this.optionJsonDialogVisible = true
      this.option = this.formatJson(JSON.stringify(option))
    },
    changeOption() {
      this.optionJsonDialogVisible = false
      console.log(JSON.parse(this.option))
      this.item.option = JSON.parse(this.option)
    },
    formatJson(json, options) {
      let reg = null
      let formatted = ''
      let pad = 0
      const PADDING = '    '
      options = options || {}
      options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true)
      options.spaceAfterColon = options.spaceAfterColon !== false
      if (typeof json !== 'string') {
        json = JSON.stringify(json)
      } else {
        json = JSON.parse(json)
        json = JSON.stringify(json)
      }
      reg = /([{}])/g
      json = json.replace(reg, '\r\n$1\r\n')
      reg = /([\[\]])/g
      json = json.replace(reg, '\r\n$1\r\n')
      reg = /(,")/g
      json = json.replace(reg, ',\r\n"')
      reg = /(\r\n\r\n)/g
      json = json.replace(reg, '\r\n')
      reg = /\r\n,/g
      json = json.replace(reg, ',')
      if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /:\r\n{/g
        json = json.replace(reg, ':{')
        reg = /:\r\n\[/g
        json = json.replace(reg, ':[')
      }
      if (options.spaceAfterColon) {
        reg = /:/g
        json = json.replace(reg, ':')
      }
      (json.split('\r\n')).forEach(function(node) {
        let indent = 0
        let padding = ''

        if (node.match(/{$/) || node.match(/\[$/)) {
          indent = 1
        } else if (node.match(/}/) || node.match(/]/)) {
          if (pad !== 0) {
            pad -= 1
          }
        } else {
          indent = 0
        }

        for (let i = 0; i < pad; i++) {
          padding += PADDING
        }

        formatted += padding + node + '\r\n'
        pad += indent
      }
      )
      return formatted
    }
  }
}
</script>

<style>

</style>
