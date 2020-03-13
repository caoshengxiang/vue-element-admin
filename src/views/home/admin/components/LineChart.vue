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
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
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
        this.setOptions()
      },
      setOptions() {
        this.$api.statistics.home_line({
          // time: this.$moment(new Date()),
          // days: 7
        }).then(res => {
          const legendData = []
          const series = res.data.value.map((item, index) => {
            legendData.push(item.name)
            return {
              name: item.name,
              // itemStyle: {
              //   normal: {
              //     color: '#FF005A',
              //     lineStyle: {
              //       color: '#FF005A',
              //       width: 2
              //     }
              //   }
              // },
              smooth: true,
              type: 'line',
              data: item.data,
              animationDuration: 2800,
              animationEasing: 'cubicInOut'
            }
          })
          // console.log(series)
          const options = {
            xAxis: {
              data: res.data.outData,
              boundaryGap: false,
              axisTick: {
                show: false
              }
            },
            grid: {
              left: 10,
              right: 10,
              bottom: 20,
              top: 30,
              containLabel: true
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              },
              padding: [5, 10]
            },
            yAxis: {
              name: '使用率(%)',
              axisTick: {
                show: false
              }
            },
            legend: {
              data: legendData
            },
            series: series
          }

          this.chart.setOption(options)
        })
      }
    }
  }
</script>
