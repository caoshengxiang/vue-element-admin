<template>
  <div class="com-container">
    <div class="com-con">
      <div class="com-search-bar">
        <div class="com-search-box">
          <div class="com-search-item com-search-item-time">
            <span class="com-search-item-label">任务时间:</span>
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
            <el-input
              style="width: 160px"
              placeholder="请输入执行人"
              v-model="form.num"
              clearable>
            </el-input>
          </div>
          <div class="com-search-item">
            <el-select style="width: 160px" v-model="form.name" clearable placeholder="请选择任务状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="com-search-item">
            <el-select style="width: 160px" v-model="form.type" clearable placeholder="请选择调度类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
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
              <el-button type="text" size="small" @click="logout(scope.row)">详情</el-button>
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
          num: '',
          value: '',
          type: ''
        },
        tableData: [
          {
            id: 1,
            t1: '100001',
            t2: '调度中',
            t3: '天府三街南侧',
            t4: '王五',
            t5: '美团',
            t6: '2020-01-11 12:00:00',
            t7: '界外停车'
          },
          {
            id: 1,
            t1: '100002',
            t2: '调度中',
            t3: '天府三街南侧',
            t4: '王五',
            t5: '美团',
            t6: '2020-01-11 12:00:00',
            t7: '界外停车'
          },
          {
            id: 1,
            t1: '100003',
            t2: '调度中',
            t3: '天府三街南侧',
            t4: '王五',
            t5: '美团',
            t6: '2020-01-11 12:00:00',
            t7: '界外停车'
          },
          {
            id: 1,
            t1: '100004',
            t2: '调度中',
            t3: '天府三街南侧',
            t4: '王五',
            t5: '美团',
            t6: '2020-01-11 12:00:00',
            t7: '界外停车'
          },
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
