<!--el普通表格-->
<!--
props:
1.colCanConfig 默认false 。是否能配置（提供用户选项字段的显示隐藏）el-table-column 单元格的显示隐藏

1. tableData []  必填项，表格数据 格式同element

1. total 分页总数, undefined 或小于0 不显示分页

1. defaultFormThead [] 表头数据，必填项
  item：
  {
    key: '', // 字段， 【必填】
    name: '', // 字段名称，【必填】
    disabled: Boolean, // 表头显示不可配置, 和colCanConfig同为true生效
    sortable:  Boolean, // 是否排序
    width: '160px' // 默认160px 或 160，表格固定宽度，无则自动
    minWidth: '',
    formatter: Function // 用来格式化内容
    className: String, // 列的 className, 如果只改变单元格不该标题需要和labelClassName配合使用
    labelClassName: String, // 当前列标题的自定义类名
    slot: true, // 是否使用<template slot-scope="scope">{{scope.row}}</template> 方式显示数据
    styleObject: { color: 'red' } // 设置显示文本style 对象， 必选设置slot 为true
    showOverflowTooltip, 默认true, 显示超出提示
  }

event:
1.cell-click 单元格的点击事件
1. pageQueryChange 分页参数改变

slot:
1. 默认 最后添加el-table-column ， 一般用于操作列

-->

<template>
  <div class="fixed-thead">
    <div v-show="colCanConfig" class="filter-container">
      <!--      <span>显示字段：</span>-->
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox
          v-for="item in defaultFormThead"
          :key="item.key"
          :disabled="item.disabled"
          :label="item.key"
        >
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <el-table
      :key="key"
      :data="tableData"
      border
      stripe
      fit
      highlight-current-row
      tooltip-effect="dark"
      style="width: 100%"
      header-cell-class-name="header-row-bg"
      @cell-click="cellClickHandler"
    >
      <div
        v-for="(item,index) in formThead"
        :key="index"
      >
        <el-table-column
          v-if="item.slot"
          :label="item.name"
          :sortable="item.sortable"
          :prop="item.key"
          :width="item.width || 'auto'"
          :min-width="item.minWidth || '140px'"
          :formatter="item.formatter"
          :class-name="item.className"
          :label-class-name="item.labelClassName"
          :show-overflow-tooltip="item.showOverflowTooltip === undefined ? true : item.showOverflowTooltip"
        >
          <template slot-scope="scope">
            <span :style="item.styleObject">{{ scope.row[item.key] }} </span>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :label="item.name"
          :sortable="item.sortable"
          :prop="item.key"
          :width="item.width || 'auto'"
          :min-width="item.minWidth || '140px'"
          :formatter="item.formatter"
          :class-name="item.className"
          :label-class-name="item.labelClassName"
          :show-overflow-tooltip="item.showOverflowTooltip === undefined ? true : item.showOverflowTooltip"
        />
      </div>
      <!--slot 最后添加 一般用于操作列-->
      <slot />

    </el-table>
    <!--分页-->
    <div v-if="total !== undefined && total >= 0" class="pages-box">
      <el-pagination
        background
        :total="total"
        :current-page="pagesOptions.current"
        layout="total,sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 20, 30, 40]"
        :page-size="pagesOptions.size"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      colCanConfig: {
        default: false,
        type: Boolean
      },
      tableData: {
        type: Array,
        default() {
          return []
        }
      },
      defaultFormThead: {
        type: Array,
        default() {
          return []
        }
      },
      total: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        key: 1, // table key
        checkboxVal: [], // checkboxVal
        formThead: this.defaultFormThead, // 默认表头 Default header
        pagesOptions: { // 分页参数， 注意初始时调用页面的默认值保持一致
          size: 20,
          current: 1
        }
      }
    },
    watch: {
      checkboxVal(valArr = []) {
        this.formThead = this.defaultFormThead.filter((item, i) => {
          if (valArr.includes(item.key)) {
            return item
          }
        })
        this.key = this.key + 1// 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
      }
    },
    created() {
      this.checkboxVal = this.defaultFormThead.map(item => {
        return item.key
      })
    },
    methods: {
      cellClickHandler(row, column, cell, event) {
        // column.property 是key
        console.log(row, column, cell, event)
        this.$emit('cell-click', {
          row: row,
          key: column.property,
          name: column.label
        })
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`)
        this.pagesOptions.current = 1
        this.pagesOptions.size = val
        this.$emit('pageQueryChange', this.pagesOptions)
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.pagesOptions.current = val
        this.$emit('pageQueryChange', this.pagesOptions)
      }
    }
  }
</script>
<style>
  .header-row-bg {
    background-color: #dcdcdc !important;
    color: #333333;
  }
</style>
<style scoped lang="scss">
  .fixed-thead {
    margin-top: 10px;
  }

  .pages-box {
    text-align: right;
    padding: 10px 0;
    border-top: 6px solid #f0f2f5;
  }
</style>

