<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <div class="com-bar">
        <div class="com-bar-show">
          <div class="com-bar-left">
            <span class="com-bar-item"><el-button type="primary" @click="add">注册</el-button></span>
            <span class="com-bar-item">
              <el-upload
                action=""
                class="upload-demo"
                :show-file-list="false"
                :before-upload="beforeUpload"
              >
                <el-button type="primary">批量注册</el-button>
              </el-upload>
            </span>

            <span class="com-bar-item"><el-button type="text" @click="excelExport">下载注册模板</el-button></span>
            <span class="com-bar-item">
              <el-upload
                action=""
                class="upload-demo"
                :show-file-list="false"
                :before-upload="beforeUpload2"
              >
                <el-button type="primary">批量注销</el-button>
              </el-upload>
            </span>
            <span class="com-bar-item"><el-button type="text" @click="excelExport2">下载注销模板</el-button></span>
          </div>
          <div class="com-bar-right">
            <span class="com-search-item com-bar-item">
              <el-input
                v-model="searchForm.keyword"
                placeholder="请输入关键词"
                clearable
              />
            </span>
            <span class="com-bar-item">
              <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
              <el-button type="primary" plain @click="moreShow = !moreShow">更多
                <i v-if="!moreShow" class="el-icon-arrow-right el-icon--right" />
                <i v-else class="el-icon-arrow-up el-icon--right" />
              </el-button>
            </span>
          </div>
        </div>
        <div v-show="moreShow" class="com-more-search">
          <el-form ref="searchForm" :model="searchForm" label-width="90px" class="demo-ruleForm">
            <el-row>
              <el-col :xs="24" :sm="6">
                <el-form-item label="单车编号" prop="bikeNo">
                  <el-input v-model="searchForm.bikeNo" clearable />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="电子牌照" prop="electroLicence">
                  <el-input v-model="searchForm.electroLicence" clearable />
                </el-form-item>
              </el-col>
              <!--              <el-col :xs="24" :sm="6">-->
              <!--                <el-form-item label="公司" prop="company">-->
              <!--                  <el-input v-model="searchForm.company" clearable />-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <!--              <el-col :xs="24" :sm="6">-->
              <!--                <el-form-item label="型号" prop="model">-->
              <!--                  <el-input v-model="searchForm.model" clearable />-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <!--              <el-col :xs="24" :sm="6">-->
              <!--                <el-form-item label="颜色" prop="color">-->
              <!--                  <el-input v-model="searchForm.color" clearable />-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :xs="24" :sm="6">
                <el-form-item label="车况" prop="condition">
                  <el-select v-model="searchForm.condition" clearable placeholder="请选择">
                    <el-option
                      v-for="item in electroLicence_condition"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="状态" prop="state">
                  <el-select v-model="searchForm.state" clearable placeholder="请选择">
                    <el-option
                      v-for="item in electroLicence_state"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <!--              <el-col :xs="24" :sm="6">-->
              <!--                <el-form-item clearable label="是否有蓝牙" prop="bluetooth">-->
              <!--                  <el-radio-group v-model="searchForm.bluetooth">-->
              <!--                    <el-radio :label="true">是</el-radio>-->
              <!--                    <el-radio :label="false">否</el-radio>-->
              <!--                  </el-radio-group>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :xs="24" :sm="12">
                <el-form-item label="骑行时间" prop="">
                  <el-date-picker
                    v-model="valueTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                    :unlink-panels="true"
                    style="width: 260px;"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="padding-left: 90px;">
              <el-col :xs="24" :sm="6">
                <el-button
                  icon="el-icon-search"
                  type="primary"
                  style="width: 100%;margin-bottom: 14px"
                  @click="search('searchForm')"
                >查 询
                </el-button>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-button style="width: 100%;margin-bottom: 14px;" @click="resetForm('searchForm')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="com-con-bom">
        <fixed-thead
          :total="total"
          :table-data="tableData"
          :default-form-thead="defaultFormThead"
          @pageQueryChange="pageQueryChange"
        >
          <el-table-column
            fixed="right"
            label="操作"
            min-width="170px"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleType(scope.row, 1)">编辑</el-button>
              <el-button type="text" class="com-color-warning" size="small" @click="handleType(scope.row, 2)">注销</el-button>
              <el-button type="text" class="com-color-danger" size="small" @click="handleType(scope.row, 3)">删除</el-button>
              <el-button type="text" size="small" @click="handleType(scope.row, 4)">维保</el-button>
            </template>
          </el-table-column>
        </fixed-thead>
      </div>
    </div>
  </div>
</template>

<script>
  import FixedThead from '../../components/BaseTable/FixedThead'
  import defaultFormThead from './tableSet'
  // import API from '@/api'
  import { fileDown } from '@/utils/file'
  import { mapState } from 'vuex'

  export default {
    name: 'ElectronicLicenseIndex',
    components: { FixedThead },
    data() {
      return {
        /**/
        loading: false,
        moreShow: false,
        searchForm: {
          keyword: '',
          bikeNo: '',
          electroLicence: '',
          company: '',
          model: '',
          color: '',
          condition: '',
          bluetooth: ''
        },
        pageForm: {
          size: 20,
          current: 1
        },
        total: 0,
        tableData: [],
        defaultFormThead: defaultFormThead,
        /**/
        valueTime: ''
      }
    },
    computed: {
      ...mapState('const', [
        'electroLicence_condition',
        'electroLicence_state'
      ])
    },
    created() {
      this.getList()
    },
    methods: {
      /**/
      search() {
        this.getList()
      },
      resetForm(formName) {
        this.searchForm.keyword = ''
        this.valueTime = ''
        this.$refs[formName].resetFields()
        this.getList()
      },
      getList() {
        this.loading = true
        this.searchForm.registryStart = this.valueTime ? this.valueTime[0] : ''
        this.searchForm.registryEnd = this.valueTime ? this.valueTime[1] : ''
        this.$api.electronicLicense.list(Object.assign({},
          this.pageForm,
          this.searchForm
        )).then(res => {
          const { data } = res
          this.total = data.total
          this.tableData = data.records
          this.loading = false
        }).catch(() => { this.loading = false })
      },
      pageQueryChange(pageForm) {
        this.pageForm = pageForm
        this.getList()
      },
      /**/
      handleType(row, type) {
        if (type === 1) {
          this.$router.push({ name: 'electronic-license-add', query: { id: row.id }})
        } else if (type === 2) {
          this.$confirm('确认注销, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.electronicLicense.revoke(row.id).then(res => {
              if (res.code === 200) {
                this.$message.success('注销成功')
                this.getList()
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        } else if (type === 3) {
          this.$confirm('确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.electronicLicense.del(row.id).then(res => {
              if (res.code === 200) {
                this.$message.success('删除成功')
                this.getList()
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        } else if (type === 4) {
          this.$router.push({ name: 'repair-index', query: { electroLicence: row.electroLicence }})
        }
      },
      add() {
        this.$router.push({ name: 'electronic-license-add' })
      },
      beforeUpload(file) {
        const param = new FormData()
        param.append('file', file, file.name)
        this.$api.electronicLicense.batchRegistry(param, (res) => {
          if (res.code === 200) {
            this.$message.success('批量注册成功')
          }
        })

        return false
      },
      excelExport() { // 注册模板
        fileDown('supervisor/register/download/template')
      },
      beforeUpload2(file) {
        const param = new FormData()
        param.append('file', file, file.name)
        this.$api.electronicLicense.batchRevoke(param, (res) => {
          if (res.code === 200) {
            this.$message.success('批量注销成功')
          }
        })
        return false
      },
      excelExport2() { // 注销
        fileDown('supervisor/register/revoke/template')
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
