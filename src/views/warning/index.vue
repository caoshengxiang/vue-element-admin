<template>
  <div class="com-container">
    <div class="com-con">
      <div class="com-search-bar">
        <div class="com-search-box">
          <div class="com-search-item">
            <el-input
              placeholder="请输入单车公司"
              v-model="form.num"
              clearable>
            </el-input>
          </div>
          <div class="com-search-item">
            <el-input
              placeholder="请输入停车点"
              v-model="form.num"
              clearable>
            </el-input>
          </div>
          <div class="com-search-item">
            <el-select v-model="form.value" clearable placeholder="请选择事件类型">
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
            label="存证图片"
            width="100"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="logout(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="实时画面"
            width="100"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="logout(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
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

  export default {
    name: 'ElectronicLicenseIndex',
    components: { FixedThead },
    data() {
      return {
        form: {
          num: '',
          value: ''
        },
        options: [{
          value: '1',
          label: '车辆爆仓'
        }, {
          value: '2',
          label: '车辆不足'
        }, {
          value: '3',
          label: '围栏界外停车'
        }, {
          value: '4',
          label: '禁停区停车'
        }, {
          value: '5',
          label: '机动车道停车'
        }],
        tableData: [
          {
            id: 1,
            t1: '100001',
            t2: '罗阳小区',
            t3: '天府五街车辆不足请查看',
            t4: '美团',
            t5: 6,
            t6: '2020-01-11 12:00:00',
            t7: '车辆不足'
          }, {
            id: 1,
            t1: '100002',
            t2: '天府三街南侧',
            t3: '天府三街南侧车辆不足请查看',
            t4: '美团',
            t5: 6,
            t6: '2020-01-11 12:00:00',
            t7: '车辆不足'
          }, {
            id: 1,
            t1: '100003',
            t2: '世纪城地铁A口',
            t3: '世纪城地铁A口车辆不足',
            t4: '美团',
            t5: 6,
            t6: '2020-01-11 12:00:00',
            t7: '车辆不足'
          }, {
            id: 1,
            t1: '100004',
            t2: '天府五街',
            t3: '天府五街车辆爆仓请查看',
            t4: '美团',
            t5: 3,
            t6: '2020-01-11 12:00:00',
            t7: '车辆爆仓'
          }, {
            id: 1,
            t1: '100005',
            t2: '天府五街',
            t3: '天府五街摄像头违章请查看',
            t4: '摩拜',
            t5: 6,
            t6: '2020-01-11 12:00:00',
            t7: '摄像头违章'
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
