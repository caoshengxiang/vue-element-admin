<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <div class="com-bar">
        <div class="com-bar-show">
          <div class="com-bar-left">
            <!--            <span class="com-bar-item"><el-button type="primary" @click="add">注册</el-button></span>-->
          </div>
          <div class="com-bar-right">
            <!--            <span class="com-search-item com-bar-item">-->
            <!--              <el-input-->
            <!--                v-model="searchForm.keyword"-->
            <!--                placeholder="请输入关键词"-->
            <!--                clearable-->
            <!--              />-->
            <!--            </span>-->
            <!--            <span class="com-bar-item">-->
            <!--              <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>-->
            <!--              &lt;!&ndash;              <el-button type="primary" plain @click="moreShow = !moreShow">更多&ndash;&gt;-->
            <!--              &lt;!&ndash;                <i v-if="!moreShow" class="el-icon-arrow-right el-icon&#45;&#45;right" />&ndash;&gt;-->
            <!--              &lt;!&ndash;                <i v-else class="el-icon-arrow-up el-icon&#45;&#45;right" />&ndash;&gt;-->
            <!--              &lt;!&ndash;              </el-button>&ndash;&gt;-->
            <!--            </span>-->
          </div>
        </div>
        <div v-show="moreShow" class="com-more-search" style="border: 0;">
          <el-form ref="searchForm" :model="searchForm" label-width="90px" class="demo-ruleForm">
            <el-row>
              <el-col :xs="24" :sm="6">
                <el-form-item label="违章类型" prop="type">
                  <el-select v-model="searchForm.type" placeholder="请选择" style="width: 100%;" clearable>
                    <el-option
                      v-for="item in taskType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6">
                <el-form-item label="所属街道" prop="regionId">
                  <el-select v-model="searchForm.regionId" placeholder="请选择" style="width: 100%;" clearable>
                    <el-option
                      v-for="item in streetOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="时间" prop="timeStart">
                  <el-date-picker
                    v-model="valueTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                    :unlink-panels="true"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="padding-left: 90px;">
              <el-col :xs="24" :sm="6">
                <el-button
                  icon="el-icon-search"
                  type="primary"
                  style="width: 100%;margin-bottom: 14px"
                  @click="search('searchForm')"
                >查 询
                </el-button>
              </el-col>
              <!--              <el-col :xs="24" :sm="6">-->
              <!--                <el-button style="width: 100%;margin-bottom: 14px;" @click="resetForm('searchForm')">重 置</el-button>-->
              <!--              </el-col>-->
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="com-con-bom">
        <div id="Chart" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Index',
    data() {
      return {
        loading: false,
        moreShow: true,
        searchForm: {
          type: '',
          regionId: '',
          timeStart: this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 30),
          timeEnd: this.$moment(new Date())
        },
        pointOptions: [],
        valueTime: [this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 30), this.$moment(new Date())], // 最近七天
        chart: '',
        options: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            formatter: function(params) {
              var htmlStr = ''
              for (var i = 0; i < params.length; i++) {
                var param = params[i]
                var xName = param.name// x轴的名称
                var seriesName = param.seriesName// 图例名称
                var value = param.value// y轴值
                var color = param.color// 图例颜色

                if (i === 0) {
                  htmlStr += xName + '<br/>'// x轴的名称
                }
                htmlStr += '<div>'
                // 为了保证和原来的效果一样，这里自己实现了一个点的效果
                htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>'

                // 圆点后面显示的文本
                htmlStr += seriesName + '：' + value + ''

                htmlStr += '</div>'
              }
              return htmlStr
            }
          },
          legend: {
            textStyle: {
              // fontSize: 14, // 字体大小
              // color: '#ffffff' // 字体颜色
            },
            // data: ['哈罗', '美团', '青桔', '摩拜']
            data: []
          },
          grid: {
            top: '30px',
            left: '0%',
            right: '5%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              // saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            data: []
          },
          yAxis: {
            name: '数量',
            type: 'value',
            // 网格样式
            splitLine: {
              show: true
            }
          },
          series: [
            // {
            //   name: '哈罗',
            //   type: 'line',
            //   stack: '总量1',
            //   data: [12, 13, 10, 13, 9, 23, 21],
            //   symbol: 'none', // 去掉折线图中的节点
            //   smooth: true // true 为平滑曲线，false为直线
            // },
            // {
            //   name: '美团',
            //   type: 'line',
            //   stack: '总量2',
            //   data: [22, 18, 19, 23, 29, 33, 31],
            //   symbol: 'none', // 去掉折线图中的节点
            //   smooth: true // true 为平滑曲线，false为直线
            // },
            // {
            //   name: '青桔',
            //   type: 'line',
            //   stack: '总量3',
            //   data: [15, 23, 20, 15, 19, 33, 41],
            //   symbol: 'none', // 去掉折线图中的节点
            //   smooth: true // true 为平滑曲线，false为直线
            // },
            // {
            //   name: '摩拜',
            //   type: 'line',
            //   stack: '总量4',
            //   data: [32, 33, 30, 33, 39, 33, 32],
            //   symbol: 'none', // 去掉折线图中的节点
            //   smooth: true // true 为平滑曲线，false为直线
            // }
          ]
        },
        streetOptions: []
      }
    },
    computed: {
      ...mapState('const', [
        'taskType'
      ])
    },
    watch: {
      valueTime(val) {
        if (val) {
          this.searchForm.timeStart = val[0]
          this.searchForm.timeEnd = val[1]
        } else {
          this.searchForm.timeStart = null
          this.searchForm.timeEnd = null
        }
      }
    },
    created() {
      if (this.$route.query.regionId) {
        this.searchForm.regionId = parseInt(this.$route.query.regionId, 10)
      }
    },
    mounted() {
      this.chart = this.$echarts.init(document.getElementById('Chart'))
      this.getStreet()
      this.getList()
      // this.chart.setOption(this.options)
    },
    methods: {
      /**/
      search() {
        this.getList()
      },
      resetForm(formName) {
        // this.searchForm.keyword = ''
        this.$refs[formName].resetFields()
        this.getList()
      },
      getList() {
        this.$api.statistics.illegChange(this.searchForm).then(da => {
          if (da.data.outData) {
            const names = []
            this.options.xAxis.data = da.data.outData
            this.options.series = da.data.value.map((item, index) => {
              names.push(item.name)
              return {
                name: item.name,
                type: 'line',
                stack: '总量' + index,
                data: item.data,
                symbol: 'none', // 去掉折线图中的节点
                smooth: true // true 为平滑曲线，false为直线
              }
            })
            this.options.legend.data = names
          } else {
            this.options.xAxis.data = []
            this.options.series = []
            this.$message.info('暂无数据')
          }
          this.chart.clear()
          this.chart.setOption(this.options)
        })
      },
      /**/
      getStreet() {
        this.$api.common.street2({ deep: 3 }).then(res => {
          this.streetOptions = res.data
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #Chart {
    width: 100%;
    height: 600px;
  }
</style>
