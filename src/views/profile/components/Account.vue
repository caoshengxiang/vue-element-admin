<template>
  <el-form>
    <el-form-item label="头像">
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model.trim="userInfo.userName" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model.trim="userInfo.email" />
    </el-form-item>
    <el-form-item label="电话号码">
      <el-input v-model.trim="userInfo.phonenumber" />
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="userInfo.sex">
        <el-radio label="男">男</el-radio>
        <el-radio label="女">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="介绍">
      <el-input v-model.trim="userInfo.remark" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保存资料</el-button>
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
          return {
            userName: '',
            email: '',
            avatar: '',
            phonenumber: '',
            sex: '',
            remark: ''
          }
        }
      }
    },
    data() {
      return {
        userInfo: {
          userName: '',
          email: '',
          avatar: '',
          phonenumber: '',
          sex: '',
          remark: ''
        }
      }
    },
    watch: {
      user: {
        handler(newName, oldName) {
          const { userName, email, avatar, phonenumber, sex, remark } = newName
          this.userInfo = {
            userName,
            email,
            avatar,
            phonenumber,
            sex,
            remark
          }
        },
        // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        immediate: true
      }
    },
    methods: {
      ...mapActions('user', [
        'getInfo'
      ]),
      submit() {
        const avatar = this.userInfo.avatar.indexOf('http') === -1 ? '' : this.userInfo.avatar
        this.$api.account.update(Object.assign({}, this.userInfo, { avatar: avatar })).then(res => {
          this.getInfo()
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 5 * 1000
          })
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
    border: 1px solid #e2e2e2;
    border-radius: 5px;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
