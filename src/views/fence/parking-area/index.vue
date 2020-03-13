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
                <el-form-item label="摄像头" prop="hasCamera">
                  <el-select v-model="searchForm.hasCamera" clearable placeholder="是否有摄像头">
                    <el-option label="有摄像头" :value="true" />
                    <el-option label="无摄像头" :value="false" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="所属点位" prop="parkingSpotId">
                  <el-select v-model="searchForm.parkingSpotId" clearable placeholder="所属点位" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="有效期" prop="focused">
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
      <div class="con">
        <fixed-thead
          :total="total"
          :table-data="tableData"
          :default-form-thead="defaultFormThead"
          @pageQueryChange="pageQueryChange"
          @cell-click="cellClickHandle"
        >
          <el-table-column
            fixed="right"
            label="操作"
            min-width="160"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleType(scope.row, 1)">编辑</el-button>
              <el-button class="com-color-danger" type="text" size="small" @click="handleType(scope.row, 2)">删除</el-button>
            </template>
          </el-table-column>
        </fixed-thead>
      </div>
    </div>
  </div>
</template>

<script>
  import FixedThead from '../../../components/BaseTable/FixedThead'
  import defaultFormThead from './tableSet'

  export default {
    name: 'FenceAreaIndex',
    components: { FixedThead },
    data() {
      return {
        /**/
        loading: false,
        moreShow: false,
        searchForm: {
          type: 1,
          keyword: '',
          hasCamera: '',
          validStart: '',
          validEnd: ''
        },
        pageForm: {
          size: 20,
          current: 1
        },
        total: 0,
        tableData: [],
        defaultFormThead: defaultFormThead,
        /**/
        valueTime: null
      }
    },
    created() {
      this.getList()
    },
    methods: {
      /**/
      search() {
        this.getList()
      },
      pageQueryChange(pageForm) {
        this.pageForm = pageForm
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
        this.searchForm.validStart = this.valueTime ? this.valueTime[0] : ''
        this.searchForm.validEnd = this.valueTime ? this.valueTime[1] : ''
        this.$api.fence.list(Object.assign({},
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
      add() {
        this.$router.push({ name: 'fence-area-add' })
      },
      handleType(row, type) {
        if (type === 1) {
          this.$router.push({ name: 'fence-area-add', query: { id: row.id }})
        } else if (type === 2) {
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.del.del(row.id).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getList()
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }
      },
      cellClickHandle(obj) {
        if (obj.key === 'taskNum') { // 任务
          alert(obj.name)
        }
        if (obj.key === 'alertNum') { // 预警
          alert(obj.name)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
