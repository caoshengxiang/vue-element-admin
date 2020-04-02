<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'

  // const animationDuration = 3000

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

        this.$api.statistics.home_line32({
          // time: this.$moment(new Date()),
          // days: 7
        }).then(res => {
          this.chart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: res.data.map(item => { return item.name }),
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '违章数',
                type: 'bar',
                barWidth: '60%',
                data: res.data.map(item => { return item.value }),
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
