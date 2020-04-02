<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <div class="com-bar">
        <div class="com-bar-show">
          <div class="com-bar-left">
            <span class="com-bar-item"><el-button type="primary" @click="add">添加</el-button></span>
          </div>
          <div class="com-bar-right">
            <span class="com-search-item com-bar-item">
              <el-input
                v-model="searchForm.keyword"
                placeholder="请输入关键词"
                clearable
              />
            </span>
            <span class="com-search-item com-bar-item">
              <el-select v-model="searchForm.state" clearable placeholder="请选择状态">
                <el-option
                  v-for="item in cameraState"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </span>
            <span class="com-bar-item">
              <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
              <!--              <el-button type="primary" plain @click="moreShow = !moreShow">更多-->
              <!--                <i v-if="!moreShow" class="el-icon-arrow-right el-icon&#45;&#45;right" />-->
              <!--                <i v-else class="el-icon-arrow-up el-icon&#45;&#45;right" />-->
              <!--              </el-button>-->
            </span>
          </div>
        </div>
        <div v-show="moreShow" class="com-more-search">
          <!--          <el-form ref="searchForm" :model="searchForm" label-width="90px" class="demo-ruleForm">-->
          <!--            <el-row>-->
          <!--              <el-col :xs="24" :sm="6">-->
          <!--                <el-form-item label="执行人" prop="executorName">-->
          <!--                  <el-input v-model="searchForm.executorName" clearable></el-input>-->
          <!--                </el-form-item>-->
          <!--              </el-col>-->
          <!--              <el-col :xs="24" :sm="6">-->
          <!--                <el-form-item label="任务状态" prop="state">-->
          <!--                  <el-select v-model="searchForm.state" clearable placeholder="请选择">-->
          <!--                    <el-option-->
          <!--                      v-for="item in taskState"-->
          <!--                      :key="item.value"-->
          <!--                      :label="item.label"-->
          <!--                      :value="item.value"-->
          <!--                    />-->
          <!--                  </el-select>-->
          <!--                </el-form-item>-->
          <!--              </el-col>-->
          <!--              <el-col :xs="24" :sm="6">-->
          <!--                <el-form-item label="调度类型" prop="taskType">-->
          <!--                  <el-select v-model="searchForm.taskType" clearable placeholder="请选择">-->
          <!--                    <el-option-->
          <!--                      v-for="item in taskType"-->
          <!--                      :key="item.value"-->
          <!--                      :label="item.label"-->
          <!--                      :value="item.value"-->
          <!--                    />-->
          <!--                  </el-select>-->
          <!--                </el-form-item>-->
          <!--              </el-col>-->
          <!--          </el-row>-->
          <!--          <el-row :gutter="20" style="padding-left: 90px;">-->
          <!--            <el-col :xs="24" :sm="6">-->
          <!--              <el-button-->
          <!--                icon="el-icon-search"-->
          <!--                type="primary"-->
          <!--                style="width: 100%;margin-bottom: 14px"-->
          <!--                @click="search('searchForm')"-->
          <!--              >查 询-->
          <!--              </el-button>-->
          <!--            </el-col>-->
          <!--            <el-col :xs="24" :sm="6">-->
          <!--              <el-button style="width: 100%;margin-bottom: 14px;" @click="resetForm('searchForm')">重 置</el-button>-->
          <!--            </el-col>-->
          <!--          </el-row>-->
          <!--          </el-form>-->
        </div>
      </div>
      <div class="com-con-bom">
        <fixed-thead
          :total="total"
          :table-data="tableData"
          :default-form-thead="defaultFormThead"
          @pageQueryChange="pageQueryChange"
          @row-dblclick="(row) => {handleType(row, 3)}"
        >
          <el-table-column
            fixed="right"
            label="操作"
            min-width="140px"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleType(scope.row, 3)">详情</el-button>
              <el-button type="text" size="small" @click="handleType(scope.row, 1)">编辑</el-button>
              <el-button type="text" class="com-color-danger" size="small" @click="handleType(scope.row, 2)">删除
              </el-button>
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
          keyword: '',
          state: ''
        },
        pageForm: {
          size: 20,
          current: 1,
          descs: 'id'
        },
        total: 0,
        tableData: [],
        defaultFormThead: defaultFormThead
        /**/
      }
    },
    computed: {
      ...mapState('const', [
        'cameraState'
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
        this.$api.camera.list(Object.assign({},
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
          this.$router.push({ name: 'camera-add', query: { id: row.id }})
        } else if (type === 3) {
          this.$router.push({ name: 'camera-add', query: { id: row.id, viewType: 'detail' }})
        } else if (type === 2) {
          this.$confirm('确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.camera.del({ ids: row.id }).then(res => {
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
      },
      add() {
        this.$router.push({ name: 'camera-add' })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
