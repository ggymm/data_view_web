<!--suppress JSUnresolvedVariable -->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4" style="padding: 0 15px;margin-bottom: 25px;width: 20%;">
        <el-card :body-style="{ padding: '0px',textAlign: 'center' }" style="height: 205px; border: 2px dashed #bbbbbb">
          <div class="new_instance">
            <div @click="handleCreateDataView">
              <i class="el-icon-circle-plus"/>
              <p>创建新的可视化</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col
        v-for="instance in list"
        :span="4"
        :key="instance.InstanceId"
        style="padding: 0 15px; margin-bottom: 25px; width: 20%">
        <el-card :body-style="{ padding: '0px' }">
          <div class="thumbnails">
            <img :src="instance.InstanceViewImg" class="image" alt="">
            <div class="edit-shade"/>
            <el-button size="mini" type="primary" @click="handleEdit(instance.InstanceId)">编辑</el-button>
          </div>
          <div class="title">
            <span>{{ instance.InstanceTitle||'暂无标题' }}</span>
          </div>
          <div class="handle">
            <el-button type="text" class="button" @click="handlePreview(instance.InstanceId)"><i
              class="el-icon-picture-outline"/>预览
            </el-button>
            <el-button type="text" class="button" @click="handleEdit(instance.InstanceId)"><i
              class="el-icon-edit-outline"/>编辑
            </el-button>
            <el-button type="text" class="button" @click="handleDelete(instance.InstanceId)"><i
              class="el-icon-circle-close-outline"/>删除
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getInstancePage } from '../../../api/instance'

// noinspection JSUnusedGlobalSymbols
export default {
  data() {
    return {
      total: null,
      list: null,
      listQuery: {
        page: 1,
        size: 10,
        search: {}
      },
      shadeVisible: false
    }
  },
  created() {
    this.getScreenInstanceList()
  },
  methods: {
    getScreenInstanceList() {
      getInstancePage(this.listQuery).then(response => {
        this.list = response.data.list
      })
    },
    handleCreateDataView() {
      this.$router.push({ name: 'DataViewInstanceCreate' })
    },
    handlePreview(instanceId) {
      console.log(instanceId)
    },
    handleEdit(instanceId) {
      window.open('#/data_view/screen/edit/' + instanceId + '/0')
    },
    handleDelete(instanceId) {
      console.log(instanceId)
    }
  }
}
</script>

<style>
  .new_instance i {
    font-size: 70px;
    height: 88px;
    line-height: 88px;
    margin-top: 40px;
    color: #4085bd;
    cursor: pointer;
  }

  .new_instance p {
    color: #9e9e9e;
    margin: 0;
    cursor: pointer;
    font-size: 15px;
  }

  .thumbnails {
    height: 130px;
  }

  .thumbnails:hover .edit-shade {
    display: block;
  }

  .thumbnails:hover button {
    display: block;
  }

  .image {
    width: 100%;
    height: 100%;
    display: block;
  }

  .title {
    width: 70%;
    margin: auto;
    padding: 10px 0;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
    font-size: 13px;
    border-bottom: 1px solid #e1e1e1;
  }

  .handle {
    text-align: center;
  }

  .thumbnails .edit-shade {
    background: #000000 none repeat scroll 0 0;
    opacity: 0.5;
    height: 130px;
    position: relative;
    text-align: center;
    top: -130px;
    z-index: 99999;
    display: none;
  }

  .thumbnails button {
    position: relative;
    z-index: 99999;
    top: -200px;
    padding: 5px 6px;
    margin: auto;
    display: none;
  }
</style>
