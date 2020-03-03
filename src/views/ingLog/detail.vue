<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="demo-ruleForm">
        <el-form-item label="标题:" prop="title">
          <span v-if="viewType == 'detail'">{{ ruleForm.title }}</span>
          <el-input v-else v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="内容:" prop="content">
          <span v-if="viewType == 'detail'">{{ ruleForm.content }}</span>
          <el-input v-else v-model="ruleForm.content" type="textarea" />
        </el-form-item>
        <el-form-item label="巡查人名字:" prop="inspectorName">
          <span v-if="viewType == 'detail'">{{ ruleForm.inspectorName }}</span>
          <el-input v-else v-model="ruleForm.inspectorName" />
        </el-form-item>
        <el-form-item label="巡查人组织:" prop="inspectorOrgId">
          <span v-if="viewType == 'detail'">{{ ruleForm.inspectorOrgId }}</span>
          <el-input v-else v-model="ruleForm.inspectorOrgId" />
        </el-form-item>
        <el-form-item label="巡查时间:" prop="eventTime">
          <span v-if="viewType == 'detail'">{{ ruleForm.eventTime }}</span>
          <el-input v-else v-model="ruleForm.eventTime" />
        </el-form-item>
        <el-form-item label="巡查地址:" prop="address">
          <span v-if="viewType == 'detail'">{{ ruleForm.address }}</span>
          <el-input v-else v-model="ruleForm.address" />
        </el-form-item>
        <el-form-item label="图片:" prop="pic">
          <div v-if="viewType == 'detail'">
            <span
              v-for="(item, index) in ruleForm.pics"
              :key="index"
            >
              <el-image
                style="width: 200px; height: 300px;margin-right: 5px;"
                :src="item"
                :preview-src-list="ruleForm.pics"
              />
            </span>
          </div>
          <el-input v-else v-model="ruleForm.pic" />
        </el-form-item>
        <el-form-item label="视频:" prop="video">
          <div v-if="viewType == 'detail'">
            <video :src="ruleForm.video" controls="controls">
              您的浏览器不支持 video 标签。
            </video>
          </div>
          <el-input v-else v-model="ruleForm.video" />
        </el-form-item>
        <el-form-item label="是否非法:" prop="valid">
          <span v-if="viewType == 'detail'">{{ ruleForm.valid?'是':'否' }}</span>
          <el-radio-group v-else v-model="ruleForm.valid">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="回复人:" prop="replyUserId">
          <span v-if="viewType == 'detail'">{{ ruleForm.replyUserId }}</span>
          <el-input v-else v-model="ruleForm.replyUserId" />
        </el-form-item>
        <el-form-item label="回复内容:" prop="replyContent">
          <span v-if="viewType == 'detail'">{{ ruleForm.replyContent }}</span>
          <el-input v-else v-model="ruleForm.replyContent" type="textarea" />
        </el-form-item>
        <el-form-item label="回复时间:" prop="replyTime">
          <span v-if="viewType == 'detail'">{{ ruleForm.replyTime }}</span>
          <el-input v-else v-model="ruleForm.replyTime" />
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
        ruleForm: {},
        rules: {},
        targetId: '',
        viewType: ''
      }
    },
    computed: {
      ...mapState('const', [])
    },
    created() {
      this.targetId = this.$route.query.id
      this.viewType = this.$route.query.viewType
      if (this.targetId) {
        this.$api.inspectlog.detail(this.targetId).then(res => {
          if (res.code === 200) {
            this.ruleForm = res.data
            this.ruleForm.pics = res.data.pic.split(',')
          }
        })
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            // this.$api..add(this.ruleForm).then(res => {
            //   if (res.code === 200) {
            //     if (this.targetId) {
            //       this.$message.success('编辑成功')
            //     } else {
            //       this.$message.success('添加成功')
            //       this.resetForm('ruleForm')
            //     }
            //     this.loading = false
            //   }
            // }).catch(() => {
            //   this.loading = false
            // })
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
    min-width: 600px;
  }
</style>
