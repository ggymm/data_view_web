<template>
  <div class="datav-chart-option">
    <el-tabs v-model="activeName">
      <el-tab-pane label="样式" name="style">
        <el-collapse accordion>
          <el-collapse-item title="全局样式">
            <el-form ref="form" :model="item" label-width="35%" size="mini">
              <el-form-item label="图表位置(左)">
                <el-col :span="20">
                  <el-input-number v-model="item.x" :min="0"/>
                </el-col>
              </el-form-item>
              <el-form-item label="图表位置(上)">
                <el-col :span="20">
                  <el-input-number v-model="item.y" :min="0"/>
                </el-col>
              </el-form-item>
              <el-form-item label="定时刷新数据">
                <el-col :span="20">
                  <el-select v-model="item.refresh">
                    <el-option
                      v-for="refresh in refreshList"
                      :key="refresh.value"
                      :label="refresh.label"
                      :value="refresh.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="图表样式">
            <el-form ref="form" :model="item" label-width="35%" size="mini">
              <el-form-item label="图表Grid(左)">
                <el-col :span="20">
                  <el-input v-model="item.option.grid.left"/>
                </el-col>
              </el-form-item>
              <el-form-item label="图表Grid(右)">
                <el-col :span="20">
                  <el-input v-model="item.option.grid.right"/>
                </el-col>
              </el-form-item>
              <el-form-item label="图表Grid(底)">
                <el-col :span="20">
                  <el-input v-model="item.option.grid.bottom"/>
                </el-col>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="图表标题">
            <el-form ref="form" :model="item" label-width="35%" size="mini">
              <el-form-item label="显示标题">
                <el-col :span="20">
                  <el-select v-model="item.option.title.show">
                    <el-option
                      v-for="isShow in isShowList"
                      :key="isShow.value"
                      :label="isShow.label"
                      :value="isShow.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.title.show" label="标题">
                <el-col :span="20">
                  <el-input v-model="item.option.title.text"/>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.title.show" label="标题颜色">
                <el-col :span="20">
                  <el-color-picker v-model="item.option.title.textStyle.color"/>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.title.show" label="标题位置">
                <el-col :span="20">
                  <el-select v-model="item.option.title.left">
                    <el-option
                      v-for="position in positionList"
                      :key="position.value"
                      :label="position.label"
                      :value="position.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="横坐标样式">
            <el-form ref="form" :model="item" label-width="35%" size="mini">
              <el-form-item label="显示文字">
                <el-col :span="20">
                  <el-select v-model="item.option.xAxis.axisLabel.show">
                    <el-option
                      v-for="isShow in isShowList"
                      :key="isShow.value"
                      :label="isShow.label"
                      :value="isShow.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.xAxis.axisLabel.show" label="坐标名称">
                <el-col :span="20">
                  <el-input v-model="item.option.xAxis.name"/>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.xAxis.axisLabel.show" label="名称颜色">
                <el-col :span="20">
                  <el-color-picker v-model="item.option.xAxis.axisLabel.textStyle.color"/>
                </el-col>
              </el-form-item>
              <el-form-item label="显示坐标线">
                <el-col :span="20">
                  <el-select v-model="item.option.xAxis.axisLine.show">
                    <el-option
                      v-for="isShow in isShowList"
                      :key="isShow.value"
                      :label="isShow.label"
                      :value="isShow.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.xAxis.axisLine.show" label="坐标线颜色">
                <el-col :span="20">
                  <el-color-picker v-model="item.option.xAxis.axisLine.lineStyle.color"/>
                </el-col>
              </el-form-item>
              <el-form-item label="显示分割线">
                <el-col :span="20">
                  <el-select v-model="item.option.xAxis.splitLine.show">
                    <el-option
                      v-for="isShow in isShowList"
                      :key="isShow.value"
                      :label="isShow.label"
                      :value="isShow.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.xAxis.splitLine.show" label="分割线颜色">
                <el-col :span="20">
                  <el-color-picker v-model="item.option.xAxis.splitLine.lineStyle.color"/>
                </el-col>
              </el-form-item>
              <el-form-item label="标签旋转角度">
                <el-col :span="20">
                  <el-input-number v-model="item.option.xAxis.axisLabel.rotate" :min="-90" :max="90"/>
                </el-col>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="纵坐标样式">
            <el-form ref="form" :model="item" label-width="35%" size="mini">
              <el-form-item label="显示文字">
                <el-col :span="20">
                  <el-select v-model="item.option.yAxis.axisLabel.show">
                    <el-option
                      v-for="isShow in isShowList"
                      :key="isShow.value"
                      :label="isShow.label"
                      :value="isShow.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.yAxis.axisLabel.show" label="坐标名称">
                <el-col :span="20">
                  <el-input v-model="item.option.yAxis.name"/>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.yAxis.axisLabel.show" label="名称颜色">
                <el-col :span="20">
                  <el-color-picker v-model="item.option.yAxis.axisLabel.textStyle.color"/>
                </el-col>
              </el-form-item>
              <el-form-item label="显示坐标线">
                <el-col :span="20">
                  <el-select v-model="item.option.yAxis.axisLine.show">
                    <el-option
                      v-for="isShow in isShowList"
                      :key="isShow.value"
                      :label="isShow.label"
                      :value="isShow.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.yAxis.axisLine.show" label="坐标线颜色">
                <el-col :span="20">
                  <el-color-picker v-model="item.option.yAxis.axisLine.lineStyle.color"/>
                </el-col>
              </el-form-item>
              <el-form-item label="显示分割线">
                <el-col :span="20">
                  <el-select v-model="item.option.yAxis.splitLine.show">
                    <el-option
                      v-for="isShow in isShowList"
                      :key="isShow.value"
                      :label="isShow.label"
                      :value="isShow.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.yAxis.splitLine.show" label="分割线颜色">
                <el-col :span="20">
                  <el-color-picker v-model="item.option.yAxis.splitLine.lineStyle.color"/>
                </el-col>
              </el-form-item>
              <el-form-item label="显示分割区域">
                <el-col :span="20">
                  <el-select v-model="item.option.yAxis.splitArea.show">
                    <el-option
                      v-for="isShow in isShowList"
                      :key="isShow.value"
                      :label="isShow.label"
                      :value="isShow.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.yAxis.splitArea.show" label="分割区域颜色">
                <el-col :span="10">
                  <el-color-picker v-model="item.option.yAxis.splitArea.areaStyle.color[0]"/>
                </el-col>
                <el-col :span="10">
                  <el-color-picker v-model="item.option.yAxis.splitArea.areaStyle.color[1]"/>
                </el-col>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="图例样式">
            <el-form ref="form" :model="item" label-width="35%" size="mini">
              <el-form-item label="显示图例">
                <el-col :span="20">
                  <el-select v-model="item.option.legend.show">
                    <el-option
                      v-for="isShow in isShowList"
                      :key="isShow.value"
                      :label="isShow.label"
                      :value="isShow.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.legend.show" label="图例布局朝向">
                <el-col :span="20">
                  <el-select v-model="item.option.legend.orient">
                    <el-option
                      v-for="orient in orientList"
                      :key="orient.value"
                      :label="orient.label"
                      :value="orient.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.legend.show" label="图例位置(左)">
                <el-col :span="20">
                  <el-input-number v-model="item.option.legend.left" :min="0"/>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.legend.show" label="图例位置(上)">
                <el-col :span="20">
                  <el-input-number v-model="item.option.legend.top" :min="0"/>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.legend.show" label="文字颜色">
                <el-col :span="20">
                  <el-color-picker v-model="item.option.legend.textStyle.color"/>
                </el-col>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item v-if="item.option.series.length !== 0" title="图表曲线样式">
            <el-form ref="form" :model="item" label-width="35%" size="mini">
              <el-form-item v-for="(series, index) in item.option.series" :label="'是否平滑(' + (index + 1) + ')'" :key="series.name">
                <el-col :span="20">
                  <el-select v-model="series.smooth">
                    <el-option
                      v-for="smooth in smoothList"
                      :key="smooth.value"
                      :label="smooth.label"
                      :value="smooth.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-button size="mini" type="danger" @click="handleDelete">删除图表</el-button>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="数据" name="data">
        <el-form ref="form" :model="item" label-width="35%" size="mini">
          <el-form-item label="数据源类型">
            <el-col :span="20">
              <el-select v-model="item.chartData.dataSourceType">
                <el-option
                  v-for="dataSourceType in dataSourceTypeList"
                  :key="dataSourceType.value"
                  :label="dataSourceType.label"
                  :value="dataSourceType.value"/>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item v-if="item.chartData.dataSourceType === 'DataBase'" label="数据源">
            <el-col :span="20">
              <el-select v-model="item.chartData.database">
                <el-option
                  v-for="dataSource in dataSourceList"
                  :key="dataSource.dataSourceId"
                  :label="dataSource.dataSourceName"
                  :value="dataSource.dataSourceId"/>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item v-if="item.chartData.dataSourceType === 'CSV'" label="数据文件">
            <el-col :span="20">
              <el-select v-model="item.chartData.fileName">
                <el-option
                  v-for="fileName in fileNameList"
                  :key="fileName.fileName"
                  :label="fileName.fileName"
                  :value="fileName.fileName"/>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item v-if="item.chartData.dataSourceType === 'DataBase'" label="x">
            <el-col :span="20">
              <el-input v-model="item.chartData.x"/>
            </el-col>
          </el-form-item>
          <el-form-item v-if="item.chartData.dataSourceType === 'DataBase'" label="y">
            <el-col :span="20">
              <el-input v-model="item.chartData.y"/>
            </el-col>
          </el-form-item>
          <el-form-item v-if="item.chartData.dataSourceType === 'DataBase'" label="legend">
            <el-col :span="20">
              <el-input v-model="item.chartData.legend" placeholder="没有Legend可以填“无”"/>
            </el-col>
          </el-form-item>
          <el-form-item v-if="item.chartData.dataSourceType === 'DataBase'" label="SQL">
            <el-col :span="20">
              <el-input v-model="item.chartData.sql" type="textarea"/>
            </el-col>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'LineStackingOption',
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
      activeName: 'style',
      refreshList: [
        { label: '开启', value: 'true' },
        { label: '关闭', value: 'false' }
      ],
      isShowList: [
        { label: '显示', value: true },
        { label: '隐藏', value: false }
      ],
      dataSourceTypeList: [
        { label: '数据库数据源', value: 'DataBase' },
        { label: 'CSV文件数据源', value: 'CSV' }
      ],
      positionList: [
        { label: '居左', value: 'left' },
        { label: '居中', value: 'center' },
        { label: '居右', value: 'right' }
      ],
      orientList: [
        { label: '纵向', value: 'vertical' },
        { label: '横向', value: 'horizontal' }
      ],
      smoothList: [
        { label: '平滑', value: true },
        { label: '不平滑', value: false }
      ],
      fileNameList: []
    }
  },
  methods: {
    handleDelete() {
      this.$confirm('是否删除该图表?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('handleDeleteItem', this.item)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
