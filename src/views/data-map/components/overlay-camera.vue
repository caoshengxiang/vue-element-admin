<template>
  <bm-overlay
    ref="customOverlay"
    pane="labelPane"
    class="sample"
    @draw="draw"
  >
    <div class="item" @click="showTips = !showTips">
      <img class="icon" src="../img/2.png" alt="">
      <div v-if="showTips" class="tips">
        <div class="line" />
        <div class="tip-con">
          <div style="text-align: center;padding: 10px;">桂溪街道</div>
          <video
            controls
            style="width: 100%"
            src="http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4"
          />
        </div>
      </div>
    </div>
  </bm-overlay>
</template>

<script>
  import { BmOverlay } from 'vue-baidu-map'

  export default {
    components: {
      BmOverlay
    },
    props: ['data', 'position'],
    data() {
      return {
        px: 0,
        py: 0,
        showTips: false
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
        global.alert('Well done.')
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
  .sample {
    position: absolute;
  }

  .item {
    width: 37px;
    height: 53px;
    background-image: url("../img/1.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;

    img.icon {
      position: absolute;
      top: 10px;
      left: 8px;
      width: 18px;
    }

    .tips {
      /*border: 1px dashed #f5f5f5;*/
      position: absolute;
      left: 30px;
      color: #ffffff;

      .line {
        border: 1px solid red;
        position: absolute;
        top: 0;
        width: 22px;
        height: 15px;
      }

      .tip-con {
        background-image: url("../image/box.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding: 5px 10px;
        width: 500px;
        height: 360px;
        position: absolute;
        bottom: -30px;
        left: 20px;
      }
    }
  }
</style>
