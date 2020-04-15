<template>
  <bm-overlay
    ref="customOverlay"
    pane="labelPane"
    class="sample"
    @draw="draw"
  >
    <router-link to="/point/index">
      <div class="item">
        <div v-if="showTips" class="tips">
          <!--        <div class="line" />-->
          <div class="tip-con">
            <div class="tip-c-1">80%</div>
            <div class="tip-c-2">
              <div class="div1">停放:{{ data.parkingNum }}辆</div>
              <div class="div1">容量:{{ data.maxCapacity }}辆</div>
              <div class="div1">预警:{{ data.alertNum }}个</div>
              <div class="div1">任务:{{ data.taskNum }}个</div>
              <div class="div2">
                <div class="div2-t1">动态:</div>
                <div class="div2-t2">
                  <el-carousel height="16px" indicator-position="none" direction="vertical" :autoplay="true">
                    <el-carousel-item v-for="item in data.alertContents" :key="item">
                      <span>{{ item }}</span>
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </router-link>
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
        global.alert('Well done.')
      },
      draw({ el, BMap, map }) {
        const { lng, lat } = this.position
        const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
        el.style.left = pixel.x + 'px'
        el.style.top = pixel.y + 'px'
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

      /*.line {*/
      /*  border: 1px solid red;*/
      /*  position: absolute;*/
      /*  top: 0;*/
      /*  width: 22px;*/
      /*  height: 15px;*/
      /*}*/

      .tip-con {
        background-image: url("../image/point-bg-green.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 280px;
        height: 100px;
        position: absolute;
        bottom: -30px;
        left: -20px;
        padding-left: 30px;
        font-size: 14px;
        display: flex;
        align-items: center;

        .tip-c-1 {
          width: 70px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tip-c-2 {
          width: 180px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          .div1 {
            display: inline-block;
            width: 50%;
          }

          .div2 {
            width: 100%;
            display: flex;
            align-items: center;
            .div2-t1 {
              display: inline-block;
              width: 34px;
            }
            .div2-t2 {
              display: inline-block;
              width: 120px;
            }
          }
        }
      }
    }
  }
</style>
