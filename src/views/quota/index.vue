<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <div class="com-bar">
        <div class="com-bar-show">
          <div class="com-bar-left">
            <!--            <span class="com-bar-item"><el-button type="primary" @click="add">注册</el-button></span>-->
          </div>
          <div class="com-bar-right">
            <!--            <span class="com-search-item com-bar-item">-->
            <!--              <el-select v-model="searchForm.company" clearable placeholder="请选择">-->
            <!--                <el-option-->
            <!--                  v-for="item in bikeCompany"-->
            <!--                  :key="item.value"-->
            <!--                  :label="item.label"-->
            <!--                  :value="item.value"-->
            <!--                />-->
            <!--              </el-select>-->
            <!--            </span>-->
            <!--            <span class="com-bar-item">-->
            <!--              <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>-->
            <!--              &lt;!&ndash;              <el-button type="primary" plain @click="moreShow = !moreShow">更多&ndash;&gt;-->
            <!--              &lt;!&ndash;                <i v-if="!moreShow" class="el-icon-arrow-right el-icon&#45;&#45;right"/>&ndash;&gt;-->
            <!--              &lt;!&ndash;                <i v-else class="el-icon-arrow-up el-icon&#45;&#45;right"/>&ndash;&gt;-->
            <!--              &lt;!&ndash;              </el-button>&ndash;&gt;-->
            <!--            </span>-->
          </div>
        </div>
        <div v-show="moreShow" class="com-more-search">
          <el-form ref="searchForm" :model="searchForm" label-width="90px" class="demo-ruleForm">
            <el-row>
              <!--              <el-col :xs="24" :sm="6">-->
              <!--                <el-form-item label="单车编号" prop="bikeNo">-->
              <!--                  <el-input v-model="searchForm.bikeNo" clearable />-->
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
          :table-data="tableData"
          :default-form-thead="defaultFormThead"
          @pageQueryChange="pageQueryChange"
        >
          <el-table-column
            fixed="right"
            label="操作"
            min-width="80px"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleType(scope.row, 1)">编辑配额</el-button>
            </template>
          </el-table-column>
        </fixed-thead>
      </div>
    </div>
    <el-dialog
      title="修改配额"
      :visible.sync="dialogFormVisible"
      width="300px"
    >
      <el-form :model="form">
        <el-form-item label="配额" label-width="80px">
          <el-input v-model.number="form.capacity" type="number" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCapacity">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import FixedThead from '../../components/BaseTable/FixedThead'
  import defaultFormThead from './tableSet'
  // import API from '@/api'
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
          company: ''
        },
        pageForm: {
          size: 20,
          current: 1,
          desc: 'id'
        },
        tableData: [],
        defaultFormThead: defaultFormThead,
        /**/
        dialogFormVisible: false,
        form: {
          id: '',
          capacity: ''
        }
      }
    },
    computed: {
      ...mapState('const', ['bikeCompany'])
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
        this.$api.quota.list(Object.assign({},
          this.pageForm,
          this.searchForm
        )).then(res => {
          const { data } = res
          this.tableData = data
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
          this.dialogFormVisible = true
          this.form.capacity = row.capacity
          this.form.id = row.id
        }
      },
      saveCapacity() {
        this.$api.quota.add(this.form).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.dialogFormVisible = false
            this.getList()
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
