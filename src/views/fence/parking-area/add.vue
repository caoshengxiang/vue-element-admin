<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="demo-ruleForm">
        <el-form-item label="围栏名称:" prop="name">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.name }}</span>
          <el-input v-else v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="所属点位:" prop="parkingSpotId">
          <!--          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.parkingSpotName }}</span>-->
          <el-select v-model="ruleForm.parkingSpotId" :disabled="viewType === 'detail'" placeholder="请选择" filterable>
            <el-option
              v-for="item in pointOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <!--        <el-form-item label="有无摄像头" prop="hasCamera">-->
        <!--          <el-radio-group v-model="ruleForm.hasCamera">-->
        <!--            <el-radio :label="true">有摄像头</el-radio>-->
        <!--            <el-radio :label="false">无摄像头</el-radio>-->
        <!--          </el-radio-group>-->
        <!--        </el-form-item>-->
        <el-form-item label="摄像头:" prop="cameraId">
          <el-select v-model="ruleForm.cameraId" :disabled="viewType === 'detail'" clearable placeholder="摄像头" filterable>
            <el-option
              v-for="item in cameraList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="有效期:" prop="validStart">
          <span v-if="viewType === 'detail'" class="com-detail-item-value">{{ ruleForm.validStart }} - {{ ruleForm.validEnd }}</span>
          <el-date-picker
            v-else
            v-model="valueTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            :unlink-panels="true"
            style="width: 260px;"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
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
        <el-form-item label="边界:" prop="">
          <map-border
            :is-edit="viewType !== 'detail'"
            :center="mapCenter"
            :border-data="ruleForm.matrix"
            @borderDataChange="borderDataChange"
          />
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
  import mapBorder from '../../components/mapBorder/mapBorder'

  export default {
    name: 'Add',
    components: {
      mapBorder
    },
    data() {
      return {
        loading: false,
        ruleForm: {
          type: 1,
          name: '',
          parkingSpotId: '',
          hasCamera: '',
          cameraId: '',
          validStart: '',
          validEnd: '',
          matrix: '',
          pic: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入', trigger: 'blur' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          hasCamera: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          // cameraId: [
          //   { required: true, message: '请选择', trigger: 'change' }
          // ],
          parkingSpotId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          validStart: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        },
        targetId: '',
        viewType: '',
        valueTime: null,
        borderData: '',
        pointOptions: [],
        cameraList: [],
        mapCenter: {
          lng: 104.070264,
          lat: 30.600342
        },
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: []
      }
    },
    computed: {
      ...mapState('const', [])
    },
    created() {
      this.targetId = this.$route.query.id
      this.viewType = this.$route.query.viewType
      this.getPoint()
      this.getCameraList()
      if (this.targetId) {
        this.$api.fence.detail(this.targetId).then(res => {
          if (res.code === 200) {
            this.ruleForm = res.data
            if (this.ruleForm.validStart) {
              this.valueTime = [this.ruleForm.validStart, this.ruleForm.validEnd]
            } else {
              this.valueTime = null
            }
            if (res.data.pic) {
              this.ruleForm.pics = res.data.pic.split(',')
              this.fileList = this.ruleForm.pics.map(item => {
                return { url: item }
              })
            }
            try {
              const borders = JSON.parse(res.data.matrix)
              // console.log(borders[0].center)
              this.mapCenter = borders[0].center
            } catch (e) {
              console.error('边界格式有误')
            }
          }
        })
      }
    },
    methods: {
      getCameraList() {
        this.$api.camera.list(Object.assign({}, {
            current: 1,
            size: 10000
          }
        )).then(res => {
          const { data } = res
          this.cameraList = data.records
        })
      },
      submitForm(formName) {
        this.ruleForm.validStart = this.valueTime ? this.valueTime[0] : ''
        this.ruleForm.validEnd = this.valueTime ? this.valueTime[1] : ''
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            const pics = []
            this.fileList.forEach(item => {
              pics.push(item.url)
            })
            this.ruleForm.pic = pics.join(',')
            this.$api.fence.add(this.ruleForm).then(res => {
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
    min-width: 600px;
  }
</style>
