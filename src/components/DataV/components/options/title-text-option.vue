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
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="图表配置">
            <el-form ref="form" :model="item" label-width="35%" size="mini">
              <el-form-item label="标题内容">
                <el-col :span="20">
                  <el-input v-model="item.option.title"/>
                </el-col>
              </el-form-item>
              <el-form-item label="字体大小">
                <el-col :span="20">
                  <el-input-number v-model="item.option.fontSize" :min="0"/>
                </el-col>
              </el-form-item>
              <el-form-item label="文本颜色">
                <el-col :span="20">
                  <el-color-picker v-model="item.option.fontColor"/>
                </el-col>
              </el-form-item>
              <el-form-item label="文本加粗">
                <el-col :span="20">
                  <el-select v-model="item.option.fontWeight">
                    <el-option
                      v-for="fontWeight in fontWeightList"
                      :key="fontWeight.value"
                      :label="fontWeight.label"
                      :value="fontWeight.value"/>
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
                      :value="textAlign.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="背景颜色">
                <el-col :span="20">
                  <el-color-picker v-model="item.option.backgroundColor"/>
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
  name: 'TitleTextOption',
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
    }
  }
}
</script>
