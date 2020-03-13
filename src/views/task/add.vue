<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="demo-ruleForm">
        <el-form-item label="点位名称:" prop="parkingSpotId">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.parkingSpotName }}</span>
          <el-select v-else v-model="ruleForm.parkingSpotId" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in pointOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="viewType === 'detail'" label="创建人名称:" prop="creatorName">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.creatorName }}</span>
          <!--          <el-input v-else v-model="ruleForm.creatorName"/>-->
        </el-form-item>
        <el-form-item label="执行人名称:" prop="executorId">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.executorName }}</span>
          <el-select
            v-else
            v-model="ruleForm.executorId"
            placeholder="请选择"
            style="width: 100%;"
            @change="executorChange"
          >
            <el-option
              v-for="item in orgList"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="执行人所属组织:" prop="">
          <span class="com-detail-item-value">{{ ruleForm.deptName }}</span>
          <!--          <el-select v-else v-model="ruleForm.deptId" placeholder="请选择" style="width: 100%;">-->
          <!--            <el-option-->
          <!--              v-for="item in pointOptions"-->
          <!--              :key="item.id"-->
          <!--              :label="item.name"-->
          <!--              :value="item.id"-->
          <!--            />-->
          <!--          </el-select>-->
        </el-form-item>
        <el-form-item label="调度类型:" prop="taskType">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">
            <span
              v-for="item in taskType"
              :key="item.value"
            ><span v-if="ruleForm.taskType === item.value">{{ item.label }}</span></span>
          </span>
          <el-select v-else v-model="ruleForm.taskType" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in taskType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="viewType === 'detail'" label="任务状态:" prop="state">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">
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
        <el-form-item v-if="viewType === 'detail'" label="任务调度时间:" prop="taskTime">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.taskTime }}</span>
          <el-input v-else v-model="ruleForm.taskTime" />
        </el-form-item>
        <el-form-item v-if="viewType === 'detail'" label="任务完成时间:" prop="fishTime">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.fishTime }}</span>
          <el-input v-else v-model="ruleForm.fishTime" />
        </el-form-item>
        <el-form-item v-if="viewType === 'detail'" label="任务转移记录:" prop="taskTrace">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.taskTrace }}</span>
          <el-input v-else v-model="ruleForm.taskTrace" type="textarea" />
        </el-form-item>
        <el-form-item label="任务描述:" prop="taskDesc">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.taskDesc }}</span>
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
          <div v-else>
            <el-upload
              action=""
              list-type="picture-card"
              :file-list="fileList"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeAvatarUpload"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <el-form-item v-if="viewType !== 'detail'">
          <el-button type="primary" style="width: 200px" @click="submitForm('ruleForm')">下发任务</el-button>
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
          parkingSpotId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          executorId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          deptId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          taskType: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        },
        targetId: '',
        viewType: '',
        pointOptions: [],
        orgList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: []
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
      this.getPoint()
      this.getOrgList()
      if (this.targetId) {
        this.$api.task.detail(this.targetId).then(res => {
          if (res.code === 200) {
            this.ruleForm = res.data
            if (res.data.pic) {
              this.ruleForm.pics = res.data.pic.split(',')
              this.fileList = this.ruleForm.pics.map(item => {
                return { url: item }
              })
            }
          }
        })
      }
    },
    methods: {
      executorChange() {
        this.orgList.forEach(item => {
          if (item.userId === this.ruleForm.executorId) {
            this.ruleForm.executorName = item.userName
            this.ruleForm.deptId = item.deptId
            this.ruleForm.deptName = item.deptName
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            if (this.targetId) {
              // this.$message.success('编辑成功')
            } else {
              this.pointOptions.forEach(item => {
                if (item.id === this.ruleForm.parkingSpotId) {
                  this.ruleForm.parkingSpotName = item.name
                }
              })
              const pics = []
              this.fileList.forEach(item => {
                pics.push(item.url)
              })
              this.ruleForm.pic = pics.join(',')
              this.$api.task.add(this.ruleForm).then(res => {
                if (res.code === 200) {
                  this.$message.success('下发成功')
                  this.resetForm('ruleForm')
                  this.loading = false
                }
              }).catch(() => {
                this.loading = false
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.ruleForm = {}
        this.fileList = []
      },
      getPoint() {
        this.$api.points.list({
          size: 1000,
          current: 1
        }).then(res => {
          const { data } = res
          this.pointOptions = data.records
        })
      },
      getOrgList() {
        this.$api.common.orgList().then(res => {
          const { data } = res
          this.orgList = data
        })
      },
      handleRemove(file, fileList) {
        // console.log(file, fileList)
        this.fileList = fileList
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg'
        // const isPNG = file.type === 'image/png'
        const isImg = file.type.indexOf('image') > -1
        const isLt10M = file.size / 1024 / 1024 < 10

        if (!isImg) {
          this.$message.error('上传头像图片只能是 图片 格式!')
          return false
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
          return false
        }

        const param = new FormData()
        param.append('file', file, file.name)
        this.$api.common.upload(param).then((res) => {
          this.fileList.push({ url: res.data.url })
        })
        return false
      }
    }
  }
</script>

<style scoped lang="scss">
  .demo-ruleForm {
    width: 600px;
  }
</style>
