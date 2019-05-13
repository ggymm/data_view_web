<template>
  <div class="data-view-container">
    <v-loading v-show="loading" />
    <div class="data-view-header">
      <el-menu
        class="data-view-menu"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#fff"
        @select="handleAdd"
      >
        <el-submenu index="plot">
          <template slot="title">散点图</template>
          <el-menu-item index="plotBubble">
            <svg-icon icon-class="plotBubble" style="font-size: 22px;margin-right: 15px;" />
            气泡散点图
          </el-menu-item>
          <el-menu-item index="plotMap">
            <svg-icon icon-class="plotMap" style="font-size: 22px;margin-right: 15px;" />
            散点地图
          </el-menu-item>
        </el-submenu>
        <el-submenu index="line">
          <template slot="title">折线图</template>
          <el-menu-item index="lineNormal">
            <svg-icon icon-class="lineNormal" style="font-size: 22px;margin-right: 15px;" />
            标准折线图
          </el-menu-item>
          <el-menu-item index="lineCoordinate">
            <svg-icon icon-class="lineCoordinate" style="font-size: 22px;margin-right: 15px;" />
            时间轴折线图
          </el-menu-item>
          <el-menu-item index="lineStacking">
            <svg-icon icon-class="lineStacking" style="font-size: 22px;margin-right: 15px;" />
            堆叠折线图
          </el-menu-item>
          <el-menu-item index="lineStackingArea">
            <svg-icon icon-class="lineStackingArea" style="font-size: 22px;margin-right: 15px;" />
            堆叠面积图
          </el-menu-item>
        </el-submenu>
        <el-submenu index="histogram">
          <template slot="title">柱状图</template>
          <el-menu-item index="histogramGradient">
            <svg-icon icon-class="histogramGradient" style="font-size: 22px;margin-right: 15px;" />
            渐变柱状图
          </el-menu-item>
          <el-menu-item index="histogramGradientHorizontal">
            <svg-icon icon-class="histogramGradientHorizontal" style="font-size: 22px;margin-right: 15px;" />
            水平柱状图
          </el-menu-item>
          <el-menu-item index="histogramStacking">
            <svg-icon icon-class="histogramStacking" style="font-size: 22px;margin-right: 15px;" />
            堆叠柱状图
          </el-menu-item>
          <el-menu-item index="histogramComplex">
            <svg-icon icon-class="histogramComplex" style="font-size: 22px;margin-right: 15px;" />
            复合柱状图
          </el-menu-item>
        </el-submenu>
        <el-submenu index="map">
          <template slot="title">地图</template>
          <el-menu-item index="mapChina">
            <svg-icon icon-class="mapChina" style="font-size: 22px;margin-right: 15px;" />
            中国地图
          </el-menu-item>
          <el-menu-item index="mapWorld">
            <svg-icon icon-class="mapWorld" style="font-size: 22px;margin-right: 15px;" />
            世界地图
          </el-menu-item>
          <el-menu-item index="mapProvince">
            <svg-icon icon-class="mapProvince" style="font-size: 22px;margin-right: 15px;" />
            省份地图
          </el-menu-item>
        </el-submenu>
        <el-submenu index="pie">
          <template slot="title">饼状图</template>
          <el-menu-item index="pieNormal">
            <svg-icon icon-class="pieNormal" style="font-size: 22px;margin-right: 15px;" />
            普通饼图
          </el-menu-item>
          <el-menu-item index="pieRing">
            <svg-icon icon-class="pieRing" style="font-size: 22px;margin-right: 15px;" />
            环形饼图
          </el-menu-item>
          <el-menu-item index="pie2D">
            <svg-icon icon-class="pie2D" style="font-size: 22px;margin-right: 15px;" />
            2D饼图
          </el-menu-item>
          <el-menu-item index="piePercent">
            <svg-icon icon-class="piePercent" style="font-size: 22px;margin-right: 15px;" />
            环形百分比图
          </el-menu-item>
          <el-menu-item index="pieRings">
            <svg-icon icon-class="pieRings" style="font-size: 22px;margin-right: 15px;" />
            环形饼图列表
          </el-menu-item>
        </el-submenu>
        <el-submenu index="radar">
          <template slot="title">雷达图</template>
          <el-menu-item index="radarBasic">
            <svg-icon icon-class="radarBasic" style="font-size: 22px;margin-right: 15px;" />
            基础雷达图
          </el-menu-item>
        </el-submenu>
        <el-submenu index="heat">
          <template slot="title">热力图</template>
          <el-menu-item index="heatBasic">
            <svg-icon icon-class="heatBasic" style="font-size: 22px;margin-right: 15px;" />
            基础热力图
          </el-menu-item>
          <el-menu-item index="heatProvince">
            <svg-icon icon-class="heatProvince" style="font-size: 22px;margin-right: 15px;" />
            省份热力图
          </el-menu-item>
          <el-menu-item index="heatMap">
            <svg-icon icon-class="heatMap" style="font-size: 22px;margin-right: 15px;" />
            热力地图
          </el-menu-item>
          <el-menu-item index="heatMapLargePiecewise">
            <svg-icon icon-class="heatMapLargePiecewise" style="font-size: 22px;margin-right: 15px;" />
            颜色的离散映射
          </el-menu-item>
        </el-submenu>
        <el-submenu index="relation">
          <template slot="title">关系图</template>
          <el-menu-item index="relationOne">
            <svg-icon icon-class="relationOne" style="font-size: 22px;margin-right: 15px;" />
            关系图1
          </el-menu-item>
          <el-menu-item index="relationTwo">
            <svg-icon icon-class="relationTwo" style="font-size: 22px;margin-right: 15px;" />
            关系图2
          </el-menu-item>
          <el-menu-item index="relationThree">
            <svg-icon icon-class="relationThree" style="font-size: 22px;margin-right: 15px;" />
            关系图3
          </el-menu-item>
          <el-menu-item index="relationFour">
            <svg-icon icon-class="relationFour" style="font-size: 22px;margin-right: 15px;" />
            关系图4
          </el-menu-item>
          <el-menu-item index="relationFive">
            <svg-icon icon-class="relationFive" style="font-size: 22px;margin-right: 15px;" />
            关系图5
          </el-menu-item>
        </el-submenu>
        <el-submenu index="other">
          <template slot="title">其他</template>
          <el-menu-item index="wordCloud">
            <svg-icon icon-class="wordCloud" style="font-size: 22px;margin-right: 15px;" />
            词云
          </el-menu-item>
          <el-menu-item index="rotationList">
            <svg-icon icon-class="rotationList" style="font-size: 22px;margin-right: 15px;" />
            轮播列表
          </el-menu-item>
          <el-menu-item index="counter">
            <svg-icon icon-class="counter" style="font-size: 22px;margin-right: 15px;" />
            计数器
          </el-menu-item>
          <el-menu-item index="titleText">
            <svg-icon icon-class="titleText" style="font-size: 22px;margin-right: 15px;" />
            标题文本
          </el-menu-item>
          <el-menu-item index="progressBar">
            <svg-icon icon-class="progressBar" style="font-size: 22px;margin-right: 15px;" />
            进度条
          </el-menu-item>
          <el-menu-item index="picture">
            <svg-icon icon-class="picture" style="font-size: 22px;margin-right: 15px;" />
            图片
          </el-menu-item>
          <el-menu-item index="clock">
            <svg-icon icon-class="clock" style="font-size: 22px;margin-right: 15px;" />
            时间
          </el-menu-item>
          <el-menu-item index="gauge">
            <svg-icon icon-class="gauge" style="font-size: 22px;margin-right: 15px;" />
            仪表盘
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="data-view-handler">
        <el-button size="mini" type="primary" @click="handleSave">保存</el-button>
        <el-button
          v-if="Object.keys(chooseItem).length >= 0"
          size="mini"
          type="info"
          @click="chooseItem = {}"
        >画板设置
        </el-button>
        <el-button size="mini" type="success">预览</el-button>
        <el-button size="mini" type="success" @click="handleScreenCapture">打印缩略图</el-button>
      </div>
    </div>
    <div class="data-view-main">
      <div class="data-view-panel">
        <div
          :style="{width: panelConfig.panelWidth + 40 + 'px', height: panelConfig.panelHeight + 40 + 'px'}"
          class="data-view-screen"
        >
          <layout
            :background-color="panelConfig.backgroundColor"
            :background-img="'url(http://localhost:8888/api/v1/data_view/image/' + panelConfig.backgroundImg + ')'"
            @layoutUpdated="handleLayoutUpdated"
            @sizeUpdate="handleSizeUpdate"
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
      <div class="data-view-option">
        <div v-show="Object.keys(chooseItem).length === 0" class="data-view-option-panel">
          <el-form ref="form" :model="panelConfig" label-width="25%" size="mini">
            <el-form-item label="标题">
              <el-col :span="20">
                <el-input v-model="panelConfig.title" />
              </el-col>
            </el-form-item>
            <el-form-item label="画板高度">
              <el-col :span="20">
                <el-input-number v-model="panelConfig.panelHeight" :min="1" :step="10" />
              </el-col>
            </el-form-item>
            <el-form-item label="画板宽度">
              <el-col :span="20">
                <el-input-number v-model="panelConfig.panelWidth" :min="1" :step="10" />
              </el-col>
            </el-form-item>
            <el-form-item label="背景色">
              <el-col :span="20">
                <el-color-picker v-model="panelConfig.backgroundColor" />
              </el-col>
            </el-form-item>
            <el-form-item label="背景图">
              <el-col :span="12">
                <!--suppress RequiredAttributes -->
                <el-select v-model="panelConfig.backgroundImg" clearable>
                  <el-option
                    v-for="backgroundImg in backgroundImgList"
                    :key="backgroundImg.ImageId"
                    :label="backgroundImg.ImageName"
                    :value="backgroundImg.ImageId"
                  />
                </el-select>
              </el-col>
              <el-col :span="4" style="padding-left: 10px;">
                <el-upload
                  :on-success="uploadBackgroundSuccess"
                  :on-error="uploadBackgroundError"
                  :show-file-list="false"
                  name="background_image"
                  action="http://localhost:8888/api/v1/data_view/image"
                >
                  <el-button size="mini" type="primary">上传背景图</el-button>
                </el-upload>
              </el-col>
            </el-form-item>
            <el-form-item label="图表主题">
              <el-col :span="20">
                <!--suppress RequiredAttributes -->
                <el-select v-model="panelConfig.instanceTheme" clearable>
                  <el-option
                    v-for="theme in themeList"
                    :key="theme.value"
                    :label="theme.label"
                    :value="theme.value"
                  />
                </el-select>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
        <ChartOption
          v-show="Object.keys(chooseItem).length >= 0"
          :data-source-list="dataSourceList"
          :item="chooseItem"
          @handleDeleteItem="handleDelete"
        />
      </div>
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
import ChartOption from '../../../components/DataView/components/common/chart-option'
import Layout from '../../../components/DataView/components/layout/Layout'
import Item from '../../../components/DataView/components/layout/Item'
import OptionConfigMap from '../../../components/DataView/config/option-config-map'
import VLoading from '../../../components/Loading/LoadingModal'
import { getDataSourceList } from '../../../api/data_source'
import { getImageBgList } from '../../../api/image_bg'
import { getScreenInstanceParams, saveScreenInstanceParams, updateScreenInstanceParams } from '../../../api/instance'

export default {
  components: {
    Layout,
    Item,
    Slice,
    ChartOption,
    VLoading
  },
  data() {
    return {
      loading: true,
      instanceId: null,
      isCopy: null,
      slices: [],
      startIndex: 0,
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
      },
      backgroundImgList: [],
      themeList: [
        { 'label': 'chalk', 'value': 'chalk' },
        { 'label': 'dark', 'value': 'dark' },
        { 'label': 'essos', 'value': 'essos' },
        { 'label': 'halloween', 'value': 'halloween' },
        { 'label': 'infographic', 'value': 'infographic' },
        { 'label': 'macarons', 'value': 'macarons' },
        { 'label': 'purplePassion', 'value': 'purplePassion' },
        { 'label': 'roma', 'value': 'roma' },
        { 'label': 'shine', 'value': 'shine' },
        { 'label': 'vintage', 'value': 'vintage' },
        { 'label': 'walden', 'value': 'walden' },
        { 'label': 'westeros', 'value': 'westeros' },
        { 'label': 'wonderland', 'value': 'wonderland' }
      ],
      chooseItem: {},
      dataSourceList: []
    }
  },
  computed: {
    isFinish() {
      // 当处于编辑状态时
      // 应该监听图表Item的列表
      // 没有处于编辑状态时
      // 应该监听其他会刷新页面的参数，例如数据源或者文件列表等等
      const instanceId = this.$route.params.instanceId
      if (instanceId) {
        return this.slices
      } else {
        return this.dataSourceList
      }
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
    this.getDataSourceList()
    this.getImageBgList()
    // 获取对象
    const instanceId = this.$route.params.instanceId
    const isCopy = this.$route.params.isCopy
    this.initPageStyle()
    if (instanceId) {
      this.instanceId = instanceId
      this.isCopy = parseInt(isCopy)
      this.getScreenInstanceParams(instanceId)
    }
  },
  methods: {
    initPageStyle() {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      this.panelConfig.panelWidth = width * 0.75 - 20 * 2 - 5
      this.panelConfig.panelHeight = height - 50 - 20 * 2 - 5
    },
    handleAdd(key) {
      const newItem = OptionConfigMap[key]()
      newItem.slice_id = this.startIndex
      newItem.i = 'chart' + this.startIndex
      this.slices.push(newItem)
      // this.$set(this.slices, this.startIndex, newItem)
      this.startIndex += 1
    },
    handleDelete(item) {
      const index = this.slices.indexOf(item)
      if (index !== -1) {
        this.slices.splice(index, 1)
        this.chooseItem = {}
      }
    },
    handleItemChoose(item) {
      // 此处应该显示对应的Options
      // 对应类别显示，数据则从数组里面取
      this.chooseItem = item
    },
    handleLayoutUpdated(layout) {
      this.slices = this.slices.map((item) => {
        if (item.i === layout.id) {
          item.x = layout.x
          item.y = layout.y
        }
        return item
      })
    },
    handleSizeUpdate(size) {
      this.slices = this.slices.map((item) => {
        if (item.i === size.id) {
          item.width = size.w
          item.height = size.h
        }
        return item
      })
    },
    handleSave: function() {
      const _this = this
      const generateScreenCapture = new Promise(function(resolve) {
        _this.$message({
          type: 'info',
          message: '正在生成缩略图！'
        })
        const params = {
          logging: false, // 日志开关，发布的时候记得改成false
          width: _this.panelConfig.panelWidth, // dom 原始宽度
          height: _this.panelConfig.panelHeight // dom 原始高度
        }
        window.html2canvas(document.getElementById('data-view-container-layout'),
          params).then(function(canvas) {
          _this.panelConfig.instanceViewImg = canvas.toDataURL('image/png')
          resolve()
        })
      })
      generateScreenCapture.then(function() {
        const items = JSON.parse(JSON.stringify(this.slices))
        items.map((item) => {
          item.data = JSON.stringify(item.data)
          item.chartData = JSON.stringify(item.chartData)
          item.option = JSON.stringify(item.option)
          return item
        })
        if (this.isCopy === 1) {
          // 证明是复制该模板，创建新的实例
          // 需要将ID置为null
          this.instanceId = null
        }
        const screenInstance = {
          InstanceId: this.instanceId,
          InstanceTitle: this.panelConfig.title,
          InstanceWidth: this.panelConfig.panelWidth,
          InstanceHeight: this.panelConfig.panelHeight,
          InstanceBackgroundColor: this.panelConfig.backgroundColor,
          InstanceBackgroundImg: this.panelConfig.backgroundImg,
          InstanceViewImg: this.panelConfig.instanceViewImg,
          InstanceVersion: this.panelConfig.instanceVersion,
          ChartItems: items
        }
        if (this.instanceId) {
          updateScreenInstanceParams(screenInstance).then(() => {
            // 编辑
            this.$message({
              type: 'success',
              message: '更新成功！'
            })
            // 重新获取数据
            this.isCopy = 0
            this.getScreenInstanceParams(this.instanceId)
          })
        } else {
          saveScreenInstanceParams(screenInstance).then(response => {
            const instanceId = response.data
            this.$message({
              type: 'success',
              message: '保存成功！'
            })
            // 新建会返回ID
            // 访问编辑页面
            this.$router.push({
              name: 'DataViewEditInstance', params:
                {
                  instanceId: instanceId,
                  isCopy: 0
                }
            })
            // 重新获取数据
            this.instanceId = instanceId
            this.isCopy = 0
            this.getScreenInstanceParams(instanceId)
          })
        }
      }.bind(this))
    },
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
          // noinspection JSUnresolvedVariable
          this.startIndex = response.data.StartIndex
          this.panelConfig = JSON.parse(JSON.stringify(panelConfig))
          this.slices = JSON.parse(JSON.stringify(items))
        })
      } catch (e) {
        console.log(e)
      }
    },
    getDataSourceList() {
      getDataSourceList().then(response => {
        this.dataSourceList = response.data
      })
    },
    getImageBgList() {
      getImageBgList().then(response => {
        this.backgroundImgList = response.data
      })
    },
    uploadBackgroundSuccess() {
      this.$message({
        type: 'success',
        message: '上传文件成功'
      })
      this.getImageBgList()
    },
    uploadBackgroundError(err) {
      this.$message({
        message: '上传文件失败，' + err,
        type: 'error'
      })
    },
    handleScreenCapture() {
      const params = {
        logging: false, // 日志开关，发布的时候记得改成false
        width: this.panelConfig.panelWidth, // dom 原始宽度
        height: this.panelConfig.panelHeight // dom 原始高度
      }
      window.html2canvas(document.getElementById('data-view-container-layout'),
        params).then(function(canvas) {
        console.log(canvas.toDataURL('image/png'))
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .data-view-menu .el-menu-item {
    height: 50px;
    line-height: 50px;
  }
</style>
