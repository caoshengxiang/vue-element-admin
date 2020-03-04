<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="demo-ruleForm">
        <el-form-item label="点位名称" prop="name">
          <el-input v-model="ruleForm.name" style="width: 400px" />
        </el-form-item>
        <el-form-item label="重点点位" prop="focused">
          <el-radio-group v-model="ruleForm.focused">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="街道" prop="regionId">
          <el-select v-model="ruleForm.regionId" placeholder="请选择" style="width: 400px">
            <el-option
              v-for="item in streetOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <!--        <el-form-item label="街道地址" prop="street">-->
        <!--          <el-input v-model="ruleForm.street"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="最大容量" prop="maxCapacity">
          <el-input v-model.number="ruleForm.maxCapacity" type="number" style="width: 400px" />
        </el-form-item>
        <el-form-item label="边界" prop="">
          <map-border
            :border-data="borderData"
            @borderDataChange="borderDataChange"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 200px" @click="submitForm('ruleForm')">保 存</el-button>
          <el-button @click="resetForm('ruleForm')">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import mapBorder from './mapBorder/mapBorder'

  export default {
    name: 'Add',
    components: {
      mapBorder
    },
    data() {
      return {
        loading: false,
        ruleForm: {
          name: '',
          focused: false,
          regionId: '',
          maxCapacity: '',
          street: '',
          matrix: '', // 多边形经纬度json
          matrixCrawler: '' // 爬虫用经纬度数组
        },
        borderData: '',
        rules: {
          name: [
            { required: true, message: '请输入', trigger: 'blur' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          maxCapacity: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          focused: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          street: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          regionId: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        },
        streetOptions: [],
        targetId: ''
      }
    },
    computed: {
      ...mapState('const', [])
    },
    created() {
      this.getStreet()
      this.targetId = this.$route.query.id
      if (this.targetId) {
        this.$api.points.detail(this.targetId).then(res => {
          if (res.code === 200) {
            this.ruleForm = res.data
            this.borderData = res.data.matrix
          }
        })
      }
    },
    methods: {
      getStreet() {
        this.$api.common.street({ deep: 3 }).then(res => {
          this.streetOptions = res.rows
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.streetOptions.forEach(item => {
              if (item.id === this.ruleForm.regionId) {
                this.ruleForm.street = item.name
              }
            })
            this.$api.points.add(this.ruleForm).then(res => {
              if (res.code === 200) {
                if (this.targetId) {
                  this.$message.success('编辑成功')
                } else {
                  this.$message.success('添加成功')
                  this.resetForm('ruleForm')
                }
                this.loading = false
              }
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      borderDataChange(data) {
        this.ruleForm.matrix = data
        // console.log(data)
      }
    }
  }
</script>

<style scoped lang="scss">
  .demo-ruleForm {
    min-width: 600px;
  }
</style>
