<template>
  <div class="com-container">
    <div class="com-con-box">
      <div class="com-bar">
        <div class="com-bar-left">
          <span class="com-bar-item"><el-button type="primary">注册</el-button></span>
          <span class="com-bar-item"><el-button type="primary">批量注册</el-button></span>
          <span class="com-bar-item"><el-button type="primary">注册模板</el-button></span>
          <span class="com-bar-item"><el-button type="primary">批量注销</el-button></span>
          <span class="com-bar-item"><el-button type="primary">注销模板</el-button></span>
        </div>
        <div class="com-bar-right">
          <span class="com-search-item com-bar-item">
            <el-input
              placeholder="请输入单车编号"
              v-model="form.num"
              clearable>
            </el-input>
          </span>
          <span class="com-search-item com-bar-item">
            <el-input
              placeholder="请输入电子牌照"
              v-model="form.num"
              clearable>
            </el-input>
          </span>
          <span class="com-bar-item">
            <el-button icon="el-icon-search" type="primary">查询</el-button>
            <el-button>重置</el-button>
          </span>
        </div>
      </div>
      <div class="com-con-bom">
        <fixed-thead
          :total="total"
          :table-data="tableData"
          :default-form-thead="defaultFormThead">
          <el-table-column
            fixed="right"
            label="操作"
            min-width="100px"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="logout(scope.row)">注销</el-button>
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
  import API from '@/api'
  // import electronicLicense from '../../api/electronicLicense'

  export default {
    name: 'ElectronicLicenseIndex',
    components: { FixedThead },
    data() {
      return {
        form: {
          num: ''
        },
        pageForm: {
          pageSize: 20,
          currentPage: 1
        },
        total: 100,
        tableData: [
          {
            id: 1,
            t1: '1102021',
            t2: 'xx123456789456123xx123456789456123',
            t3: 0,
            t4: '车辆运行良好',
            t5: 'xx2020',
            t6: '绿色',
            t7: '2016-09-21 08:50:08'
          }, {
            id: 2,
            t1: '1102022',
            t2: 'xx123456789456124',
            t3: 1,
            t4: '车辆运行良好',
            t5: 'xx2020',
            t6: '绿色',
            t7: '2016-09-21 08:50:08'
          }, {
            id: 3,
            t1: '1102023',
            t2: 'xx123456789456125',
            t3: 0,
            t4: '车辆运行良好',
            t5: 'xx2020',
            t6: '绿色',
            t7: '2016-09-21 08:50:08'
          }, {
            id: 4,
            t1: '1102024',
            t2: 'xx123456789456126',
            t3: 0,
            t4: '车辆运行良好',
            t5: 'xx2020',
            t6: '绿色',
            t7: '2016-09-21 08:50:08'
          }, {
            id: 5,
            t1: '1102025',
            t2: 'xx123456789456127',
            t3: 0,
            t4: '车辆运行良好',
            t5: 'xx2020',
            t6: '绿色',
            t7: '2016-09-21 08:50:08'
          }, {
            id: 5,
            t1: '1102025',
            t2: 'xx123456789456127',
            t3: 0,
            t4: '车辆运行良好',
            t5: 'xx2020',
            t6: '绿色',
            t7: '2016-09-21 08:50:08'
          }, {
            id: 5,
            t1: '1102025',
            t2: 'xx123456789456127',
            t3: 0,
            t4: '车辆运行良好',
            t5: 'xx2020',
            t6: '绿色',
            t7: '2016-09-21 08:50:08'
          }, {
            id: 5,
            t1: '1102025',
            t2: 'xx123456789456127',
            t3: 0,
            t4: '车辆运行良好',
            t5: 'xx2020',
            t6: '绿色',
            t7: '2016-09-21 08:50:08'
          }, {
            id: 5,
            t1: '1102025',
            t2: 'xx123456789456127',
            t3: 0,
            t4: '车辆运行良好',
            t5: 'xx2020',
            t6: '绿色',
            t7: '2016-09-21 08:50:08'
          }, {
            id: 5,
            t1: '1102025',
            t2: 'xx123456789456127',
            t3: 0,
            t4: '车辆运行良好',
            t5: 'xx2020',
            t6: '绿色',
            t7: '2016-09-21 08:50:08'
          }
        ],
        defaultFormThead: defaultFormThead
      }
    },
    created() {
      this.getList()
    },
    methods: {
      logout(row) {
        console.log(row)
      },
      getList() {
        API.electronicLicense.list({}).then(da => {
          console.log(da)
        })
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
