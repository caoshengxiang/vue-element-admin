<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.$api.statistics.home_line31({
        // time: this.$moment(new Date()),
        // days: 7
      }).then(res => {
        const data = res.data.map(item => {
          const value = parseInt(item.value, 10)
          return {
            name: item.name,
            value: value
          }
        })
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
          },
          series: [
            {
              name: '单车投放',
              type: 'pie',
              roseType: 'radius',
              radius: [15, 95],
              center: ['50%', '38%'],
              data: data,
              animationEasing: 'cubicInOut',
              animationDuration: 2600,
              itemStyle: {
                normal: {
                  // 这里是重点
                  color: function(params) {
                    // 注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    const colorList = ['#0082FF', '#67f6f4', '#ec3716', '#f4c20b']
                    return colorList[params.dataIndex]
                  }
                }
              }
            }
          ]
        })
      })
    }
  }
}
</script>
