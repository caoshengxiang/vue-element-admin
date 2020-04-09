<template>
  <bml-marker-clusterer :average-center="true">
    <bm-overlay
      ref="customOverlay"
      pane="labelPane"
      class="sample"
      @draw="draw"
    >
      <div class="item" @click="showTips = !showTips">
        <img v-if="data.type === 'h'" class="icon" src="../image/bike/h.png" alt="">
        <img v-if="data.type === 'o'" class="icon" src="../image/bike/o.png" alt="">
        <img v-if="data.type === 'm'" class="icon" src="../image/bike/m.png" alt="">
        <img v-if="data.type === 'q'" class="icon" src="../image/bike/q.png" alt="">
        <div v-if="showTips" class="user-tips">
          <div class="line" />
          <div class="tip-con">
            <!--          <div>{{data.detail}}</div>-->
            <div>{{ data.detail }}</div>
          </div>
        </div>
      </div>
    </bm-overlay>
  </bml-marker-clusterer>
</template>

<script>
  import { BmOverlay, BmlMarkerClusterer } from 'vue-baidu-map'

  export default {
    components: {
      BmOverlay,
      BmlMarkerClusterer
    },
    props: ['data', 'position'],
    data() {
      return {
        px: 0,
        py: 0,
        showTips: true
      }
    },
    watch: {
      position: {
        handler() {
          this.$refs.customOverlay.reload()
        },
        deep: true
      }
    },
    methods: {
      handleClick() {
      },
      draw({ el, BMap, map }) {
        const { lng, lat } = this.position
        const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
        el.style.left = pixel.x - 20 + 'px'
        el.style.top = pixel.y - 30 + 'px'
        this.px = pixel.x
        this.py = pixel.y
      }
    }
  }
</script>

<style scoped lang="less">
  @import "tips";

  .sample {
    position: absolute;
  }

  .item {
    width: 37px;
    height: 53px;
    position: relative;

    img.icon {
      position: absolute;
      width: 34px;
    }
  }
</style>
