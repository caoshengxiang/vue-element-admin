<template>
  <div class="com-container">
    <div class="com-con">
      <div class="bar">
        <div class="search">
          <div class="item">
            <el-input
              placeholder="请输入单车编号"
              v-model="form.num"
              clearable>
            </el-input>
          </div>

          <div class="item">
            <el-input
              placeholder="请输入电子牌照"
              v-model="form.num"
              clearable>
            </el-input>
          </div>

          <div class="item">
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
          </div>
        </div>
        <div class="btns">
          <el-button type="primary">注册</el-button>
          <el-button type="primary">批量注册</el-button>
          <el-button type="primary">下载注册模板</el-button>
          <el-button type="primary">批量注销</el-button>
          <el-button type="primary">下载注销模板</el-button>
        </div>
      </div>
      <div class="con">
        <fixed-thead></fixed-thead>
      </div>
    </div>
  </div>
</template>

<script>
  import FixedThead from './FixedThead'

  export default {
    name: 'ElectronicLicenseIndex',
    components: { FixedThead },
    data() {
      return {
        form: {
          num: ''
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .com-container {
    padding: 10px 10px;
    background: #f0f2f5;
    min-height: 90vh;

    .com-con {
      background: #ffffff;
      border: 5px;
      padding: 10px;

      .bar {
        .search {
          .item {
            display: inline-block;
            width: 200px;
          }
        }

        .btns {
          margin-top: 10px;
        }
      }
    }
  }
</style>
