<template>
  <div class="com-container point">
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
                <i v-if="!moreShow" class="el-icon-arrow-right el-icon--right"></i>
                <i v-else class="el-icon-arrow-up el-icon--right"></i>
              </el-button>
            </span>
          </div>
        </div>
        <div v-show="moreShow" class="com-more-search">
          <el-form ref="searchForm" :model="searchForm" label-width="90px" class="demo-ruleForm">
            <el-row>
              <!--              <el-col :xs="24" :sm="6">-->
              <!--                <el-form-item label="单车编号" prop="bikeNo">-->
              <!--                  <el-input clearable v-model="searchForm.bikeNo"/>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
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
          @cell-click="cellClickHandle"
        >
          <el-table-column
            fixed="right"
            label="操作"
            min-width="120px"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="logout(scope.row)">容量</el-button>
              <el-button type="text" size="small" @click="logout(scope.row)">围栏</el-button>
              <el-button type="text" size="small" @click="logout(scope.row)">边界</el-button>
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
    name: 'Index',
    components: { FixedThead },
    data() {
      return {
        options: [
          {
            value: 1,
            label: '芳草街道办事处'
          }, {
            value: 2,
            label: '肖家河街道办事处'
          }, {
            value: 3,
            label: '合作街道'
          }, {
            value: 4,
            label: '西园街道'
          }, {
            value: 5,
            label: '芳草街道办事处'
          }, {
            value: 6,
            label: '石羊街道办事处'
          }, {
            value: 7,
            label: '中和街道办事处'
          }
        ],
        loading: false,
        moreShow: false,
        searchForm: {
          keyword: ''
        },
        pageForm: {
          pageSize: 20,
          currentPage: 1
        },
        total: 0,
        tableData: [],
        defaultFormThead: defaultFormThead
      }
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
      logout(row) {
        console.log(row)
      },
      cellClickHandle(obj) {
        if (obj.key === 't4') {
          alert(obj.name)
        }
        if (obj.key === 't5') {
          alert(obj.name)
        }
        if (obj.key === 't6') {
          alert(obj.name)
        }
        if (obj.key === 't7') {
          alert(obj.name)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .point {

  }
</style>
