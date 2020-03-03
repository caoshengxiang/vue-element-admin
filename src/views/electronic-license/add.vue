<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="demo-ruleForm">
        <el-form-item label="单车编号" prop="bikeNo">
          <el-input v-model="ruleForm.bikeNo" />
        </el-form-item>
        <el-form-item label="电子牌照" prop="electroLicence">
          <el-input v-model="ruleForm.electroLicence" />
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="ruleForm.company" />
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="ruleForm.model" />
        </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-input v-model="ruleForm.color" />
        </el-form-item>
        <el-form-item label="车况" prop="condition">
          <el-select v-model="ruleForm.condition" placeholder="请选择">
            <el-option
              v-for="item in electroLicence_condition"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="ruleForm.state" placeholder="请选择">
            <el-option
              v-for="item in electroLicence_state"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否有蓝牙" prop="bluetooth">
          <el-radio-group v-model="ruleForm.bluetooth">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" />
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
          bikeNo: '',
          electroLicence: '',
          company: '',
          model: '',
          color: '',
          condition: '',
          bluetooth: false,
          description: ''
        },
        rules: {
          bikeNo: [
            { required: true, message: '请输入', trigger: 'blur' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          electroLicence: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          company: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          model: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          color: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          condition: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          bluetooth: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          state: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        },
        targetId: ''
      }
    },
    computed: {
      ...mapState('const', [
        'electroLicence_condition',
        'electroLicence_state'
      ])
    },
    created() {
      this.targetId = this.$route.query.id
      if (this.targetId) {
        this.$api.electronicLicense.detail(this.targetId).then(res => {
          if (res.code === 200) {
            this.ruleForm = res.data
          }
        })
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$api.electronicLicense.add(this.ruleForm).then(res => {
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
      }
    }
  }
</script>

<style scoped lang="scss">
  .demo-ruleForm {
    width: 600px;
  }
</style>
