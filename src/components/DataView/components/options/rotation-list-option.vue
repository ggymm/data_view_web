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
          <el-collapse-item title="表头配置">
            <el-form ref="form" :model="item" label-width="35%" size="mini">
              <el-form-item label="高度">
                <el-col :span="20">
                  <el-input-number v-model="item.option.column.height" :min="0"/>
                </el-col>
              </el-form-item>
              <el-form-item label="字体颜色">
                <el-col :span="20">
                  <el-color-picker v-model="item.option.column.fontColor"/>
                </el-col>
              </el-form-item>
              <el-form-item label="字体大小">
                <el-col :span="20">
                  <el-input-number v-model="item.option.column.fontSize" :min="0"/>
                </el-col>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="表格配置">
            <el-form ref="form" :model="item" label-width="40%" size="mini">
              <el-form-item label="行高度">
                <el-col :span="20">
                  <el-input-number v-model="item.option.data.height" :min="0"/>
                </el-col>
              </el-form-item>
              <el-form-item label="字体颜色">
                <el-col :span="20">
                  <el-color-picker v-model="item.option.data.fontColor"/>
                </el-col>
              </el-form-item>
              <el-form-item label="字体大小">
                <el-col :span="20">
                  <el-input-number v-model="item.option.data.fontSize" :min="0"/>
                </el-col>
              </el-form-item>
              <el-form-item label="显示行数">
                <el-col :span="20">
                  <el-input-number v-model="item.option.rowNum" :min="0"/>
                </el-col>
              </el-form-item>
              <el-form-item label="滑动速度">
                <el-col :span="20">
                  <el-input-number v-model="item.option.speed" :min="0"/>
                </el-col>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-button size="mini" type="danger" @click="handleDelete">删除图表</el-button>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="数据" name="data"/>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'RotationListOption',
  props: {
    item: {
      type: Object,
      default() {
        return {}
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
    }
  }
}
</script>
