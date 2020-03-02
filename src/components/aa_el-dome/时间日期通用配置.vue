<template>
  <div>
    <!--日期范围-->
    <el-date-picker
      v-model="valueTime"
      value-format="yyyy-MM-DD HH:mm:ss"
      :default-time="['00:00:00', '23:59:59']"
      :unlink-panels="true"
      style="width: 260px;"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
  </div>
</template>

<script>
  export default {
    name: 'ElDomeDate',
    data() {
      return {
        valueTime: ''
      }
    }
  }
</script>

<style scoped>

</style>
