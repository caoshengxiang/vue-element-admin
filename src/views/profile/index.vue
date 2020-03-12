<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="消息" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="日志" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="修改个人资料" name="account">
                <account :user="user" />
              </el-tab-pane>
              <el-tab-pane label="修改密码" name="pass">
                <Pass :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import UserCard from './components/UserCard'
  import Activity from './components/Activity'
  import Timeline from './components/Timeline'
  import Account from './components/Account'
  import Pass from './components/Pass'

  export default {
    name: 'Profile',
    components: { UserCard, Activity, Timeline, Account, Pass },
    data() {
      return {
        user: {},
        activeTab: 'activity'
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'userInfo'
      ])
    },
    created() {
      this.getUser()
    },
    methods: {
      getUser() {
        this.user = Object.assign({}, this.userInfo, {
          name: this.name,
          avatar: this.avatar
        })
      }
    }
  }
</script>
