<template>
  <div class="app-container">
    <div class="handle-container">
      <el-button size="mini" class="handle-item" type="primary" icon="el-icon-back" @click="handleBack">返回</el-button>
      <el-button
        size="mini"
        class="handle-item"
        type="success"
        icon="el-icon-circle-check-outline"
        @click="handleSubmit"
      >提交
      </el-button>
      <el-button size="mini" class="handle-item" type="info" icon="el-icon-refresh" @click="handleReset">重置</el-button>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数据源信息</span>
      </div>
      <el-form
        ref="dataViewDataSourceForm"
        :rules="rules"
        :model="dataSource"
        label-width="35%"
        label-position="right"
        size="medium"
      >
        <el-form-item label="数据源名称" prop="DataSourceName">
          <el-col :span="12">
            <el-input v-model="dataSource.DataSourceName" placeholder="请输入数据源名称" />
          </el-col>
        </el-form-item>
        <el-form-item label="数据源类型" prop="DataSourceType">
          <el-col :span="12">
            <el-select v-model="dataSource.DataSourceType" clearable placeholder="请选择数据源类型">
              <el-option
                v-for="dataSourceType in dataSourceTypeList"
                :key="dataSourceType.value"
                :label="dataSourceType.label"
                :value="dataSourceType.value"
              />
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="数据库名称" prop="DataSourceDatabaseName">
          <el-col :span="12">
            <el-input v-model="dataSource.DataSourceDatabaseName" placeholder="请输入数据库名称" />
          </el-col>
        </el-form-item>
        <el-form-item label="数据源IP" prop="DataSourceIp">
          <el-col :span="12">
            <el-input v-model="dataSource.DataSourceIp" placeholder="请输入数据源IP" />
          </el-col>
        </el-form-item>
        <el-form-item label="数据源端口号" prop="DataSourcePort">
          <el-col :span="12">
            <el-input
              v-model="dataSource.DataSourcePort"
              placeholder="请输入数据源端口号(请输入数字)"
              @keyup.native="isNum"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="数据源登录账户" prop="DataSourceUsername">
          <el-col :span="12">
            <el-input v-model="dataSource.DataSourceUsername" placeholder="请输入数据源登录账户" />
          </el-col>
        </el-form-item>
        <el-form-item label="数据源登录密码" prop="DataSourcePassword">
          <el-col :span="12">
            <el-input v-model="dataSource.DataSourcePassword" type="password" placeholder="请输入数据源登录密码" />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-button type="primary" size="mini" @click="handleTestConnect()">测试连接</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getDataSource, saveDataSource, testConnection, updateDataSource } from '../../../api/data_source'

// noinspection JSUnusedGlobalSymbols
export default {
  data() {
    const validatePort = (rule, value, callback) => {
      if (value % 1 === 0) {
        const port = parseInt(value)
        if (port > 0 && port < 65535) {
          callback()
        } else {
          callback(new Error('端口号应该为0到65535之间的数字'))
        }
      } else {
        callback(new Error('端口号必须为数字'))
      }
    }
    const validateIP = (rule, value, callback) => {
      const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入符合规则的IP地址'))
      }
    }
    return {
      isTestSuccess: false,
      dataSource: {
        DataSourceId: '',
        DataSourceName: '',
        DataSourceType: '',
        DataSourceDatabaseName: '',
        DataSourceIp: '',
        DataSourcePort: '',
        DataSourceUsername: '',
        DataSourcePassword: ''
      },
      dataSourceCopy: null,
      rules: {
        DataSourceName: [
          { required: true, message: '请填写数据源名称', trigger: 'blur' },
          { max: 50, message: '数据源名称应该在 50 个字符以内', trigger: 'blur' }
        ],
        DataSourceType: [{ required: true, message: '请选择数据源类型', trigger: 'change' }],
        DataSourceDatabaseName: [
          { required: true, message: '请填写数据源数据库名称', trigger: 'blur' },
          { max: 100, message: '数据源数据库名称应该在 100 个字符以内', trigger: 'blur' }
        ],
        DataSourceIp: [
          { required: true, message: '请填写数据源的IP地址', trigger: 'blur' },
          { validator: validateIP, trigger: 'blur' }
        ],
        DataSourcePort: [
          { required: true, message: '请填写数据源的端口号', trigger: 'blur' },
          { validator: validatePort, trigger: 'blur' }
        ],
        DataSourceUsername: [
          { required: true, message: '请填写数据源的登录账户', trigger: 'blur' },
          { max: 50, message: '数据源的登录账户应该在 50 个字符以内', trigger: 'blur' }
        ],
        DataSourcePassword: [
          { required: true, message: '请填写数据源的登录密码', trigger: 'blur' },
          { max: 50, message: '数据源的登录密码应该在 50 个字符以内', trigger: 'blur' }
        ]
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
    const dataSourceId = this.$route.params.dataSourceId
    if (dataSourceId) {
      this.getObject(dataSourceId)
    }
  },
  methods: {
    isNum() {
      if (this.dataSource.DataSourcePort) {
        this.dataSource.DataSourcePort = this.dataSource.DataSourcePort.replace(/[^\\.\d]/g, '')
        this.dataSource.DataSourcePort = this.dataSource.DataSourcePort.replace('.', '')
      }
    },
    getObject(dataSourceId) {
      getDataSource(dataSourceId).then(response => {
        this.dataSource = JSON.parse(JSON.stringify(response.data))
        this.dataSourceCopy = JSON.parse(JSON.stringify(response.data))
      })
    },
    handleBack() {
      this.$router.push({ name: 'DataViewDataSourceList' })
    },
    handleSubmit() {
      if (this.isTestSuccess) {
        this.$refs['dataViewDataSourceForm'].validate((valid) => {
          if (valid) {
            this.dataSource.DataSourcePort = parseInt(this.dataSource.DataSourcePort)
            if (this.dataSource.DataSourceId) {
              updateDataSource(this.dataSource).then(() => {
                this.$message({
                  type: 'success',
                  message: '更新成功'
                })
              })
            } else {
              saveDataSource(this.dataSource).then(() => {
                this.$message({
                  type: 'success',
                  message: '保存成功'
                })
              })
            }
            this.handleBack()
          } else {
            this.$message.error('请保证数据填写正确！')
          }
        })
      } else {
        this.$message.error('请先对数据源进行测试连接！')
      }
    },
    handleReset() {
      if (this.dataSourceCopy) {
        this.dataSource = JSON.parse(JSON.stringify(this.dataSourceCopy))
      } else {
        this.dataSource.DataDourceName = ''
        this.dataSource.DataSourceType = ''
        this.dataSource.DataSourceDatabaseName = ''
        this.dataSource.DataSourceIp = ''
        this.dataSource.DataSourcePort = ''
        this.dataSource.DataSourceUsername = ''
        this.dataSource.DataSourcePassword = ''
      }
    },
    handleTestConnect() {
      this.$refs['dataViewDataSourceForm'].validate((valid) => {
        if (valid) {
          this.dataSource.DataSourcePort = parseInt(this.dataSource.DataSourcePort)
          testConnection(this.dataSource).then(() => {
            this.$message({
              type: 'success',
              message: '测试成功'
            })
            this.isTestSuccess = true
            return true
          })
        } else {
          this.$message.error('请保证数据填写正确！')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
