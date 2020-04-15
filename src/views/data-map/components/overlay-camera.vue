<template>
  <bm-overlay
    ref="customOverlay"
    pane="labelPane"
    class="sample"
    @draw="draw"
  >
    <div class="item">
      <img class="icon" src="../img/2.png" alt="" @click="showTips = !showTips">
      <div v-if="showTips" class="tips">
        <!--        <div class="line" />-->
        <div class="tip-con">
          <div
            style="text-align: center;padding: 10px;position: relative"
          >桂溪街道
            <img style="position: absolute;right: 10px;" src="../img/close.png" alt="" @click="showTips = false">
          </div>
          <video-player
            ref="videoPlayer"
            style="width: 500px"
            class="video-player vjs-custom-skin"
            :playsinline="true"
            :options="playerOptions"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
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
    // eslint-disable-next-line vue/require-prop-types
    props: ['data', 'position'],
    data() {
      return {
        px: 0,
        py: 0,
        showTips: false,
        playerOptions: {
          // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: true, // 如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [
            {
              type: 'application/x-mpegURL', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
              src: 'http://192.168.0.150:9589/test.m3u8' // url地址
            }
          ],
          hls: true,
          poster: '', // 你的封面地址
          width: document.documentElement.clientWidth, // 播放器宽度
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true // 全屏按钮
          }
        }
      }
    },
    watch: {
      position: {
        handler() {
          this.$refs.customOverlay.reload()
        },
        deep: true
      },
      showTips(val) {
        if (!val) {
          this.$refs.videoPlayer.player.pause()
        }
      }
    },
    methods: {
      handleClick() {
        global.alert('Well done.')
      },
      draw({ el, BMap, map }) {
        const { lng, lat } = this.position
        const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
        el.style.left = pixel.x + 'px'
        el.style.top = pixel.y + 'px'
        this.px = pixel.x
        this.py = pixel.y
      },
      onPlayerPlay(event) {
        console.info(event)
      },
      onPlayerPause(event) {
        console.info(event)
      }
    }
  }
</script>

<style scoped lang="less">
  .sample {
    position: absolute;
  }

  .item {
    position: relative;

    img.icon {
      position: absolute;
      width: 34px;
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
        background-image: url("../img/camera-box.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 580px;
        height: 340px;
        position: absolute;
        bottom: -30px;
        left: 10px;
        padding-left: 74px;
      }
    }
  }
</style>
