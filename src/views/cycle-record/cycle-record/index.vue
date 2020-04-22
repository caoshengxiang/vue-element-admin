<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <div class="com-bar">
        <div class="com-bar-show">
          <div class="com-bar-left">
            <span class="com-bar-item">
              <el-upload
                action=""
                class="upload-demo"
                :show-file-list="false"
                :before-upload="beforeUpload"
              >
                <el-button type="primary">上传骑行记录</el-button>
              </el-upload>
            </span>

            <span class="com-bar-item"><el-button type="text" @click="excelExport">下载模板</el-button></span>
            <span class="com-bar-item"><el-button type="text" style="color: #ffa949" @click="showUploadHisList3">批量上传记录</el-button></span>
          </div>
          <div class="com-bar-right">
            <span class="com-search-item com-bar-item">
              <el-input
                v-model="searchForm.name"
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
                <el-form-item label="名字" prop="name">
                  <el-input v-model="searchForm.name" clearable />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="身份证" prop="idCard">
                  <el-input v-model="searchForm.idCard" clearable />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item clearable label="是否违章" prop="valid">
                  <el-radio-group v-model="searchForm.valid">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="违章类型" prop="violationType">
                  <el-select v-model="searchForm.violationType" clearable placeholder="请选择">
                    <el-option
                      v-for="item in violationType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
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
            min-width="80px"
          >
            <template slot-scope="scope">
              <el-button type="text" class="com-color-danger" size="small" @click="handleType(scope.row, 3)">删除
              </el-button>
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
  import { fileDown } from '@/utils/file'
  import { mapState } from 'vuex'

  export default {
    name: 'CycleRecordIndex',
    components: { FixedThead },
    data() {
      return {
        /**/
        loading: false,
        moreShow: false,
        searchForm: {
          name: '',
          idCard: '',
          timeStart: '',
          timeEnd: '',
          valid: '',
          violationType: ''
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
        'violationType'
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
        // this.searchForm.keyword = ''
        this.valueTime = ''
        this.$refs[formName].resetFields()
        this.getList()
      },
      getList() {
        this.loading = true
        this.searchForm.timeStart = this.valueTime ? this.valueTime[0] : ''
        this.searchForm.timeEnd = this.valueTime ? this.valueTime[1] : ''
        this.$api.cycleRecord.list(Object.assign({},
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
          // this.$router.push({ name: 'electronic-license-add', query: { id: row.id }})
        } else if (type === 3) {
          this.$confirm('确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.cycleRecord.del({ ids: row.id }).then(res => {
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
      excelExport() { // 下载模板
        fileDown('supervisor/ride_record/download/template')
      },
      beforeUpload(file) {
        const param = new FormData()
        param.append('file', file, file.name)
        this.$api.cycleRecord.reportRecord(param).then((res) => {
          console.log(res)
          if (res.code === 200) {
            this.$message.success('上传成功')
            this.getList()
          }
        })
        return false
      },
      showUploadHisList3() {
        this.$router.push({ name: 'electronic-license-uploadList', query: { cate: '3' }})
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
