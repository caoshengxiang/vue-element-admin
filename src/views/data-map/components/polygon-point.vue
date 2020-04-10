<template>
  <div>
    <bm-polygon
      :path="item.paths"
      stroke-style="solid"
      stroke-color="#91DF74"
      :stroke-opacity="0.8"
      :stroke-weight="1"
      fill-color="#91DF74"
      :fill-opacity="0.3"
      :editing="false"
    />
  </div>
</template>

<script>
  import { BmPolygon } from 'vue-baidu-map'

  export default {
    name: 'PolygonPoint',
    components: {
      BmPolygon
    },
    // eslint-disable-next-line vue/require-prop-types
    props: ['item']
  }
</script>

<style scoped>

</style>
