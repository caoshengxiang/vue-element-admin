<template>
  <div class="com-container">
    <div class="com-con">
      <div class="com-search-bar">
        <div class="com-search-box">
          <div class="com-search-item com-search-item-time">
            <span class="com-search-item-label">有效期:</span>
            <el-date-picker
              style="width: 260px;"
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="com-search-item">
            <el-select v-model="form.value" clearable placeholder="是否有摄像头">
              <el-option label="有摄像头" :value="1"></el-option>
              <el-option label="无摄像头" :value="0"></el-option>
            </el-select>
          </div>
          <div class="com-search-item">
            <el-input
              style="width: 200px;"
              placeholder="围栏或点位或街道关键字"
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
          <el-button type="primary">注册</el-button>
          <el-button type="primary">批量注册</el-button>
          <el-button type="primary">下载注册模板</el-button>
          <el-button type="primary">批量注销</el-button>
          <el-button type="primary">下载注销模板</el-button>
        </div>
      </div>
      <div class="con">
        <fixed-thead :table-data="tableData" :default-form-thead="defaultFormThead">
          <el-table-column
            fixed="right"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="logout(scope.row)">图片</el-button>
              <el-button type="text" size="small" @click="logout(scope.row)">地图</el-button>
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

  export default {
    name: 'ElectronicLicenseIndex',
    components: { FixedThead },
    data() {
      return {
        value1: '',
        form: {
          name: '',
          value: ''
        },
        tableData: [
          {
            id: 1,
            t1: '100001',
            t2: '天府三街A口-左',
            t3: '天府三街A口',
            t4: '高新区天府大道天府三街',
            t5: '2015-10-02 ~ 2025-10-10',
            t6: '100'
          }, {
            id: 2,
            t1: '100002',
            t2: '天府三街A口-左',
            t3: '天府三街A口',
            t4: '高新区天府大道天府三街',
            t5: '2015-10-02 ~ 2025-10-10',
            t6: '150'
          }, {
            id: 2,
            t1: '100002',
            t2: '天府三街A口-左',
            t3: '天府三街A口',
            t4: '高新区天府大道天府三街',
            t5: '2015-10-02 ~ 2025-10-10',
            t6: '200'
          }, {
            id: 2,
            t1: '100002',
            t2: '天府三街A口-左',
            t3: '天府三街A口',
            t4: '高新区天府大道天府三街',
            t5: '2015-10-02 ~ 2025-10-10',
            t6: '250'
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
