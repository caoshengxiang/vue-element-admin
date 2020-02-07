<template>
  <div class="fixed-thead">
    <div class="filter-container">
      <span>显示字段：</span>
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox :label="item.key" v-for="item in formTheadOptions" :key="item.key">
          {{item.name}}
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table size="mini" :key="key" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column v-for="item in formThead" :key="item" :label="item.name" :prop="item.key">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">注销</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  const defaultFormThead = [{
    key: 't1',
    name: '单车编号'
  }, {
    key: 't2',
    name: '电子牌照'
  }, {
    key: 't3',
    name: '蓝牙标识'
  }, {
    key: 't4',
    name: '车况'
  }, {
    key: 't5',
    name: '车辆型号'
  }, {
    key: 't7',
    name: '颜色'
  }, {
    key: 't7',
    name: '注册时间'
  }]

  export default {
    data() {
      return {
        tableData: [
          {
            t1: 'fruit-1',
            t2: 'apple-10',
            t3: 'banana-10',
            t4: 'orange-10',
            t5: 'orange-10',
            t6: 'orange-10',
            t7: 'orange-10'
          }
        ],
        key: 1, // table key
        formTheadOptions: defaultFormThead,
        checkboxVal: [], // checkboxVal
        formThead: defaultFormThead // 默认表头 Default header
      }
    },
    watch: {
      checkboxVal(valArr = []) {
        this.formThead = this.formTheadOptions.filter((item, i) => {
          if (valArr.includes(item.key)) {
            return item
          }
        })
        this.key = this.key + 1// 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
      }
    },
    created() {
      this.checkboxVal = defaultFormThead.map(item => {
        return item.key
      })
    }
  }
</script>

