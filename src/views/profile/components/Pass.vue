<template>
  <el-form ref="ruleForm" :model="userInfo" :rules="rules">
    <el-form-item label="新密码" prop="password">
      <el-input v-model.trim="userInfo.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input v-model.trim="userInfo.password2" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width: 200px" @click="submitForm('ruleForm')">保 存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: {
      user: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value !== this.userInfo.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        userInfo: {
          userId: '',
          password: '',
          password2: ''
        },
        rules: {
          password: [
            { required: true, message: '请输入', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          password2: [
            { required: true, message: '请输入', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      user: {
        handler(newName, oldName) {
          const { userId } = newName
          this.userInfo.userId = userId
        },
        // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        immediate: true
      }
    },
    methods: {
      ...mapActions('user', [
        'getInfo'
      ]),
      submitForm(formName) {
        if (!this.userInfo.userId) {
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.account.resetPwd(Object.assign({}, this.userInfo)).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 5 * 1000
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
          return false
        }

        const param = new FormData()
        param.append('file', file, file.name)
        this.$api.common.upload(param).then((res) => {
          this.userInfo.avatar = res.data.url
        })
        return false
      }
    }
  }
</script>
<style scoped lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
