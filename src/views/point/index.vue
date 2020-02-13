<template>
  <div class="com-container point">
    <div class="com-con">
      <div class="com-search-bar">
        <div class="com-search-box">
          <div class="com-search-item">
            <el-select v-model="form.value" clearable placeholder="请选择街道">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="com-search-item">
            <el-input
              placeholder="点位名称"
              v-model="form.name"
              clearable>
            </el-input>
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
        <fixed-thead
          :table-data="tableData"
          :default-form-thead="defaultFormThead"
          @cell-click="cellClickHandle"
        >
          <el-table-column
            fixed="right"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="logout(scope.row)">容量</el-button>
              <el-button type="text" size="small" @click="logout(scope.row)">围栏</el-button>
              <el-button type="text" size="small" @click="logout(scope.row)">地图</el-button>
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
        form: {
          name: '',
          value: ''
        },
        tableData: [
          {
            id: 1,
            t1: '天府五街',
            t2: '桂溪街道',
            t3: 1,
            t4: 200,
            t5: 200,
            t6: 200,
            t7: 200
          }, {
            id: 2,
            t1: '天府三街',
            t2: '桂溪街道',
            t3: 1,
            t4: 200,
            t5: 200,
            t6: 200,
            t7: 200
          }, {
            id: 3,
            t1: '世纪城',
            t2: '桂溪街道',
            t3: 1,
            t4: 200,
            t5: 200,
            t6: 200,
            t7: 200
          }
        ],
        defaultFormThead: defaultFormThead
      }
    },
    methods: {
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
