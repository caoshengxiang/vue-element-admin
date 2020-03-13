<template>
  <div v-loading="loading" class="com-container">
    <div class="com-con-box">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="demo-ruleForm">
        <el-form-item label="点位名称:" prop="name">
          <el-input v-model="ruleForm.name" style="width: 400px" />
        </el-form-item>
        <el-form-item label="重点点位:" prop="focused">
          <el-radio-group v-model="ruleForm.focused">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="组织街道:" prop="deptId">
          <el-select v-model="ruleForm.deptId" placeholder="请选择" style="width: 400px">
            <el-option
              v-for="item in streetOptions"
              :key="item.deptId"
              :label="item.sName"
              :value="item.deptId"
            />
          </el-select>
        </el-form-item>
        <!--        <el-form-item label="街道地址" prop="street">-->
        <!--          <el-input v-model="ruleForm.street"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="最大容量:" prop="maxCapacity">
          <el-input v-model.number="ruleForm.maxCapacity" type="number" style="width: 400px" />
        </el-form-item>
        <el-form-item label="边界:" prop="">
          <map-border
            :center="mapCenter"
            :border-data="ruleForm.matrix"
            @borderDataChange="borderDataChange"
          />
        </el-form-item>
        <el-form-item label="爬虫边界:" prop="">
          <div>
            <el-button v-if="!spiderBorderEdit" type="primary" @click="spiderBorderEdit = true">展 开<i
              class="el-icon-arrow-down el-icon--right"
            /></el-button>
            <el-button v-else type="primary" @click="spiderBorderEdit = false">收 起<i
              class="el-icon-arrow-up el-icon--right"
            /></el-button>
          </div>
          <div v-show="spiderBorderEdit">
            <div style="margin-bottom: 5px">
              <div>注意事项：</div>
              <div style="line-height: 26px">1. 必须逆时针绘制多边形</div>
              <div style="line-height: 26px">2. 绘制爬虫区域尽量大些</div>
              <div style="line-height: 26px">3. <span style="color: blue">蓝色</span>边框代表爬虫区域，<span
                style="color: red;"
              >红色</span>边框代表密集区域
              </div>
              <div style="line-height: 26px">4. 绘制最后一个点不必连接起点，点击生成边界会自动将最后一个点和第一个点连接</div>
            </div>
            <spider-border
              :center="mapCenter"
              :border-data="ruleForm.matrixCrawler"
              @borderDataChange="SpiderDataChange"
            />
          </div>
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
  import mapBorder from '../components/mapBorder/mapBorder'
  import spiderBorder from '../components/mapBorder/spiderBorder'

  export default {
    name: 'Add',
    components: {
      mapBorder,
      spiderBorder
    },
    data() {
      return {
        loading: false,
        ruleForm: {
          name: '',
          focused: false,
          regionId: '',
          maxCapacity: '',
          street: '',
          matrix: '', // 多边形经纬度json
          matrixCrawler: '' // 爬虫用经纬度数组
        },
        // testBox: '',
        rules: {
          name: [
            { required: true, message: '请输入', trigger: 'blur' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          maxCapacity: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          focused: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          deptId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          regionId: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        },
        streetOptions: [],
        targetId: '',
        spiderBorderEdit: false,
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
      this.getStreet()
      this.targetId = this.$route.query.id
      if (this.targetId) {
        this.$api.points.detail(this.targetId).then(res => {
          if (res.code === 200) {
            this.ruleForm = res.data
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

      // setTimeout(() => {
      //   this.testBox = '[{"box":[[104.067138,30.60014],[104.067138,30.597342],[104.07012,30.597591],[104.070084,30.599767]],"center":[[104.068036,30.599301],[104.067964,30.598119],[104.06933,30.598119],[104.068935,30.599176]]}]'
      // })
    },
    methods: {
      getStreet() {
        this.$api.common.street({ extType: 0 }).then(res => {
          this.streetOptions = res.data
          this.streetOptions.forEach(item => {
            const sFullNames = item.extRegionFullName.split('/')
            item.sName = sFullNames[sFullNames.length - 1]
          })
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.streetOptions.forEach(item => {
              if (item.id === this.ruleForm.regionId) {
                this.ruleForm.street = item.name
              }
            })
            this.$api.points.add(this.ruleForm).then(res => {
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
      SpiderDataChange(data) {
        this.ruleForm.matrixCrawler = data
        // console.log(data)
      }
    }
  }
</script>

<style scoped lang="scss">
  .demo-ruleForm {
    min-width: 600px;
  }
</style>
