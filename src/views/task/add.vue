<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="demo-ruleForm">
        <el-form-item label="点位名称:" prop="parkingSpotName">
          <span v-if="viewType === 'detail'">{{ ruleForm.parkingSpotName }}</span>
          <el-input v-else v-model="ruleForm.parkingSpotName" />
        </el-form-item>
        <el-form-item label="创建人名称:" prop="creatorName">
          <span v-if="viewType === 'detail'">{{ ruleForm.creatorName }}</span>
          <el-input v-else v-model="ruleForm.creatorName" />
        </el-form-item>
        <el-form-item label="执行人名称:" prop="executorName">
          <span v-if="viewType === 'detail'">{{ ruleForm.executorName }}</span>
          <el-input v-else v-model="ruleForm.executorName" />
        </el-form-item>
        <el-form-item label="执行人所属组织:" prop="deptName">
          <span v-if="viewType === 'detail'">{{ ruleForm.deptName }}</span>
          <el-input v-else v-model="ruleForm.deptName" />
        </el-form-item>
        <el-form-item label="调度类型:" prop="taskType">
          <span v-if="viewType === 'detail'">
            <span
              v-for="item in taskType"
              :key="item.value"
            ><span v-if="ruleForm.taskType === item.value">{{ item.label }}</span></span>
          </span>
          <el-select v-else v-model="ruleForm.taskType" placeholder="请选择">
            <el-option
              v-for="item in taskType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态:" prop="state">
          <span v-if="viewType === 'detail'">
            <span
              v-for="item in taskType"
              :key="item.value"
            ><span v-if="ruleForm.state === item.value">{{ item.label }}</span></span>
          </span>
          <el-select v-else v-model="ruleForm.state" placeholder="请选择">
            <el-option
              v-for="item in taskState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="任务调度时间:" prop="taskTime">
          <span v-if="viewType === 'detail'">{{ ruleForm.taskTime }}</span>
          <el-input v-else v-model="ruleForm.taskTime" />
        </el-form-item>
        <el-form-item label="任务完成时间:" prop="fishTime">
          <span v-if="viewType === 'detail'">{{ ruleForm.fishTime }}</span>
          <el-input v-else v-model="ruleForm.fishTime" />
        </el-form-item>
        <el-form-item label="任务转移记录:" prop="taskTrace">
          <span v-if="viewType === 'detail'">{{ ruleForm.taskTrace }}</span>
          <el-input v-else v-model="ruleForm.taskTrace" type="textarea" />
        </el-form-item>
        <el-form-item label="任务描述:" prop="taskDesc">
          <span v-if="viewType === 'detail'">{{ ruleForm.taskDesc }}</span>
          <el-input v-else v-model="ruleForm.taskDesc" type="textarea" />
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
        rules: {
          // name: [
          //   { required: true, message: '请输入', trigger: 'blur' }
          //   // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          // ],
          // ip: [
          //   { required: true, message: '请输入', trigger: 'blur' }
          // ],
          // vendor: [
          //   { required: true, message: '请输入', trigger: 'blur' }
          // ],
          // state: [
          //   { required: true, message: '请选择', trigger: 'change' }
          // ]
        },
        targetId: '',
        viewType: ''
      }
    },
    computed: {
      ...mapState('const', [
        'taskState',
        'taskType'
      ])
    },
    created() {
      this.targetId = this.$route.query.id
      this.viewType = this.$route.query.viewType
      if (this.targetId) {
        this.$api.task.detail(this.targetId).then(res => {
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
            this.$api.task.add(this.ruleForm).then(res => {
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
