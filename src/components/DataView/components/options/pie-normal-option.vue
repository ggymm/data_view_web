<template>
  <div class="data-view-chart-option">
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
              <el-form-item label="图表轮播">
                <el-col :span="20">
                  <el-select v-model="item.broadcast">
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
              <el-form-item label="图表半径">
                <el-col :span="20">
                  <el-input v-model="item.option.series[0].radius"/>
                </el-col>
              </el-form-item>
              <el-form-item label="中心坐标">
                <el-col :span="8">
                  <el-input v-model="item.option.series[0].center[0]"/>
                </el-col>
                <el-col :span="8" :offset="3">
                  <el-input v-model="item.option.series[0].center[1]"/>
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
          <el-collapse-item title="标签配置">
            <el-form ref="form" :model="item" label-width="35%" size="mini">
              <el-form-item label="显示标签">
                <el-col :span="20">
                  <el-select v-model="item.option.series[0].label.normal.show">
                    <el-option
                      v-for="isShow in isShowList"
                      :key="isShow.value"
                      :label="isShow.label"
                      :value="isShow.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.series[0].label.normal.show" label="标签位置">
                <el-col :span="20">
                  <el-select v-model="item.option.series[0].label.normal.position">
                    <el-option
                      v-for="labelPosition in labelPositionList"
                      :key="labelPosition.value"
                      :label="labelPosition.label"
                      :value="labelPosition.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item v-if="item.option.series[0].label.normal.position === 'outside'" label="显示标签线">
                <el-col :span="20">
                  <el-select v-model="item.option.series[0].labelLine.normal.show">
                    <el-option
                      v-for="isShow in isShowList"
                      :key="isShow.value"
                      :label="isShow.label"
                      :value="isShow.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item
                v-if="item.option.series[0].labelLine.normal.show &&
                item.option.series[0].label.normal.position === 'outside'"
                label="标签线1长度">
                <el-col :span="20">
                  <el-input-number v-model="item.option.series[0].labelLine.normal.length" :min="0"/>
                </el-col>
              </el-form-item>
              <el-form-item
                v-if="item.option.series[0].labelLine.normal.show &&
                item.option.series[0].label.normal.position === 'outside'"
                label="标签线2长度">
                <el-col :span="20">
                  <el-input-number v-model="item.option.series[0].labelLine.normal.length2" :min="0"/>
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
          <el-form-item v-if="item.chartData.dataSourceType === 'DataBase'" label="name">
            <el-col :span="20">
              <el-input v-model="item.chartData.name"/>
            </el-col>
          </el-form-item>
          <el-form-item v-if="item.chartData.dataSourceType === 'DataBase'" label="value">
            <el-col :span="20">
              <el-input v-model="item.chartData.value"/>
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
  name: 'PieNormalOption',
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
      labelPositionList: [
        { label: '扇区外侧', value: 'outside' },
        { label: '扇区内侧', value: 'inside' },
        { label: '扇区中心', value: 'center' }
      ],
      orientList: [
        { label: '纵向', value: 'vertical' },
        { label: '横向', value: 'horizontal' }
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
