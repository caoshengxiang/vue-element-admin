<template>
  <div class="com-container">
    <div class="com-con">
      <div class="com-search-bar">
        <div class="com-search-box">
          <div class="com-search-item com-search-item-time">
            <span class="com-search-item-label">时间:</span>
            <el-date-picker
              style="width: 240px;"
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="com-search-item">
            <el-select style="width: 160px" v-model="form.s1" clearable placeholder="请选择处理状态">
              <el-option label="待处理" :value="1"></el-option>
              <el-option label="已处理" :value="2"></el-option>
            </el-select>
          </div>
          <div class="com-search-item">
            <el-select style="width: 160px" v-model="form.type" clearable placeholder="请选择区/县">
            </el-select>
          </div>
          <div class="com-search-item">
            <el-select style="width: 160px" v-model="form.type" clearable placeholder="请选择街道">
            </el-select>
          </div>
          <div class="com-search-item">
            <el-select style="width: 160px" v-model="form.type" clearable placeholder="请选择点位">
            </el-select>
          </div>
          <div class="com-search-item">
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
          </div>
        </div>
        <div class="com-btns-box">
        </div>
      </div>
      <div class="con">
        <fixed-thead :table-data="tableData" :default-form-thead="defaultFormThead">
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="scope.row.t5 === 1" @click="logout(scope.row)">已处理</el-button>
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
    name: 'ElectronicLicenseIndex',
    components: { FixedThead },
    data() {
      return {
        value1: '',
        options: [],
        form: {
          s1: '',
          s2: '',
          s3: ''
        },
        tableData: [
          {
            id: 1,
            t1: '天府五街停车点',
            t2: '天府五街A口',
            t3: '2020-01-10',
            t4: '脏车',
            t5: 1
          },
          {
            id: 1,
            t1: '天府五街停车点',
            t2: '天府五街A口',
            t3: '2020-01-10',
            t4: '脏车',
            t5: 2
          }, {
            id: 1,
            t1: '世纪城街停车点',
            t2: '世纪城',
            t3: '2020-01-10',
            t4: '报废车',
            t5: 1
          },
          {
            id: 1,
            t1: '世纪城停车点',
            t2: '世纪城',
            t3: '2020-01-10',
            t4: '报废车',
            t5: 2
          }
        ],
        defaultFormThead: defaultFormThead
      }
    },
    methods: {
      logout(row) {
        console.log(row)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
