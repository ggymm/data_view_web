<!--suppress JSUnresolvedVariable -->
<template>
  <div id="temp-app-container" class="temp-app-container">
    <div class="temp-list-container">
      <div class="handle-container">
        <el-button size="mini" class="handle-item" type="primary" icon="el-icon-back" @click="handleBack">返回</el-button>
        <el-button size="mini" class="handle-item" type="primary" icon="el-icon-plus" @click="handleCreate">创建
        </el-button>
      </div>
      <el-menu
        default-active="1"
        class="temp-menu-list"
        active-text-color="#d2deef"
        @select="handleChooseInstance">
        <el-menu-item index="0">
          <div class="temp-menu-item-thumbnails"/>
          <p class="temp-menu-item-title">新建可视化</p>
        </el-menu-item>
        <el-menu-item
          v-for="instance in list"
          :index="String(instance.InstanceId)"
          :key="instance.instanceId">
          <div class="temp-menu-item-thumbnails">
            <img :src="instance.InstanceViewImg" alt="">
          </div>
          <p class="temp-menu-item-w-h">{{ instance.InstanceHeight }} * {{ instance.InstanceWidth }}</p>
          <p class="temp-menu-item-title">{{ instance.InstanceTitle }}</p>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="temp-view-container">
      <div class="temp-view-big-img">
        <img :src="chooseInstanceViewImg" alt="">
      </div>
    </div>
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
      chooseInstanceId: null,
      chooseInstanceViewImg: null
    }
  },
  created() {
    // 关闭左侧菜单栏，比较好显示
    const _isOpened = this.$store.state.app.sidebar.opened
    if (_isOpened) {
      // noinspection JSIgnoredPromiseFromCall
      this.$store.dispatch('ToggleSideBar')
    }
    this.getScreenInstanceList()
  },
  methods: {
    getScreenInstanceList() {
      getInstancePage(this.listQuery).then(response => {
        this.list = response.data.list
      })
    },
    handleBack() {
      this.$router.push({ name: 'DataViewInstanceList' })
    },
    handleCreate() {
    },
    handleChooseInstance(key, keyPath) {
      if (key === '0') {
        this.chooseInstanceId = null
        this.chooseInstanceViewImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPIAAAB4CAYAAADIQ68aAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFqSURBVHhe7dNBDQAgDAAx/EsjwcG8gA4ufVRC1z5zgb+JDAEiQ4DIECAyBIgMASJDgMgQIDIEiAwBIkOAyBAgMgSIDAEiQ4DIECAyBIgMASJDgMgQIDIEiAwBIkOAyBAgMgSIDAEiQ4DIECAyBIgMASJDgMgQIDIEiAwBIkOAyBAgMgSIDAEiQ4DIECAyBIgMASJDgMgQIDIEiAwBIkOAyBAgMgSIDAEiQ4DIECAyBIgMASJDgMgQIDIEiAwBIkOAyBAgMgSIDAEiQ4DIECAyBIgMASJDgMgQIDIEiAwBIkOAyBAgMgSIDAEiQ4DIECAyBIgMASJDgMgQIDIEiAwBIkOAyBAgMgSIDAEiQ4DIECAyBIgMASJDgMgQIDIEiAwBIkOAyBAgMgSIDAEiQ4DIECAyBIgMASJDgMgQIDIEiAwBIkOAyBAgMgSIDAEiQ4DIECAyBIgMASJDgMgQIDIEiAwBIkOAyPC9uQ8FnOq7ZP6+nQAAAABJRU5ErkJggg=='
      }
      for (let i = 0; i < this.list.length; i++) {
        const screenInstance = this.list[i]
        if (String(screenInstance.InstanceId) === key) {
          this.chooseInstanceId = screenInstance.InstanceId
          this.chooseInstanceViewImg = screenInstance.InstanceViewImg
        }
      }
    }
  }
}
</script>
