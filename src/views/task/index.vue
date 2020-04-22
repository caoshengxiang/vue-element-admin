<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <div class="com-bar">
        <div class="com-bar-show">
          <div class="com-bar-left">
            <span v-if="platformType === 1" class="com-bar-item"><el-button type="primary" @click="add">下发</el-button></span>
          </div>
          <div class="com-bar-right">
            <span class="com-search-item com-bar-item">
              <el-input
                v-model="searchForm.executorName"
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
                <el-form-item label="执行人" prop="executorName">
                  <el-input v-model="searchForm.executorName" clearable />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="任务状态" prop="state">
                  <el-select v-model="searchForm.state" clearable placeholder="请选择">
                    <el-option
                      v-for="item in taskState"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="调度类型" prop="taskType">
                  <el-select v-model="searchForm.taskType" clearable placeholder="请选择">
                    <el-option
                      v-for="item in taskType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="点位" prop="parkingSpotId">
                  <el-select v-model="searchForm.parkingSpotId" clearable placeholder="请选择">
                    <el-option
                      v-for="item in pointOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
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
              <!--              <el-col :xs="24" :sm="6">-->
              <!--                <el-form-item clearable label="是否有蓝牙" prop="bluetooth">-->
              <!--                  <el-radio-group v-model="searchForm.bluetooth">-->
              <!--                    <el-radio :label="true">是</el-radio>-->
              <!--                    <el-radio :label="false">否</el-radio>-->
              <!--                  </el-radio-group>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
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
          @row-dblclick="(row) => {handleType(row, 1)}"
        >
          <el-table-column
            fixed="right"
            label="操作"
            min-width="100px"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleType(scope.row, 1)">详情</el-button>
              <el-button v-if="platformType === 1" type="text" class="com-color-danger" size="small" @click="handleType(scope.row, 2)">删除
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
  import { platformType } from '@/utils/config'

  export default {
    name: 'ElectronicLicenseIndex',
    components: { FixedThead },
    data() {
      return {
        /**/
        platformType: platformType,
        loading: false,
        moreShow: false,
        searchForm: {
          parkingSpotId: '',
          executorName: '',
          state: '',
          taskType: '',
          taskTimeStart: '',
          taskTimeEnd: ''
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
        valueTime: '',
        pointOptions: []
      }
    },
    computed: {
      ...mapState('const', [
        'taskState',
        'taskType'
      ])
    },
    created() {
      if (this.$route.query.parkingSpotId) {
        this.searchForm.parkingSpotId = this.$route.query.parkingSpotId
      }
      this.getPoint()
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
        this.searchForm.taskTimeStart = this.valueTime ? this.valueTime[0] : ''
        this.searchForm.taskTimeEnd = this.valueTime ? this.valueTime[1] : ''
        this.$api.task.list(Object.assign({},
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
          this.$router.push({ name: 'task-add', query: { id: row.id, viewType: 'detail' }})
        } else if (type === 2) {
          this.$confirm('确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.task.del(row.id).then(res => {
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
        this.$router.push({ name: 'task-add', query: { viewType: 'add' }})
      },
      getPoint() {
        this.$api.points.list({
          size: 1000,
          current: 1
        }).then(res => {
          const { data } = res
          this.pointOptions = data.records
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
