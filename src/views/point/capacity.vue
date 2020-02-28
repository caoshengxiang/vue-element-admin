<template>
  <div v-loading="loading" class="com-container point">
    <div class="com-con-box">
      <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-row>
          <el-col
            v-for="(domain, index) in dynamicValidateForm.domains"
            :key="domain.key"
            :span="24"
            :label="'域名' + index"
          >
            <el-form-item
              style="display: inline-block"
              :prop="'domains.' + index + '.time'"
              label="选择时间段"
              :rules="[
                { required: true, message: '请选择时间范围', trigger: 'change' }
              ]"
            >
              <el-time-picker
                v-model="domain.time"
                is-range
                value-format="yyyy-MM-DD HH:mm:ss"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
              />
            </el-form-item>
            <el-form-item
              style="display: inline-block"
              :prop="'domains.' + index + '.capacity'"
              label="容量"
              :rules="[
                { required: true, message: '请输入容量', trigger: 'blur' }
              ]"
            >
              <el-input v-model.number="domain.capacity" type="number"/>
            </el-form-item>

            <el-form-item style="display: inline-block">
              <el-button type="danger" @click="delCap(index)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="success" @click="addCap">添加时间段</el-button>
          <el-button style="width: 200px" type="primary" @click="submitForm('dynamicValidateForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Capacity',
    data() {
      return {
        loading: false,
        tableData: [],
        dynamicValidateForm: {
          domains: []
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true
        this.$api.points.capacityList({ spotId: this.$route.query.id }).then(res => {
          this.tableData = res.data
          this.dynamicValidateForm.domains = this.tableData.map(item => {
            return {
              id: item.id,
              parkingSpotId: item.parkingSpotId,
              time: [item.start, item.end],
              capacity: item.capacity
            }
          })
          this.loading = false
        }).catch(() => { this.loading = false })
      },
      /**/
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.tableData = this.dynamicValidateForm.domains.map(item => {
              return {
                id: item.id,
                parkingSpotId: item.parkingSpotId,
                start: item.time[0],
                end: item.time[1],
                capacity: item.capacity
              }
            })
            this.$api.points.capacityAdd(this.tableData).then(res => {
              if (res.code === 200) {
                this.$message.success('保存成功')
                this.loading = false
              }
            }).catch(() => { this.loading = false })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      delCap(index) {
        this.dynamicValidateForm.domains.splice(index, 1)
      },
      addCap() {
        this.dynamicValidateForm.domains.push({
          time: null,
          capacity: '',
          parkingSpotId: this.$route.query.id
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .point {

  }
</style>
