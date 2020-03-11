<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="demo-ruleForm">
        <el-form-item label="围栏名称:" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="所属点位:" prop="parkingSpotId">
          <el-select v-model="ruleForm.parkingSpotId" placeholder="请选择" filterable>
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
          <el-select v-model="ruleForm.cameraId" clearable placeholder="摄像头" filterable>
            <el-option
              v-for="item in cameraList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="有效期:" prop="validStart">
          <el-date-picker
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
        <el-form-item label="边界:" prop="">
          <map-border
            :center="mapCenter"
            :border-data="ruleForm.matrix"
            @borderDataChange="borderDataChange"
          />
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
          type: 2,
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
        valueTime: null,
        borderData: '',
        pointOptions: [],
        cameraList: [],
        mapCenter: {
          lng: 104.070264,
          lat: 30.600342
        }
      }
    },
    computed: {
      ...mapState('const', [])
    },
    created() {
      this.targetId = this.$route.query.id
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
      }
    }
  }
</script>

<style scoped lang="scss">
  .demo-ruleForm {
    min-width: 600px;
  }
</style>
