<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="demo-ruleForm">
        <el-form-item label="摄像头名称:" prop="name">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.name }}</span>
          <el-input v-else v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="ip地址:" prop="ip">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.ip }}</span>
          <el-input v-else v-model="ruleForm.ip" />
        </el-form-item>
        <el-form-item label="厂商:" prop="vendor">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.vendor }}</span>
          <el-input v-else v-model="ruleForm.vendor" />
        </el-form-item>
        <el-form-item label="状态:" prop="state">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">
            <span
              v-for="item in cameraState"
              :key="item.value"
            ><span v-if="ruleForm.state === item.value">{{ item.label }}</span></span>
          </span>
          <el-select v-else v-model="ruleForm.state" placeholder="请选择">
            <el-option
              v-for="item in cameraState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.remark }}</span>
          <el-input v-else v-model="ruleForm.remark" type="textarea" />
        </el-form-item>
        <el-form-item label="扩展参数:" prop="ext">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.ext }}</span>
          <el-input v-else v-model="ruleForm.ext" type="textarea" />
        </el-form-item>
        <el-form-item v-if="viewType !== 'detail'">
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
          state: '',
          ip: '',
          vendor: '',
          ext: '',
          remark: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入', trigger: 'blur' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          ip: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          vendor: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        },
        targetId: '',
        viewType: ''
      }
    },
    computed: {
      ...mapState('const', [
        'cameraState'
      ])
    },
    created() {
      this.targetId = this.$route.query.id
      this.viewType = this.$route.query.viewType
      if (this.targetId) {
        this.$api.camera.detail(this.targetId).then(res => {
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
            this.$api.camera.add(this.ruleForm).then(res => {
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
