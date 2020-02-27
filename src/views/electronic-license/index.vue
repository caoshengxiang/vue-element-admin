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

            <span class="com-bar-item"><el-button type="primary" @click="excelExport">注册模板</el-button></span>
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
            <span class="com-bar-item"><el-button type="primary" @click="excelExport2">注销模板</el-button></span>
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
                <i v-if="!moreShow" class="el-icon-arrow-right el-icon--right"></i>
                <i v-else class="el-icon-arrow-up el-icon--right"></i>
              </el-button>
            </span>
          </div>
        </div>
        <div v-show="moreShow" class="com-more-search">
          <el-form ref="searchForm" :model="searchForm" label-width="90px" class="demo-ruleForm">
            <el-row>
              <el-col :xs="24" :sm="6">
                <el-form-item label="单车编号" prop="bikeNo">
                  <el-input clearable v-model="searchForm.bikeNo"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="电子牌照" prop="electroLicence">
                  <el-input clearable v-model="searchForm.electroLicence"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="公司" prop="company">
                  <el-input clearable v-model="searchForm.company"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="型号" prop="model">
                  <el-input clearable v-model="searchForm.model"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="颜色" prop="color">
                  <el-input clearable v-model="searchForm.color"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="车况" prop="condition">
                  <el-select clearable v-model="searchForm.condition" placeholder="请选择">
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
                  <el-select clearable v-model="searchForm.state" placeholder="请选择">
                    <el-option
                      v-for="item in electroLicence_state"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item clearable label="是否有蓝牙" prop="bluetooth">
                  <el-radio-group v-model="searchForm.bluetooth">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button icon="el-icon-search" type="primary" style="width: 200px" @click="search('searchForm')">查 询
              </el-button>
              <el-button style="width: 200px" @click="resetForm('searchForm')">重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="com-con-bom">
        <fixed-thead
          :total="total"
          :table-data="tableData"
          :default-form-thead="defaultFormThead"
        >
          <el-table-column
            fixed="right"
            label="操作"
            min-width="100px"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="logout(scope.row)">注销</el-button>
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
          pageSize: 20,
          currentPage: 1
        },
        total: 0,
        tableData: [],
        defaultFormThead: defaultFormThead
        /**/
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
        this.$refs[formName].resetFields()
      },
      getList() {
        this.loading = true
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
      /**/
      logout(row) {
        console.log(row)
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
      excelExport() { // 导出
        fileDown('supervisor/register/revoke/template')
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
