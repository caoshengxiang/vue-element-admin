<!--

一、event
1. borderDataChange 边界数据变化
-->

<template>
  <div>
    <baidu-map
      :style="{width:width,height:height}"
      class="map"
      ak="QESRXGTH3unGiZpCnns1bep6hOCH7erg"
      :zoom="zoom"
      :center="{lng: center.lng, lat: center.lat}"
      :scroll-wheel-zoom="true"
      :map-click="false"
      @ready="handler"
      @mousemove="syncPolyline"
      @click="paintPolyline"
      @rightclick="newPolyline"
    >
      <!--控件-->
      <!--缩放-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" />

      <bm-control offset="20">
        <div class="ctrl">
          <button class="btn-3 btn" @click.stop="initBorder">初始边界</button>
          <button v-if="polyline.editing" class="btn-1 btn" @click.stop="toggle('polyline')">结束绘制(先鼠标右键完成当前区域,
            再点击此按钮结束绘制)
          </button>
          <button v-if="!polyline.editing && !polyline.paths.length" class="btn-1 btn" @click.stop="toggle('polyline')">
            绘制边界
          </button>
          <button v-if="!polyline.editing && polyline.paths.length" class="btn-2 btn" @click.stop="drowPolygon">生成边界
          </button>
          <div />
        </div>
      </bm-control>
      <!--折线-->
      <bm-polyline
        v-for="(path, index) in polyline.paths"
        :key="'101'+index"
        stroke-color="#801915"
        :stroke-weight="1"
        :path="path"
      />
      <!--多边形，地图边界-->
      <bm-polygon
        v-for="(item, index) in polygonPaths"
        :key="'100'+index"
        :path="item.paths"
        stroke-color="blue"
        :stroke-opacity="0.8"
        :stroke-weight="1"
        fill-color="#ffffff"
        :fill-opacity="0.3"
        :editing="item.editing"
        @click="(e)=>editPolygonPath(e,item, index)"
        @lineupdate="(e)=>updatePolygonPath(e,item)"
      />
      <!--中心左边-->
      <span
        v-for="(item, index) in polygonPaths"
        :key="'1001'+index"
      >
        <bm-marker
          v-if="item.center"
          :position="{lng: item.center.lng, lat: item.center.lat}"
          :dragging="item.editing"
          @dragging="dragSetCenterLL"
          @click="(e)=>{centerPointClick(e, item)}"
        >
          <bm-label content="中心" :label-style="{color: 'red', fontSize : '12px'}" :offset="{width: -5, height: 30}" />
        </bm-marker>
      </span>
    </baidu-map>

    <el-dialog
      title="操作"
      :visible.sync="dialogVisible"
      width="300px"
    >
      <p>
        <el-button v-if="editPolygItem.editing" style="width: 100%" type="primary" @click="edit">完成绘制</el-button>
        <el-button v-else style="width: 100%" type="primary" @click="edit">编辑</el-button>
      </p>
      <!--      <p style="margin: 10px;">-->
      <!--        <el-button style="width: 100%" type="primary" @click="setBorderCenter">设置中心</el-button>-->
      <!--      </p>-->
      <p style="margin: 10px;">
        <el-button style="width: 100%" type="danger" @click="del">删除</el-button>
      </p>
      <p style="margin: 10px;">
        <el-button style="width: 100%" @click="dialogVisible = false">取消</el-button>
      </p>

    </el-dialog>
  </div>
</template>

<script>
  // 百度地图
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import { BmPolyline, BmPolygon, BmControl, BmMarker, BmLabel, BmNavigation } from 'vue-baidu-map'
  // 百度地图 end

  export default {
    name: 'Border',
    components: {
      BaiduMap,
      BmPolyline,
      BmPolygon,
      BmControl,
      BmMarker,
      BmLabel,
      BmNavigation
    },
    props: {
      borderData: {
        default: '',
        type: String
      },
      width: { // 地图宽
        default: '100%',
        type: String
      },
      height: { // 地图高度
        default: '90vh',
        type: String
      },
      center: { // 地图中心
        default() {
          return {
            lng: 104.070264,
            lat: 30.600342
          }
        },
        type: Object
      },
      zoom: { // 缩放
        default: 16, // 范围 1-19
        type: Number
      }
    },
    data() {
      return {
        dialogVisible: false,
        editPolygItem: '',
        editPolygIndex: 0,
        // mapStyle: {
        //   styleJson: styleJson
        // },
        /* 绘制折线*/
        polyline: {
          editing: false,
          paths: [] // 结构[[lng, lat], [lng, lat]]
        },
        /* 绘制折线*/
        /* 多边形*/
        polygonPaths: [], // 结构[{editing: false,paths: [{lng: 1, lat: 2}, center: {lng: '', lat: ''}]}]
        /* 多边形*/
        point: {}, // 当前点击的点经纬度
        moveDrawLine: false // 鼠标移动绘制折线
      }
    },
    watch: {
      borderData(val) {
        let data = []
        try {
          data = JSON.parse(val)
        } catch (e) {
          data = []
        }
        this.setBorderData(data)
      }
    },
    created() {
    },
    methods: {
      handler({ BMap, map }) {
        // eslint-disable-next-line no-console
        console.log('ok')
        // let mapStyle = { style: 'midnight' }
        // map.setMapStyle(mapStyle)
      },
      /* 折线*/
      // toggle(name) {
      //   this[name].editing = !this[name].editing
      // },
      // syncPolyline(e) {
      //   if (!this.polyline.editing) {
      //     return
      //   }
      //   const { paths } = this.polyline
      //   if (!paths.length) {
      //     return
      //   }
      //   const path = paths[paths.length - 1]
      //   if (!path.length) {
      //     return
      //   }
      //   if (path.length === 1) {
      //     path.push(e.point)
      //   }
      //   this.$set(path, path.length - 1, e.point)
      // },
      // newPolyline(e) { // 支持多条
      //   if (!this.polyline.editing) {
      //     return
      //   }
      //   const { paths } = this.polyline
      //   if (!paths.length) {
      //     paths.push([])
      //   }
      //   const path = paths[paths.length - 1]
      //   path.pop()
      //   if (path.length) {
      //     paths.push([])
      //   }
      // },
      // paintPolyline(e) { // 支持多条
      //   // eslint-disable-next-line no-console
      //   console.log(e.point)
      //   this.point = e.point
      //   if (!this.polyline.editing) {
      //     return
      //   }
      //   const { paths } = this.polyline
      //   !paths.length && paths.push([])
      //   paths[paths.length - 1].push(e.point)
      // },
      toggle(name) {
        if (this.polygonPaths && this.polygonPaths.length) {
          this.$message.warning('边界已存在，请先初始或删除后才能绘制')
          return
        }
        this[name].editing = !this[name].editing
      },
      syncPolyline(e) { // 支持一条
        if (!this.polyline.editing || !this.moveDrawLine) {
          return
        }
        const { paths } = this.polyline
        if (!paths.length) {
          return
        }
        const path = paths[paths.length - 1]
        if (!path.length) {
          return
        }
        if (path.length === 1) {
          path.push(e.point)
        }
        this.$set(path, path.length - 1, e.point)
      },
      newPolyline(e) { // 支持一条
        this.moveDrawLine = false
        if (!this.polyline.editing) {
          return
        }
        const { paths } = this.polyline
        if (!paths.length) {
          paths.push([])
        }
        const path = paths[paths.length - 1]
        path.pop()
        // if (path.length) {
        //   paths.push([])
        // }
      },
      paintPolyline(e) { // 支持一条
        // eslint-disable-next-line no-console
        console.log(e.point)
        this.moveDrawLine = true
        this.point = e.point
        if (!this.polyline.editing) {
          return
        }
        const { paths } = this.polyline
        !paths.length && paths.push([])
        paths[paths.length - 1].push(e.point)
      },
      /* 折线*/
      /* 多边形*/
      initBorder() {
        this.polygonPaths = []
        this.polyline = {
          editing: false,
          paths: []
        }
        this.$message.success('边界初始成功')
      },
      getBorderData() { // 返回数据结构
        const data = this.polygonPaths.map(item => {
          const paths = item.paths
          return {
            paths: paths.map(pos => {
              return [pos.lng, pos.lat]
            }),
            center: item.center
          }
        })
        return JSON.stringify(data)
      },
      setBorderData(arr) { // 数据结构 [{editing: false,paths: [{lng: 1, lat: 2}, center: []]}]
        // console.log(arr)
        if (arr && arr.length) {
          this.polygonPaths = arr.map(bor => {
            return {
              editing: false,
              paths: bor.paths.map(item => {
                return {
                  lng: item[0],
                  lat: item[1]
                }
              }),
              center: bor.center
            }
          })
        }
        // console.info(this.polygonPaths)
      },
      updatePolygonPath(e, item) {
        item.paths = e.target.getPath()
        // eslint-disable-next-line no-console
        // console.info(this.polygonPaths)
        // this.$emit('borderDataChange', this.getBorderData())
      },
      editPolygonPath(e, item, index) {
        // eslint-disable-next-line no-console
        // console.log(JSON.stringify(this.polygonPaths))
        this.dialogVisible = true
        this.editPolygItem = item
        this.editPolygIndex = index
      },
      edit() {
        this.editPolygItem.editing = !this.editPolygItem.editing
        this.dialogVisible = false
        this.setBorderCenter()
        this.$emit('borderDataChange', this.getBorderData())
      },
      del() {
        this.polygonPaths.splice(this.editPolygIndex, 1)
        this.dialogVisible = false
      },
      setBorderCenter() {
        if (this.editPolygItem.center && this.editPolygItem.center.lng && this.editPolygItem.center.lat) {
          //
        } else {
          this.editPolygItem.center = this.editPolygItem.paths[0]
        }
        this.dialogVisible = false
      },
      dragSetCenterLL(e) {
        console.log(e.point)
        this.editPolygItem.center = e.point
      },
      centerPointClick(e, item) {
        this.$message.info(`中心经纬度（${item.center.lng}, ${item.center.lat}）`)
      },
      drowPolygon() {
        if (!this.polyline.paths.length) {
          return
        }
        this.polyline.paths.forEach(item => {
          if (item.length && item.length > 2) { // 必须大于三个点
            this.polygonPaths.push({
              editing: false,
              paths: item,
              center: { lng: item[0].lng, lat: item[0].lat }
            })
          }
        })
        this.$emit('borderDataChange', this.getBorderData())
        // eslint-disable-next-line no-console
        // console.log(this.polygonPaths)
        this.polyline = {
          editing: false,
          paths: []
        }
      }
      /* 多边形*/
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
<style scoped lang="scss">
  .test {
    color: #357c9e;
  }

  .map {
    width: 100%;
    height: 300px;
  }

  .ctrl {
    position: relative;
    margin: 20px;

    .btn {
      margin-left: 10px;
    }

    .btn-1 {
      padding: 4px 6px;
      background: green;
      border: 0;
      font-size: 12px;
      color: #ffffff;
    }

    .btn-2 {
      padding: 4px 6px;
      background: green;
      border: 0;
      font-size: 12px;
      color: #ffffff;
    }

    .btn-3 {
      padding: 4px 6px;
      background: #ffa45c;
      border: 0;
      font-size: 12px;
      color: #ffffff;
    }
  }
</style>
