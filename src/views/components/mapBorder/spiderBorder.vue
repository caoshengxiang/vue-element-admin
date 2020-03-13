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

      <bm-control v-if="isEdit" offset="20">
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
        :path="item.box"
        stroke-color="blue"
        :stroke-opacity="0.8"
        :stroke-weight="1"
        fill-color="#ffffff"
        :fill-opacity="0.3"
        :editing="item.editing"
        @click="(e)=>editPolygonPath(e,item, index)"
        @lineupdate="(e)=>updatePolygonPath(e,item)"
      />
      <!--中心-->
      <bm-polygon
        v-for="(item, index) in polygonPaths"
        :key="'1001'+index"
        :path="item.center"
        stroke-color="red"
        :stroke-opacity="0.8"
        :stroke-weight="1"
        fill-color="#ffffff"
        :fill-opacity="0.3"
        :editing="item.editing"
        @click="(e)=>editPolygonPath(e,item, index)"
        @lineupdate="(e)=>updatePolygonPath2(e,item)"
      />

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
      <div v-if="editPolygItem.editing">
        <p style="margin: 10px;">
          <el-button
            v-if="editPolygItem.center && editPolygItem.center.length"
            style="width: 100%"
            type="primary"
            @click="setBorderCenter"
          >删除密集区
          </el-button>
          <el-button v-else style="width: 100%" type="primary" @click="setBorderCenter">添加密集区</el-button>
        </p>
      </div>
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
  import { BmPolyline, BmPolygon, BmControl, BmNavigation } from 'vue-baidu-map'
  // 百度地图 end

  export default {
    name: 'Border',
    components: {
      BaiduMap,
      BmPolyline,
      BmPolygon,
      BmControl,
      BmNavigation
    },
    props: {
      isEdit: {
        default() {
          return true
        },
        type: Boolean
      },
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
        polygonPaths: [], // 结构[{box: [[lng, lat]], center: [[lng, lat]]}]
        /* 多边形*/
        point: {} // 当前点击的点经纬度
      }
    },
    watch: {
      borderData(val) {
        let data = []
        console.info('val')
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
      toggle(name) {
        this[name].editing = !this[name].editing
      },
      syncPolyline(e) {
        if (!this.polyline.editing) {
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
      newPolyline(e) { // 支持多条
        if (!this.polyline.editing) {
          return
        }
        const { paths } = this.polyline
        if (!paths.length) {
          paths.push([])
        }
        const path = paths[paths.length - 1]
        path.pop()
        if (path.length) {
          paths.push([])
        }
      },
      // 支持多条
      paintPolyline(e) {
        // console.log(e.point)
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
          const box = item.box.map(b => {
            return [b.lng, b.lat]
          })
          const center = item.center.map(c => {
            return [c.lng, c.lat]
          })
          return {
            box: box,
            center: center
          }
        })
        return JSON.stringify(data)
      },
      setBorderData(arr) { // 数据结构
        console.info('arr')
        console.log(arr)
        if (arr && arr.length) {
          this.polygonPaths = arr.map(bor => {
            return {
              editing: false,
              box: bor.box.map(item => {
                return {
                  lng: item[0],
                  lat: item[1]
                }
              }),
              center: bor.center.map(item => {
                return {
                  lng: item[0],
                  lat: item[1]
                }
              })
            }
          })
        }
        // console.info(this.polygonPaths)
      },
      setBorderCenter() {
        if (this.editPolygItem.center && this.editPolygItem.center.length) {
          this.editPolygItem.center = []
        } else {
          this.editPolygItem.center = this.editPolygItem.box
        }
        this.dialogVisible = false
      },
      updatePolygonPath(e, item) {
        item.box = e.target.getPath()
      },
      updatePolygonPath2(e, item) {
        item.center = e.target.getPath()
      },
      editPolygonPath(e, item, index) {
        if (!this.isEdit) {
          return
        }
        this.dialogVisible = true
        this.editPolygItem = item
        this.editPolygIndex = index
      },
      edit() {
        // this.editPolygItem.editing = !this.editPolygItem.editing
        this.$set(this.editPolygItem, 'editing', !this.editPolygItem.editing)
        this.dialogVisible = false
        this.$emit('borderDataChange', this.getBorderData())
      },
      del() {
        this.polygonPaths.splice(this.editPolygIndex, 1)
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
              box: item,
              center: []
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
