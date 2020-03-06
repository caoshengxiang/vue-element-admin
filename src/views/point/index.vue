<template>
  <div v-loading="loading" class="com-container point">
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
                <el-form-item label="点位名称" prop="name" clearable>
                  <el-input v-model="searchForm.name" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="街道" prop="regionId">
                  <el-select v-model="searchForm.regionId" filterable placeholder="请选择" clearable>
                    <el-option
                      v-for="item in streetOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="容量范围">
                  <el-input v-model.number="searchForm.capacityStart" style="width: 40%" type="number" />
                  到
                  <el-input v-model.number="searchForm.capacityEnd" style="width: 40%" type="number" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="重点点位" prop="focused">
                  <el-radio-group v-model="searchForm.focused">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="padding-left: 90px;">
              <el-col :xs="24" :sm="6">
                <el-button icon="el-icon-search" type="primary" style="width: 100%;margin-bottom: 14px" @click="search('searchForm')">查 询
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
          @cell-click="cellClickHandle"
          @pageQueryChange="pageQueryChange"
        >
          <el-table-column
            fixed="right"
            label="操作"
            min-width="180px"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleType(scope.row, 2)">围栏</el-button>
              <!--              <el-button type="text" size="small" @click="handleType(scope.row, 3)">边界</el-button>-->
              <el-button type="text" size="small" @click="handleType(scope.row, 4)">编辑</el-button>
              <el-button class="com-color-danger" type="text" size="small" @click="handleType(scope.row, 1)">删除</el-button>
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

  export default {
    name: 'PointIndex',
    components: { FixedThead },
    data() {
      return {
        /**/
        loading: false,
        moreShow: false,
        searchForm: {
          keyword: '',
          name: '',
          focused: '',
          capacityStart: '',
          capacityEnd: ''
        },
        pageForm: {
          size: 20,
          current: 1
        },
        total: 0,
        tableData: [],
        defaultFormThead: defaultFormThead,
        /**/
        streetOptions: []
      }
    },
    created() {
      this.getStreet()
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
        this.$refs[formName].resetFields()
        this.getList()
      },
      getStreet() {
        this.$api.common.street({ deep: 3 }).then(res => {
          this.streetOptions = res.rows
        })
      },
      getList() {
        this.loading = true
        this.$api.points.list(Object.assign({},
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
        this.$router.push({ name: 'point-add' })
      },
      handleType(row, type) {
        switch (type) {
          case 1: // 删除
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$api.points.del(row.id).then(res => {
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
            break
          case 4: // 编辑
            this.$router.push({ name: 'point-add', query: { id: row.id }})
        }
      },
      cellClickHandle(obj) {
        if (obj.key === 'maxCapacity') { // 容量
          const row = obj.row
          this.$router.push({ name: 'point-capacity', query: { id: row.id }})
        }
        if (obj.key === 'taskNum') { // 任务
          alert(obj.name)
        }
        if (obj.key === 'alertNum') { // 预警
          alert(obj.name)
        }
        if (obj.key === 'parkingNum' || obj.key === 'mtNum' || obj.key === 'qjNum' || obj.key === 'hlNum') { // 停放量
          const row = obj.row
          this.$router.push({ name: 'statistics-park', query: { parkId: row.id }})
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .point {

  }
</style>
