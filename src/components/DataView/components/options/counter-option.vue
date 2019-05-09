<template>
  <div class="data-view-chart-option">
    <el-tabs v-model="activeName">
      <el-tab-pane label="样式" name="style">
        <el-collapse accordion>
          <el-collapse-item title="自定义">
            <el-button size="mini" type="primary" @click="handleEditOption">编辑Option</el-button>
          </el-collapse-item>
          <el-collapse-item title="全局样式">
            <el-form ref="form" :model="item" label-width="35%" size="mini">
              <el-form-item label="图表位置(左)">
                <el-col :span="20">
                  <el-input-number v-model="item.x" :min="0" />
                </el-col>
              </el-form-item>
              <el-form-item label="图表位置(上)">
                <el-col :span="20">
                  <el-input-number v-model="item.y" :min="0" />
                </el-col>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="图表配置">
            <el-form ref="form" :model="item" label-width="35%" size="mini">
              <el-form-item label="字体大小">
                <el-col :span="20">
                  <el-input-number v-model="item.option.fontSize" :min="0" />
                </el-col>
              </el-form-item>
              <el-form-item label="文本颜色">
                <el-col :span="20">
                  <el-color-picker v-model="item.option.fontColor" color-format="rgb" show-alpha />
                </el-col>
              </el-form-item>
              <el-form-item label="文本加粗">
                <el-col :span="20">
                  <el-select v-model="item.option.fontWeight">
                    <el-option
                      v-for="fontWeight in fontWeightList"
                      :key="fontWeight.value"
                      :label="fontWeight.label"
                      :value="fontWeight.value"
                    />
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="文本位置">
                <el-col :span="20">
                  <el-select v-model="item.option.textAlign">
                    <el-option
                      v-for="textAlign in textAlignList"
                      :key="textAlign.value"
                      :label="textAlign.label"
                      :value="textAlign.value"
                    />
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="背景颜色">
                <el-col :span="20">
                  <el-color-picker v-model="item.option.backgroundColor" />
                </el-col>
              </el-form-item>
              <el-form-item label="千分位分隔符">
                <el-col :span="20">
                  <el-switch
                    v-model="item.option.thousandth"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="true"
                    :inactive-value="false"
                  />
                </el-col>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="单位配置">
            <el-form ref="form" :model="item" label-width="35%" size="mini">
              <el-form-item label="单位内容">
                <el-col :span="20">
                  <el-input v-model="item.option.unit.title" />
                </el-col>
              </el-form-item>
              <el-form-item label="字体大小">
                <el-col :span="20">
                  <el-input-number v-model="item.option.unit.fontSize" :min="0" />
                </el-col>
              </el-form-item>
              <el-form-item label="文本颜色">
                <el-col :span="20">
                  <el-color-picker v-model="item.option.unit.fontColor" color-format="rgb" show-alpha />
                </el-col>
              </el-form-item>
              <el-form-item label="文本加粗">
                <el-col :span="20">
                  <el-select v-model="item.option.unit.fontWeight">
                    <el-option
                      v-for="fontWeight in fontWeightList"
                      :key="fontWeight.value"
                      :label="fontWeight.label"
                      :value="fontWeight.value"
                    />
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
                  :value="dataSourceType.value"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item v-if="item.chartData.dataSourceType === 'DataBase'" label="数据源">
            <el-col :span="20">
              <el-select v-model="item.chartData.database">
                <el-option
                  v-for="dataSource in dataSourceList"
                  :key="dataSource.DataSourceId"
                  :label="dataSource.DataSourceName"
                  :value="dataSource.DataSourceId"
                />
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
                  :value="fileName.fileName"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item v-if="item.chartData.dataSourceType === 'DataBase'" label="data">
            <el-col :span="20">
              <el-input v-model="item.chartData.data" />
            </el-col>
          </el-form-item>
          <el-form-item v-if="item.chartData.dataSourceType === 'DataBase'" label="SQL">
            <el-col :span="20">
              <el-input v-model="item.chartData.sql" type="textarea" readonly @click.native="handleEditSql" />
            </el-col>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'CounterOption',
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
      dataSourceTypeList: [
        { label: '数据库数据源', value: 'DataBase' },
        { label: 'CSV文件数据源', value: 'CSV' }
      ],
      fontWeightList: [
        { label: '普通', value: 'normal' },
        { label: '加粗', value: 'bold' }
      ],
      textAlignList: [
        { label: '居左', value: 'left' },
        { label: '居中', value: 'center' },
        { label: '居右', value: 'right' }
      ],
      isShowList: [
        { label: '显示', value: true },
        { label: '隐藏', value: false }
      ]
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
    },
    handleEditSql() {
      this.$emit('handleEditSql', this.item.chartData.sql)
    },
    handleEditOption() {
      this.$emit('handleEditOption', this.item.option)
    }
  }
}
</script>
