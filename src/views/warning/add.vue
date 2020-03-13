<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="demo-ruleForm">
        <el-form-item label="预警:" prop="eventDesc">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.eventDesc }}</span>
          <!--          <el-input v-else v-model="ruleForm.eventDesc" />-->
        </el-form-item>
        <el-form-item label="单车公司:" prop="ip">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">
            <span
              v-for="item in bikeCompany"
              :key="item.value"
            ><span v-if="ruleForm.company === item.value">{{ item.label }}</span></span>
          </span>
          <el-select v-else v-model="ruleForm.company" placeholder="请选择">
            <el-option
              v-for="item in bikeCompany"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="预警次数:" prop="alertTimes">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.alertTimes }}</span>
          <el-input v-else v-model="ruleForm.alertTimes" />
        </el-form-item>
        <el-form-item label="预警时间:" prop="eventTime">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.eventTime }}</span>
          <el-input v-else v-model="ruleForm.eventTime" />
        </el-form-item>
        <el-form-item label="消除时间:" prop="stopTime">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.stopTime }}</span>
          <el-input v-else v-model="ruleForm.stopTime" />
        </el-form-item>
        <el-form-item label="预警状态:" prop="state">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">
            <span
              v-for="item in warnState"
              :key="item.value"
            ><span v-if="ruleForm.state === item.value">{{ item.label }}</span></span>
          </span>
          <el-select v-else v-model="ruleForm.state" placeholder="请选择">
            <el-option
              v-for="item in warnState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事件类型:" prop="eventType">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">
            <span
              v-for="item in warnType"
              :key="item.value"
            ><span v-if="ruleForm.eventType === item.value">{{ item.label }}</span></span>
          </span>
          <el-select v-else v-model="ruleForm.eventType" placeholder="请选择">
            <el-option
              v-for="item in warnType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="围栏名称:" prop="fenceName">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.fenceName }}</span>
          <el-input v-else v-model="ruleForm.fenceName" />
        </el-form-item>
        <el-form-item label="是否生成任务:" prop="hasTask">
          <span v-if="ruleForm.hasTask === true">是</span>
          <span v-if="ruleForm.hasTask === false">否</span>
        </el-form-item>
        <el-form-item label="图片:" prop="pic">
          <div v-if="viewType === 'detail'">
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
        // rules: {
        //   name: [
        //     { required: true, message: '请输入', trigger: 'blur' }
        //     // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        //   ],
        //   ip: [
        //     { required: true, message: '请输入', trigger: 'blur' }
        //   ],
        //   vendor: [
        //     { required: true, message: '请输入', trigger: 'blur' }
        //   ],
        //   state: [
        //     { required: true, message: '请选择', trigger: 'change' }
        //   ]
        // },
        targetId: '',
        viewType: ''
      }
    },
    computed: {
      ...mapState('const', [
        'warnState',
        'warnType',
        'bikeCompany'
      ])
    },
    created() {
      this.targetId = this.$route.query.id
      this.viewType = this.$route.query.viewType
      if (this.targetId) {
        this.$api.warning.detail(this.targetId).then(res => {
          if (res.code === 200) {
            this.ruleForm = res.data
            if (res.data.pic) {
              this.ruleForm.pics = res.data.pic.split(',')
            }
          }
        })
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$api.warning.add(this.ruleForm).then(res => {
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
