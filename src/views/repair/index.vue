<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <div class="com-bar">
        <div class="com-bar-show">
          <div class="com-bar-left">
            <!--            <span class="com-bar-item"><el-button type="primary" @click="add">注册</el-button></span>-->
            <!--            <span class="com-bar-item">-->
            <!--              <el-upload-->
            <!--                action=""-->
            <!--                class="upload-demo"-->
            <!--                :show-file-list="false"-->
            <!--                :before-upload="beforeUpload"-->
            <!--              >-->
            <!--                <el-button type="primary">批量注册</el-button>-->
            <!--              </el-upload>-->
            <!--            </span>-->
          </div>
          <div class="com-bar-right">
            <span class="com-search-item com-bar-item">
              <el-input
                v-model="searchForm.spot"
                placeholder="请输入点位"
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
              <el-col :xs="24" :sm="6">
                <el-form-item label="点位名称" prop="spot">
                  <el-input v-model="searchForm.spot" clearable />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="地址" prop="eventAddr">
                  <el-input v-model="searchForm.eventAddr" clearable />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="5">
                <el-form-item label="状态" prop="state">
                  <el-select v-model="searchForm.state" clearable placeholder="请选择">
                    <el-option
                      v-for="item in repairState"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="5">
                <el-form-item label="维修分类" prop="category">
                  <el-select v-model="searchForm.category" clearable placeholder="请选择">
                    <el-option
                      v-for="item in repairType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="5">
                <el-form-item label="公司" prop="company">
                  <el-select v-model="searchForm.company" clearable placeholder="请选择">
                    <el-option
                      v-for="item in bikeCompany"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="9">
                <el-form-item label="时间" prop="focused">
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
            min-width="90px"
          >
            <template slot-scope="scope">
              <el-button v-if="scope.row.state === 1" type="text" size="small" @click="handleType(scope.row, 1)">处理</el-button>
              <el-button type="text" class="com-color-danger" size="small" @click="handleType(scope.row, 2)">删除</el-button>
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
          // keyword: '',
          bikeNo: '',
          electroLicence: '',
          timeStart: '',
          timeEnd: '',
          state: '',
          spot: '',
          eventAddr: '',
          category: '',
          company: ''
        },
        pageForm: {
          size: 20,
          current: 1,
          descs: 'id'
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
        'repairType',
        'repairState',
        'bikeCompany'
      ])
    },
    created() {
      this.searchForm.electroLicence = this.$route.query.electroLicence || ''
      this.getList()
    },
    methods: {
      /**/
      search() {
        this.getList()
      },
      resetForm(formName) {
        // this.searchForm.keyword = ''
        this.valueTime = ''
        this.$refs[formName].resetFields()
        this.getList()
      },
      getList() {
        this.loading = true
        this.searchForm.timeStart = this.valueTime ? this.valueTime[0] : ''
        this.searchForm.timeEnd = this.valueTime ? this.valueTime[1] : ''
        this.$api.repair.list(Object.assign({},
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
          this.$confirm('确认已处理, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.repair.addOrUpdate({ id: row.id, state: 2 }).then(res => {
              if (res.code === 200) {
                this.$message.success('处理成功')
                this.getList()
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        } else if (type === 2) {
          this.$confirm('确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.repair.del({ ids: row.id }).then(res => {
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
        }
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
