<!--suppress JSUnresolvedVariable -->
<template>
  <div class="app-container">
    <div class="handle-container">
      <el-button size="mini" class="handle-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加数据源
      </el-button>
      <el-button size="mini" class="handle-item fr" type="primary" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <el-select
        v-model="listQuery.search.data_source_type"
        size="mini"
        class="handle-item fr"
        style="width: 200px;"
        clearable
        placeholder="请选择数据源类型">
        <el-option
          v-for="dataSourceType in dataSourceTypeList"
          :key="dataSourceType.value"
          :label="dataSourceType.label"
          :value="dataSourceType.value"/>
      </el-select>
      <el-input
        v-model="listQuery.search.data_source_name"
        size="mini"
        class="handle-item fr mr-10"
        style="width: 200px;"
        clearable
        placeholder="请输入数据源名称"
        @keyup.enter.native="handleFilter"/>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column :index="indexMethod" min-width="50" align="center" label="序号" type="index"/>
      <el-table-column min-width="150px" align="center" label="数据源名称">
        <template slot-scope="scope">
          <span :title="scope.row.data_source_name">{{ scope.row.DataSourceName }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="数据源类型">
        <template slot-scope="scope">
          <span :title="scope.row.data_source_type">{{ scope.row.DataSourceType }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="数据库名称">
        <template slot-scope="scope">
          <span :title="scope.row.dataSourceDatabaseName">{{ scope.row.DataSourceDatabaseName }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="数据库用户">
        <template slot-scope="scope">
          <span :title="scope.row.dataSourceUsername">{{ scope.row.DataSourceUsername }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="修改时间">
        <template slot-scope="scope">
          <span :title="scope.row.EditTime">{{ scope.row.EditTime }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" min-width="200px" align="center" label="操作" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
import { deleteDataSource, getDataSourcePage } from '../../../api/data_source'

// noinspection JSUnusedGlobalSymbols
export default {
  data() {
    return {
      total: null,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        search: {
          data_source_name: null,
          data_source_type: null
        }
      },
      dataSourceTypeList: [
        {
          label: 'MySQL',
          value: 'MySQL'
        },
        {
          label: 'Oracle',
          value: 'Oracle'
        },
        {
          label: 'SQLServer',
          value: 'SQLServer'
        },
        {
          label: 'DB2',
          value: 'DB2'
        }
      ]
    }
  },
  created() {
    // 获取数据
    this.getDataSourceList()
  },
  methods: {
    async getDataSourceList() {
      this.listLoading = true
      getDataSourcePage(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.count
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getDataSourceList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getDataSourceList()
    },
    indexMethod(index) {
      return this.listQuery.size * (this.listQuery.page - 1) + index + 1
    },
    handleCreate() {
      this.$router.push({ name: 'DataViewDataSourceCreate' })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getDataSourceList()
    },
    handleEdit(row) {
      const dataSourceId = row.DataSourceId
      this.$router.push({ name: 'DataViewDataSourceEdit', params: { dataSourceId: dataSourceId }})
    },
    handleDelete(row) {
      this.$confirm('是否删除该数据源?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDataSource(row.DataSourceId).then(() => {
          this.$message({
            type: 'success',
            message: '数据源删除成功'
          })
          this.getDataSourceList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除数据源'
        })
      })
    }
  }
}
</script>
