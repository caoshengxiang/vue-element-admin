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
            <el-input
              placeholder="请输入姓名"
              v-model="form.num"
              clearable>
            </el-input>
          </div>
          <div class="com-search-item">
            <el-input
              placeholder="请输入身份证号"
              v-model="form.num"
              clearable>
            </el-input>
          </div>
          <div class="com-search-item">
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
          </div>
        </div>
        <div class="com-btns-box">
          <el-button type="primary">上传骑行人违章记录</el-button>
          <el-button type="text">下载骑行记录模板</el-button>
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
              <el-button type="text" size="small" @click="logout(scope.row)">删除</el-button>
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
        form: {
          num: ''
        },
        tableData: [
          {
            id: 1,
            t1: '张三',
            t2: '5111xxxxxx',
            t3: '2020-01-10',
            t4: '是',
            t5: '闯红灯'
          },
          {
            id: 2,
            t1: '李四',
            t2: '5111xxxxxx',
            t3: '2020-01-10',
            t4: '是',
            t5: '界外停车'
          },
          {
            id: 3,
            t1: '李里',
            t2: '5111xxxxxx',
            t3: '2020-01-10',
            t4: '是',
            t5: '界外停车'
          },
          {
            id: 3,
            t1: '李里',
            t2: '5111xxxxxx',
            t3: '2020-01-10',
            t4: '是',
            t5: '界外停车'
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
