<template>
  <div class="headerbox">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in breadArr"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.name }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </el-breadcrumb>

    <div class="el-right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ accountInfo.account
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="person">个人中心</el-dropdown-item>
          <el-dropdown-item command="login" v-preventReClick
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-avatar size="medium" :src="accountInfo.imgUrl"></el-avatar>
    </div>
  </div>
</template>

<script>
import { info } from '../api/user'
import local from '../utils/local'
export default {
  data() {
    return {
      accountInfo: {
        account: '',
        imgUrl: ''
      },
      breadArr: []
    }
  },
  props: {
    type: Array,
    default: () => []
  },
  methods: {
    handleCommand(command) {
      if (command === 'person') {
        this.$router.push('person')
      } else if (command === 'login') {
        local.cls()
        location.reload()
        this.$router.push('login')
      }
    },
    async getData() {
      const { accountInfo } = await info()
      this.accountInfo = accountInfo
      local.set('userData', JSON.stringify(accountInfo))
    },
    getBreadcrumb() {
      const arr = [{ path: '/', name: '后台首页' }]
      this.$route.matched.forEach(val => {
        if (val.meta.name) {
          arr.push({
            path: val.path,
            name: val.meta.name
          })
        }
      })
      this.breadArr = arr
    }
  },
  watch: {
    '$route.path'() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
    this.getData()
    this.$Bus.$on('amountUrl', () => {
      this.getData()
    })
  }
}
</script>

<style lang="less" scoped>
.headerbox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-right {
    width: 100px;
    justify-content: space-between;
    display: flex;
    align-items: center;
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
</style>
