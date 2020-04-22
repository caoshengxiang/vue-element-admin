<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <div class="com-bar">
        <div class="com-bar-show">
          <div class="com-bar-left" />
          <div class="com-bar-right">
            <!--            <span class="com-search-item com-bar-item">-->
            <!--              <el-input-->
            <!--                v-model="searchForm.keyword"-->
            <!--                placeholder="请输入关键词"-->
            <!--                clearable-->
            <!--              />-->
            <!--            </span>-->
            <!--            <span class="com-bar-item">-->
            <!--              <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>-->
            <!--              <el-button type="primary" plain @click="moreShow = !moreShow">更多-->
            <!--                <i v-if="!moreShow" class="el-icon-arrow-right el-icon&#45;&#45;right" />-->
            <!--                <i v-else class="el-icon-arrow-up el-icon&#45;&#45;right" />-->
            <!--              </el-button>-->
            <!--            </span>-->
          </div>
        </div>
        <!--        <div v-show="moreShow" class="com-more-search">-->
        <!--          <el-form ref="searchForm" :model="searchForm" label-width="90px" class="demo-ruleForm">-->
        <!--          </el-form>-->
        <!--        </div>-->
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
              <el-button v-if="scope.row.detail" type="text" size="small" @click="handleType(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </fixed-thead>
      </div>
    </div>

    <el-dialog title="详情" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" style="width: 100%">
        <el-table-column property="row" label="行号" width="100" />
        <el-table-column property="reason" label="原因" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import FixedThead from '../../../components/BaseTable/FixedThead'
  import defaultFormThead from './tableSet'
  // import API from '@/api'
  import { mapState } from 'vuex'

  export default {
    name: 'UploadList',
    components: { FixedThead },
    data() {
      return {
        /**/
        loading: false,
        moreShow: false,
        searchForm: {
          cate: 1
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
        dialogTableVisible: false,
        gridData: [
        ]
      }
    },
    computed: {
      ...mapState('const', [])
    },
    created() {
      if (this.$route.query.cate) {
        this.searchForm.cate = this.$route.query.cate
      }
      this.getList()
    },
    methods: {
      /**/
      search() {
        this.getList()
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.getList()
      },
      getList() {
        this.loading = true
        this.$api.common.batchTask(Object.assign({},
          this.pageForm,
          this.searchForm
        )).then(res => {
          const { data } = res
          this.total = data.total
          this.tableData = data.records.map(item => {
            if (item.detail) {
              item.details = JSON.parse(item.detail)
            }
            return item
          })
          this.loading = false
        }).catch(() => { this.loading = false })
      },
      pageQueryChange(pageForm) {
        this.pageForm = pageForm
        this.getList()
      },
      /**/
      handleType(row) {
        this.dialogTableVisible = true
        this.gridData = row.details
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
