<!--

一、event
1. borderDataChange 边界数据变化
-->

<template>
  <div>
    <baidu-map
      :style="{width:mapSet.width,height:mapSet.height}"
      class="map"
      ak="QESRXGTH3unGiZpCnns1bep6hOCH7erg"
      :zoom="mapSet.zoom"
      :center="{lng: mapSet.center.lng, lat: mapSet.center.lat}"
      :scroll-wheel-zoom="true"
      :map-click="false"
      @ready="handler"
      @mousemove="syncPolyline"
      @click="paintPolyline"
      @rightclick="newPolyline"
    >
      <!--折线-->
      <bm-control offset="20">
        <div class="ctrl">
          <button class="btn-1 btn" @click.stop="toggle('polyline')">{{ polyline.editing ? '结束绘制(先鼠标右键完成当前区域, 再点击结束绘制)' : '绘制边界'
          }}
          </button>
          <button v-if="!polyline.editing && polyline.paths.length" class="btn-2 btn" @click.stop="drowPolygon">生成边界
          </button>
          <div />
        </div>
      </bm-control>
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
    </baidu-map>

    <el-dialog
      title="操作"
      :visible.sync="dialogVisible"
      width="300px"
    >
      <p>
        <el-button v-if="editPolygItem.editing" style="width: 100%" type="primary" @click="edit">确定</el-button>
        <el-button v-else style="width: 100%" type="primary" @click="edit">编辑</el-button>
      </p>
      <!--      <p style="margin: 10px;" v-if="editPolygItem.editing">-->
      <!--        <el-button style="width: 100%" type="primary" @click="delPoint">删除最后一个点</el-button>-->
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
  import { BmPolyline, BmPolygon, BmControl } from 'vue-baidu-map'
  // 百度地图 end

  export default {
    name: 'Border',
    components: {
      BaiduMap,
      BmPolyline,
      BmPolygon,
      BmControl
    },
    props: {
      borderData: {
        default() {
          return []
        },
        type: Array
      },
      mapSet: {
        default() {
          return {
            width: '100%',
            height: '100vh',
            center: {
              lng: 104.0703534685,
              lat: 30.6711884335
            },
            zoom: 12 // 范围 1-19
          }
        },
        type: Object
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
          paths: []
        },
        /* 绘制折线*/
        /* 多边形*/
        polygonPaths: []
        /* 多边形*/
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
      newPolyline(e) {
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
      paintPolyline(e) {
        // eslint-disable-next-line no-console
        console.log(e.point)
        if (!this.polyline.editing) {
          return
        }
        const { paths } = this.polyline
        !paths.length && paths.push([])
        paths[paths.length - 1].push(e.point)
      },
      /* 折线*/
      /* 多边形*/
      getBorderData() {
        const data = this.polygonPaths.map(item => {
          const paths = item.paths
          return paths.map(pos => {
            return [pos.lng, pos.lat]
          })
        })
        return JSON.stringify({
          border: data,
          center: []
        })
      },
      updatePolygonPath(e, item) {
        item.paths = e.target.getPath()
        // eslint-disable-next-line no-console
        console.info(this.polygonPaths)
        this.$emit('borderDataChange', this.getBorderData())
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
      },
      del() {
        this.polygonPaths.splice(this.editPolygIndex, 1)
        this.dialogVisible = false
      },
      drowPolygon() {
        if (!this.polyline.paths.length) {
          return
        }
        this.polyline.paths.forEach(item => {
          if (item.length) {
            this.polygonPaths.push({
              editing: false,
              paths: item
            })
          }
        })
        // eslint-disable-next-line no-console
        console.log(this.polygonPaths)
        this.$emit('borderDataChange', this.getBorderData())
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
  }
</style>
