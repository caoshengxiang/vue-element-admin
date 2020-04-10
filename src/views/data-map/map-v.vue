<template>
  <div class="page">
    <baidu-map
      :style="{width:map.width,height:map.height}"
      :map-style="mapStyle"
      class="map"
      :ak="ak"
      :zoom="map.zoom"
      :center="{lng: map.center.lng, lat: map.center.lat}"
      :scroll-wheel-zoom="true"
      :map-click="false"
      @ready="handler"
    >
      <!--摄像头-->
      <div v-if="isCheck(1)">
        <overlay-camera
          v-for="(item, index) in camera_data"
          :key="index"
          :position="{lng: item.lng, lat: item.lat}"
          :data="{}"
          @mouseover.native="active = true"
          @mouseleave.native="active = false"
        />
      </div>
      <!--围栏-->
      <div v-if="isCheck(2)">
        <polygon-fence
          v-for="(item, index) in border2_Data"
          :key="'10000'+index"
          :item="item"
        />
      </div>
      <!--点位-->
      <div v-if="isCheck(3)">
        <!--多边形，地图边界-->
        <polygon-point
          v-for="(item, index) in border1_Data"
          :key="'100'+index"
          :item="item"
        />
      </div>
      <!--城管人员-->
      <div v-if="isCheck(4)">
        <overlay-user1
          v-for="(item, index) in user1_data"
          :key="index"
          :position="{lng: item.lng, lat: item.lat}"
          :data="{}"
          @mouseover.native="active = true"
          @mouseleave.native="active = false"
        />
      </div>
      <!--运营人员-->
      <div v-if="isCheck(5)">
        <overlay-user2
          v-for="(item, index) in user2_data"
          :key="index"
          :position="{lng: item.lng, lat: item.lat}"
          :data="{}"
          @mouseover.native="active = true"
          @mouseleave.native="active = false"
        />
      </div>
      <!--异常车-->
      <div v-if="isCheck(6)">
        <overlay-bike
          v-for="(item, index) in bike_data"
          :key="index"
          :position="{lng: item.lng, lat: item.lat}"
          :data="item.data"
        />
      </div>

      <!--热力图-->
      <div v-if="isCheck(8)">
        <bml-heatmap :data="hot_data1" :max="10" :radius="20" />
      </div>
      <div v-if="isCheck(9)">
        <bml-heatmap :data="hot_data2" :max="10" :radius="20" />
      </div>

    </baidu-map>
    <!--bar 栏目-->
    <div class="bar">
      <div class="title">图层筛选</div>
      <div class="con">
        <div class="check-item" :class="{active: isCheck(1)}" @click="checkHandle(1)">
          <img class="icon" src="./image/bar/bar-1.png" alt="">
          <span class="text">摄像头</span>
          <span class="value">{{ total1 }}</span>
        </div>

        <div class="check-item" :class="{active: isCheck(2)}" @click="checkHandle(2)">
          <img class="icon" src="./image/bar/bar-2.png" alt="">
          <span class="text">电子围栏</span>
          <span class="value">{{ total2 }}</span>
        </div>

        <div class="check-item" :class="{active: isCheck(3)}" @click="checkHandle(3)">
          <img class="icon" src="./image/bar/bar-3.png" alt="">
          <span class="text">停车点</span>
          <span class="value">{{ total3 }}</span>
        </div>

        <div class="check-item" :class="{active: isCheck(4)}" @click="checkHandle(4)">
          <img class="icon" src="./image/bar/bar-4.png" alt="">
          <span class="text">城管人员</span>
          <span class="value">95</span>
        </div>

        <div class="check-item" :class="{active: isCheck(5)}" @click="checkHandle(5)">
          <img class="icon" src="./image/bar/bar-5.png" alt="">
          <span class="text">运营人员</span>
          <span class="value">95</span>
        </div>

        <div class="check-item" :class="{active: isCheck(6)}" @click="checkHandle(6)">
          <img class="icon" src="./image/bar/bar-6.png" alt="">
          <span class="text">异常车</span>
          <span class="value">95</span>
        </div>

        <div class="check-item" :class="{active: isCheck(7)}" @click="checkHandle(7)">
          <img class="icon" src="./image/bar/bar-7.png" alt="">
          <span class="text">违章投放</span>
          <span class="value">9500</span>
        </div>

        <div class="check-item" :class="{active: isCheck(8)}" @click="checkHandle(8)">
          <img class="icon" src="./image/bar/bar-8.png" alt="">
          <span class="text">违章热力图</span>
          <span class="value" />
        </div>

        <div class="check-item" :class="{active: isCheck(9)}" @click="checkHandle(9)">
          <img class="icon" src="./image/bar/bar-9.png" alt="">
          <span class="text">停放热力图</span>
          <span class="value" />
        </div>

      </div>
    </div>

    <!--底部-->
    <div class="bottom">
      <div class="b-item">
        <img class="l-icon" src="./image/bottom/b1.png" alt="">
        <div class="t-box">
          <div class="t-title">辖区任务</div>
          <div class="t1"><span class="t2">125</span>个</div>
        </div>
        <div class="up-box">
          <img class="up-icon" src="./image/bottom/up.png" alt="">
        </div>
      </div>

      <div class="b-item">
        <img class="l-icon" src="./image/bottom/b2.png" alt="">
        <div class="t-box">
          <div class="t-title">辖区任务</div>
          <div class="t1"><span class="t2">125</span>个</div>
        </div>
        <div class="up-box">
          <img class="up-icon" src="./image/bottom/up.png" alt="">
        </div>
      </div>

      <div class="b-item">
        <img class="l-icon" src="./image/bottom/b3.png" alt="">
        <div class="t-box">
          <div class="t-title">预警点位</div>
          <div class="t1"><span class="t2">125</span>个</div>
        </div>
        <div class="up-box">
          <img class="up-icon" src="./image/bottom/down.png" alt="">
        </div>
      </div>

      <div class="b-item">
        <img class="l-icon" src="./image/bottom/b4.png" alt="">
        <div class="t-box">
          <div class="t3">任务下发</div>
        </div>
        <div class="up-box" />
      </div>
    </div>
  </div>
</template>

<script>
  // 百度地图
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import { BmlHeatmap } from 'vue-baidu-map'
  import { ak } from './config'
  import styleJson from './styleJson' // 地图样式
  // 百度地图 end
  import overlayCamera from './components/overlay-camera'
  import overlayUser1 from './components/overlay-user1'
  import overlayUser2 from './components/overlay-user2'
  import overlayBike from './components/overlay-bike'
  import polygonPoint from './components/polygon-point'
  import PolygonFence from './components/polygon-fence'

  export default {
    name: 'MapV',
    components: {
      PolygonFence,
      BaiduMap,
      BmlHeatmap,
      overlayCamera,
      overlayUser1,
      overlayUser2,
      overlayBike,
      polygonPoint
    },
    data() {
      return {
        mapStyle: {
          styleJson: styleJson
        },
        ak: ak,
        map: {
          width: '100vw',
          height: '100vh',
          center: {
            lng: 104.074622,
            lat: 30.560886
          },
          zoom: 14 // 范围 1-19
        },
        checked: [1, 3, 4, 5], // 1-摄像头,2-电子围栏,3-停车点,4-城管人员,5-运营人员,6-异常车,7-违章投放,8-违章热力图,9-停放热力图, 999-全部
        camera_data: [],
        user1_data: [ // 城管人员
          // { lng: 104.06401, lat: 30.67002 },
          // { lng: 104.06801, lat: 30.66002 },
          // { lng: 104.07151, lat: 30.67502 }
        ],
        user2_data: [
          // { lng: 104.06952, lat: 30.66801 },
          // { lng: 104.058556, lat: 30.67721 },
          // { lng: 104.070542, lat: 30.66601 }
        ],
        bike_data: [
          // { lng: 104.077542, lat: 30.67601, data: { type: 'h', title: '哈罗单车', detail: '故障车' }},
          // { lng: 104.077942, lat: 30.67101, data: { type: 'm', title: '哈罗单车', detail: '僵尸车' }},
          // { lng: 104.078042, lat: 30.67201, data: { type: 'o', title: '哈罗单车', detail: '僵尸车' }},
          // { lng: 104.077942, lat: 30.67901, data: { type: 'q', title: '哈罗单车', detail: '故障车' }}
        ],
        border1_Data: [
          // {
          //   name: 'xx点位',
          //   paths: [{ 'lng': 104.064748, 'lat': 30.607802 }, {
          //     'lng': 104.064461,
          //     'lat': 30.605315
          //   }, { 'lng': 104.067479, 'lat': 30.605937 }, { 'lng': 104.066904, 'lat': 30.608672 }, {
          //     'lng': 104.064748,
          //     'lat': 30.608424
          //   }]
          // },
          // {
          //   name: 'xx22点位',
          //   paths: [{ 'lng': 104.07268, 'lat': 30.662203 }, { 'lng': 104.072752, 'lat': 30.65891 }, {
          //     'lng': 104.075411,
          //     'lat': 30.658879
          //   }, { 'lng': 104.077226, 'lat': 30.661629 }, { 'lng': 104.077261, 'lat': 30.662374 }, {
          //     'lng': 104.07277,
          //     'lat': 30.66225
          //   }]
          // }
        ], // 点位
        border2_Data: [], // 围栏
        hot_data1: [
          { 'lng': 104.072896, 'lat': 30.659407, count: 3 },
          { 'lng': 104.072896, 'lat': 30.659407, count: 8 },
          { 'lng': 104.072896, 'lat': 30.659407, count: 3 },
          { 'lng': 104.068896, 'lat': 30.659407, count: 6 },
          { 'lng': 104.068896, 'lat': 30.659407, count: 10 },
          { 'lng': 104.072896, 'lat': 30.659407, count: 5 },
          { 'lng': 104.072896, 'lat': 30.659407, count: 8 },
          { 'lng': 104.072896, 'lat': 30.659307, count: 5 },
          { 'lng': 104.069896, 'lat': 30.659457, count: 10 },
          { 'lng': 104.071796, 'lat': 30.659207, count: 3 },
          { 'lng': 104.070796, 'lat': 30.659287, count: 10 },
          { 'lng': 104.071796, 'lat': 30.659007, count: 3 },
          { 'lng': 104.071196, 'lat': 30.65957, count: 7 },
          { 'lng': 104.073796, 'lat': 30.659457, count: 3 },
          { 'lng': 104.070796, 'lat': 30.659307, count: 8 },
          { 'lng': 104.071796, 'lat': 30.659507, count: 1 },
          { 'lng': 104.071296, 'lat': 30.659287, count: 8 },
          { 'lng': 104.071396, 'lat': 30.659207, count: 3 },
          { 'lng': 104.070796, 'lat': 30.659107, count: 10 }
        ],
        hot_data2: [
          { 'lng': 104.070896, 'lat': 30.659407, count: 3 },
          { 'lng': 104.072896, 'lat': 30.659457, count: 9 },
          { 'lng': 104.073796, 'lat': 30.659207, count: 6 },
          { 'lng': 104.076796, 'lat': 30.659287, count: 10 },
          { 'lng': 104.070796, 'lat': 30.659007, count: 5 },
          { 'lng': 104.075796, 'lat': 30.65957, count: 7 }
        ],
        total1: 0,
        total2: 0,
        total3: 0,
        total4: 0,
        total5: 0,
        total6: 0,
        total7: 0,
        total8: 0
      }
    },
    created() {
      this.getAllList()
    },
    methods: {
      getCameraList() {
        this.$api.camera.list({
          size: 100000000,
          current: 1
        }).then(res => {
          const { data } = res
          this.total1 = data.total
          this.camera_data = []
          data.records.forEach(item => {
            if (item.matrix) {
              try {
                const matrixs = JSON.parse(item.matrix)
                // console.log(matrixs[0])
                this.camera_data.push(Object.assign({},
                  matrixs[0].center,
                  { detail: item }))
              } catch (e) {
                console.error('点位格式有误-》matrix')
              }
            }
          })
        }).catch()
      },
      getFenceList() {
        this.$api.fence.list({
          size: 100000000,
          current: 1
        }).then(res => {
          const { data } = res
          this.total2 = data.total
          this.border2_Data = []
          data.records.forEach(item => {
            if (item.matrix) {
              try {
                const matrixs = JSON.parse(item.matrix)
                // console.log(matrixs[0])
                const paths = matrixs[0].paths.map(item2 => {
                  return {
                    lng: item2[0],
                    lat: item2[1]
                  }
                })
                this.border2_Data.push({
                  detail: item,
                  paths: paths
                })
              } catch (e) {
                console.error('围栏格式有误-》matrix')
              }
            }
          })
        }).catch()
      },
      getPointList() {
        this.$api.points.list({
          size: 100000000,
          current: 1
        }).then(res => {
          const { data } = res
          this.total3 = data.total
          this.border1_Data = []
          data.records.forEach(item => {
            if (item.matrix) {
              try {
                const matrixs = JSON.parse(item.matrix)
                // console.log(matrixs[0])
                const paths = matrixs[0].paths.map(item2 => {
                  return {
                    lng: item2[0],
                    lat: item2[1]
                  }
                })
                this.border1_Data.push({
                  detail: item,
                  paths: paths
                })
              } catch (e) {
                console.error('围栏格式有误-》matrix')
              }
            }
          })
        }).catch()
      },
      getAllList() {
        this.getCameraList()
        this.getFenceList()
        this.getPointList()
      },
      initList() {
        this.camera_data = []
        this.border2_Data = []
        this.border1_Data = []
        this.user1_data = []
        this.user2_data = []
        this.bike_data = []
        this.hot_data1 = []
        this.hot_data2 = []
      },
      filterList(id) {
        if (id === 1) {
          this.getCameraList()
        } else if (id === 2) {
          this.getFenceList()
        } else if (id === 3) {
          this.getPointList()
        }
      },
      handler({ BMap, map }) {
        //   map.setMapStyle(this.mapStyle)
      },
      checkHandle(id) { // / 999 代表全部
        const index = this.checked.indexOf(id)
        if (index > -1) {
          this.checked.splice(index, 1)
          const index999 = this.checked.indexOf(999)
          if (index999 > -1) {
            this.checked.splice(index999, 1)
          }
        } else {
          if (id === 999) {
            this.checked = [999, 1, 2, 3, 4, 5]
            this.getAllList()
          } else {
            this.checked.push(id)
            this.filterList(id)
          }
        }
      },
      isCheck(id) {
        return this.checked.includes(id)
      }
    }
  }
</script>
<style>
  /*去除百度地图logo和文字*/
  .BMap_cpyCtrl {
    display: none;
  }

  .anchorBL {
    display: none;
  }

  /*去除百度地图logo和文字*/

</style>
<style scoped lang="less">
  .page {
    width: 100vw;
    height: 100vh;
    position: relative;

    .bar {
      position: absolute;
      right: 16/9.6vw;
      top: 30/9.6vw;
      color: #FFFFFF;
      width: 146/9.6vw;

      .title {
        font-size: 10/9.6vw;
        height: 25/9.6vw;
        background-image: url("image/bar/bar-bg-1.png");
        background-size: 100% 100%;
        line-height: 25/9.6vw;
        padding-left: 23/9.6vw;

      }

      .con {
        width: 100%;
        background-image: url("image/bar/bar-bg-2.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        box-sizing: border-box;
        padding: 10/9.6vw 6/9.6vw;
        margin-top: -10/9.6vw;
        font-size: 9/9.6vw;

        .check-item {
          background-image: url("image/bar/item-bg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          padding: 8/9.6vw 13.5/9.6vw;
          height: 40/9.6vw;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;

          &.active {
            background-image: url("image/bar/item-bg-ac.png");
          }

          .icon {
            width: 15/9.6vw;
          }

          .text {
            width: 50/9.6vw;
            display: inline-block;
          }

          .value {
            font-size: 15/9.6vw;
            color: #03F7FC;
            width: 30/9.6vw;
            display: inline-block;
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 40px;
      width: 100vw;
      display: flex;
      justify-content: center;

      .b-item {
        background-image: url("./image/b-box.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 150/9.6vw;
        height: 63/9.6vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 15/9.6vw;
        padding-left: 10/9.6vw;
        padding-right: 10/9.6vw;
        box-sizing: border-box;

        .l-icon {
          width: 30/9.6vw;
        }

        .t-box {
          .t-title {
            color: #03F7FC;
            font-size: 10/9.6vw;
          }

          .t1 {
            color: #ffffff;
            font-size: 9/9.6vw;
          }

          .t2 {
            font-size: 21/9.6vw;
          }

          .t3 {
            color: #03F7FC;
            font-size: 15/9.6vw;
          }
        }

        .up-box {
          .up-icon {
          }
        }
      }
    }
  }
</style>
