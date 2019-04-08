<template>
  <div class="data-view-chart-option">
    <el-tabs v-model="activeName">
      <el-tab-pane label="样式" name="style">
        <el-collapse accordion>
          <el-collapse-item title="全局样式">
            <el-form ref="form" :model="item" label-width="35%" size="mini">
              <el-form-item label="图表位置(左)">
                <el-col :span="20">
                  <el-input-number v-model="item.x" :min="1"/>
                </el-col>
              </el-form-item>
              <el-form-item label="图表位置(上)">
                <el-col :span="20">
                  <el-input-number v-model="item.y" :min="1"/>
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
          <el-collapse-item title="图表配置">
            <el-form ref="form" :model="item" label-width="35%" size="mini"/>
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
              <el-input v-model="item.chartData.legend"/>
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
  name: 'PlotMapOption',
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
