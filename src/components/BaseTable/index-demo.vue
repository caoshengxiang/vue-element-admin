<template>
  <div class="com-container">
    <div class="com-con">
      <div class="com-search-bar">
        <div class="com-search-box">
          <div class="com-search-item">
            <el-input
              placeholder="请输入单车编号"
              v-model="form.num"
              clearable>
            </el-input>
          </div>
          <div class="com-search-item">
            <el-input
              placeholder="请输入电子牌照"
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
          <el-button type="primary">注册</el-button>
          <el-button type="primary">批量注册</el-button>
          <el-button type="primary">下载注册模板</el-button>
          <el-button type="primary">批量注销</el-button>
          <el-button type="primary">下载注销模板</el-button>
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
  import FixedThead from './FixedThead'
  import defaultFormThead from './tableSet_demo'

  export default {
    name: 'ElectronicLicenseIndex',
    components: { FixedThead },
    data() {
      return {
        form: {
          num: ''
        },
        tableData: [
          {
            id: 1,
            t1: '1102020',
            t2: 'xx123456789456123',
            t3: '是',
            t4: 'orange-10',
            t5: 'orange-10',
            t6: 'orange-10',
            t7: 'orange-10'
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
</style>
