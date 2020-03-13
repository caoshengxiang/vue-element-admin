<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      大屏临时链接：<a href="http://49.235.131.71:9512/#/data/v" target="_blank">http://49.235.131.71:9512/#/data/v</a>
      <br>
      gis大屏临时链接：<a href="http://49.235.131.71:9512/#/data/map" target="_blank">http://49.235.131.71:9512/#/data/map</a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters([
        'name'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
