<!--el普通表格-->
<!--
props:
1.colCanConfig 默认false 。是否能配置el-table-column 单元格的显示隐藏

1. tableData [] 表格数据 格式同element

1. defaultFormThead [] 表头数据
  item：
  {
    key: '', // 字段， 【必填】
    name: '', // 字段名称，【必填】
    disabled: Boolean, // 表头显示不可配置, 和colCanConfig同为true生效
    sortable:  Boolean, // 是否排序
    width: '200px' // 表格固定宽度，无则自动
    formatter: Function // 用来格式化内容
    className: String, // 列的 className, 如果只改变单元格不该标题需要和labelClassName配合使用
    labelClassName: String, // 当前列标题的自定义类名
    styleObject: {}, // 配置显示样式. 目前没有生效？
  }

event:
1.cell-click 单元格的点击事件

slot:
1. 默认 最后添加el-table-column ， 操作列

-->

<template>
  <div class="fixed-thead">
    <div class="filter-container" v-show="colCanConfig">
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
      size="mini"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @cell-click="cellClickHandler">
      <el-table-column
        v-for="(item,index) in formThead"
        :key="index"
        :label="item.name"
        :sortable="item.sortable"
        :prop="item.key"
        :width="item.width"
        :formatter="item.formatter"
        :class-name="item.className"
        :label-class-name="item.labelClassName"
        :style="item.styleObject"
      />
      <slot></slot>
    </el-table>
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
      }
    },
    data() {
      return {
        key: 1, // table key
        checkboxVal: [], // checkboxVal
        formThead: this.defaultFormThead // 默认表头 Default header
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
    methods: {
      cellClickHandler(row, column, cell, event) {
        // column.property 是key
        console.log(row, column, cell, event)
        this.$emit('cell-click', {
          row: row,
          key: column.property,
          name: column.label
        })
      }
    },
    created() {
      this.checkboxVal = this.defaultFormThead.map(item => {
        return item.key
      })
    }
  }
</script>
<style scoped lang="scss">
  .fixed-thead {
    margin-top: 10px;
  }
</style>

