<template>
  <el-container>
    <Aside />
    <el-aside :width="iscollapse ? '64px' : '200px'">
      <div class="logo" @click="iscollapse = !iscollapse">
        <img src="../assets/images/logo.png" alt="" />
        <!-- <h4 v-show="!iscollapse">外卖商家平台</h4> -->
      </div>
      <Menus :bool="iscollapse"
    /></el-aside>
    <el-container>
      <el-header> <Head /> </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menus from './Menus'
import Head from './Head'
import Aside from './Aside'

export default {
  components: {
    Menus,
    Head,
    Aside
  },
  data() {
    return {
      iscollapse: false
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    height: 60px;
    display: flex;
    align-items: center;
  }
}
.el-aside {
  background-color: #001529;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    h4 {
      color: #fff;
    }
    img {
      width: 60px;
      user-select: none;
    }
  }
}

.el-main {
  background-color: #f0f2f5;
}

@media screen and (max-width: 768px) {
  .el-aside {
    display: none;
  }
  .d768 {
    display: block;
  }
}
</style>
