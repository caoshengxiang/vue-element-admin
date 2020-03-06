<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <div class="com-bar">
        <div class="com-bar-show">
          <div class="com-bar-left">
            <!--            <span class="com-bar-item"><el-button type="primary" @click="add">注册</el-button></span>-->
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
          <!--                <el-form-item label="单车编号" prop="bikeNo">-->
          <!--                  <el-input v-model="searchForm.bikeNo" clearable />-->
          <!--                </el-form-item>-->
          <!--              </el-col>-->
          <!--            </el-row>-->
          <!--            <el-row :gutter="20" style="padding-left: 90px;">-->
          <!--              <el-col :xs="24" :sm="6">-->
          <!--                <el-button icon="el-icon-search" type="primary" style="width: 100%;margin-bottom: 14px" @click="search('searchForm')">查 询-->
          <!--                </el-button>-->
          <!--              </el-col>-->
          <!--              <el-col :xs="24" :sm="6">-->
          <!--                <el-button style="width: 100%;margin-bottom: 14px;" @click="resetForm('searchForm')">重 置</el-button>-->
          <!--              </el-col>-->
          <!--            </el-row>-->
          <!--          </el-form>-->
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
              <el-button type="text" size="small" @click="handleType(scope.row, 1)">详情</el-button>
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
          keyword: ''
        },
        pageForm: {
          size: 20,
          current: 1
        },
        total: 0,
        tableData: [],
        defaultFormThead: defaultFormThead
        /**/
      }
    },
    computed: {
      ...mapState('const', [])
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
        this.getList()
      },
      getList() {
        this.loading = true
        this.$api.inspectlog.list(Object.assign({},
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
      handleType(row, type) {
        if (type === 1) {
          this.$router.push({ name: 'insLog-detail', query: { id: row.id, viewType: 'detail' }})
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
