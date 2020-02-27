<template>
  <div class="com-container" v-loading="loading">
    <div class="com-con-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
        <el-form-item label="点位名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="重点点位" prop="focused">
          <el-radio-group v-model="ruleForm.bluetooth">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="街道" prop="regionId">
          <el-select v-model="ruleForm.regionId" placeholder="请选择">
            <el-option
              v-for="item in electroLicence_condition"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="街道地址" prop="street">
          <el-input v-model="ruleForm.street"></el-input>
        </el-form-item>
        <el-form-item label="最大容量" prop="maxCapacity">
          <el-input v-model="ruleForm.maxCapacity"></el-input>
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

  export default {
    name: 'Add',
    data() {
      return {
        loading: false,
        ruleForm: {
          name: '',
          focused: '',
          regionId: '',
          maxCapacity: '',
          street: '',
          matrix: '', // 多边形经纬度json
          matrixCrawler: '' // 爬虫用经纬度数组
        },
        rules: {
          name: [
            { required: true, message: '请输入', trigger: 'blur' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          focused: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          maxCapacity: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          street: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          regionId: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      ...mapState('const', [
        'electroLicence_condition'
      ])
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$api.electronicLicense.add(this.ruleForm).then(res => {
              if (res.code === 200) {
                this.$message.success('添加成功')
                this.resetForm('ruleForm')
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
      }
    }
  }
</script>

<style scoped lang="scss">
  .demo-ruleForm {
    width: 500px;
  }
</style>
