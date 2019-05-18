<template>
  <div
    :style="{width: panelConfig.panelWidth + 'px', height: panelConfig.panelHeight + 'px'}"
  >
    <v-loading v-show="loading" />
    <div class="data-view-preview-container">
      <layout
        :background-color="panelConfig.backgroundColor"
        :background-img="'url(http://localhost:8888/api/v1/data_view/image/' + panelConfig.backgroundImg + ')'"
      >
        <item
          v-for="item in slices"
          :key="item.slice_id"
          :x.sync="item.x"
          :y.sync="item.y"
          :width.sync="item.width"
          :height.sync="item.height"
          :i="item.i"
          :panel-width="panelConfig.panelWidth"
          :panel-height="panelConfig.panelHeight"
          drag-allow-from=".chart,.data-view-item"
          drag-ignore-from=""
        >
          <Slice
            :id="item.i"
            :item="item"
            @transferHandleItemChoose="handleItemChoose(item)"
          />
        </item>
      </layout>
    </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/heatmap'
import 'echarts/lib/chart/graph'
import 'echarts-wordcloud/src/wordCloud'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/dataZoomInside'
import 'echarts/lib/component/dataZoomSelect'
import 'echarts/lib/chart/gauge/GaugeSeries'
import 'echarts/lib/chart/gauge/GaugeView'
import Slice from '../../../components/DataView/components/common/slice'
import Layout from '../../../components/DataView/components/layout/Layout'
import Item from '../../../components/DataView/components/layout/Item'
import VLoading from '../../../components/Loading/LoadingModal'
import { getScreenInstanceParams } from '../../../api/instance'
export default {
  name: 'Preview',
  components: {
    Layout,
    Item,
    Slice,
    VLoading
  },
  data() {
    return {
      loading: true,
      instanceId: null,
      slices: [],
      panelConfig: {
        title: '',
        // panelWidth: 1920,
        panelWidth: 980,
        // panelHeight: 1080,
        panelHeight: 570,
        backgroundColor: '#263546',
        backgroundImg: '',
        instanceViewImg: '',
        instanceTheme: '',
        instanceVersion: 1
      }
    }
  },
  computed: {
    isFinish() {
      return this.slices
    }
  },
  watch: {
    isFinish: {
      handler() {
        this.$nextTick(function() {
          this.loading = false
        }.bind(this))
      }
    }
  },
  inject: ['reload'],
  created() {
    const instanceId = this.$route.params.instanceId
    if (instanceId) {
      this.instanceId = instanceId
      this.getScreenInstanceParams(instanceId)
    }
  },
  methods: {
    getScreenInstanceParams(instanceId) {
      try {
        getScreenInstanceParams(instanceId).then(response => {
          const items = JSON.parse(JSON.stringify(response.data.ChartItems))
          items.map((item) => {
            item.data = JSON.parse(item.data)
            item.chartData = JSON.parse(item.chartData)
            item.option = JSON.parse(item.option)
            return item
          })
          const panelConfig = {
            title: response.data.InstanceTitle,
            panelWidth: response.data.InstanceWidth,
            panelHeight: response.data.InstanceHeight,
            backgroundColor: response.data.InstanceBackgroundColor,
            backgroundImg: response.data.InstanceBackgroundImg,
            instanceVersion: response.data.InstanceVersion
          }
          this.panelConfig = JSON.parse(JSON.stringify(panelConfig))
          this.slices = JSON.parse(JSON.stringify(items))
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
