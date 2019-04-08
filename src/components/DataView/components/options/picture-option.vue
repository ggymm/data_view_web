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
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="图表配置">
            <el-form ref="form" :model="item" label-width="35%" size="mini">
              <el-form-item label="上传图片">
                <el-col :span="20">
                  <el-upload
                    ref="upload"
                    :file-list="fileList"
                    :auto-upload="true"
                    :show-file-list="false"
                    :multiple="false"
                    :limit="1"
                    :http-request="handleImageUpload"
                    action=""
                    list-type="picture">
                    <el-button slot="trigger" size="mini" class="handle-item" type="primary">选取文件</el-button>
                  </el-upload>
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
  name: 'PictureOption',
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
      fileList: []
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
    handleImageUpload(file) {
      if (file.file.size <= 512 * 1024) {
        var itemId = 'picture_' + this.item.i
        var a = new FileReader()
        a.onload = function(e) {
          var cv = document.getElementById(itemId)
          var canvas = cv.getContext('2d')
          var img = new Image()
          img.onload = function() {
            cv.width = img.width
            cv.height = img.height
            canvas.drawImage(img, 0, 0)
          }
          img.src = e.target.result
        }
        a.readAsDataURL(file.file)
      } else {
        this.$message.error('请上传小于512kb的图片')
      }
    }
  }
}
</script>
