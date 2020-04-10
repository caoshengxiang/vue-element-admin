<template>
  <bm-polygon
    :path="item.paths"
    stroke-style="dashed"
    :stroke-color="item.detail.type===2?'#00FF2A':'#FF5E5E'"
    :stroke-opacity="0.8"
    :stroke-weight="3"
    :fill-color="item.detail.type===2?'#27C541':'#FF5E5E'"
    :fill-opacity="0.3"
    :editing="false"
  />
</template>

<script>
  import { BmPolygon } from 'vue-baidu-map'

  export default {
    name: 'PolygonFence',
    components: {
      BmPolygon
    },
    // eslint-disable-next-line vue/require-prop-types
    props: ['item']
  }
</script>

<style scoped>

</style>
