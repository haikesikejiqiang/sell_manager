<template>
  <div class="d768">
    <div class="mask" :class="flag ? 'addmask' : null" @click="fun"></div>
    <div class="drawer" :class="flag ? null : 'sport'">
      <div class="paper" @click="flag = !flag">
        <i v-if="!flag"
          ><svg
            viewBox="64 64 896 896"
            data-icon="menu-fold"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            class=""
          >
            <path
              d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 0 0 0 13.8z"
            ></path></svg
        ></i>

        <i v-else-if="flag"
          ><svg
            viewBox="64 64 896 896"
            data-icon="close"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            class=""
          >
            <path
              d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
            ></path></svg
        ></i>
      </div>
      <div class="body">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :router="true"
        >
          <el-menu-item index="/">
            <i class="iconfont icon-shouye"></i>
            <span slot="title">后台首页</span>
          </el-menu-item>

          <el-menu-item index="/order">
            <i class="iconfont icon-icon-"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>

          <el-submenu index="/prolist">
            <template slot="title">
              <i class="iconfont icon-shangpin"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/prolist">商品列表</el-menu-item>
            <el-menu-item index="/proadd">商品添加</el-menu-item>
            <el-menu-item index="/procate">商品分类</el-menu-item>
          </el-submenu>

          <el-menu-item index="/shop">
            <i class="iconfont icon-dianpu"></i>
            <span slot="title">店铺管理</span>
          </el-menu-item>

          <el-submenu index="/account">
            <template slot="title">
              <i class="iconfont icon-zhanghao"></i>
              <span>账号管理</span>
            </template>
            <el-menu-item index="/accountlist">账号列表</el-menu-item>
            <el-menu-item index="/accountadd">账号添加</el-menu-item>
            <el-menu-item index="/resepwd">账号修改</el-menu-item>
          </el-submenu>

          <el-submenu index="/sellcount">
            <template slot="title">
              <i class="iconfont icon-tongji"></i>
              <span>销售统计</span>
            </template>
            <el-menu-item index="/goodscount">商品统计</el-menu-item>
            <el-menu-item index="/orderscount">订单统计</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: false
    }
  },
  methods: {
    fun() {
      if (this.flag) {
        this.flag = false
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less">
.body {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-y: auto;
  height: 93%;
}

// .el-menu li {
//   height: 40px;
//   line-height: 40px;
//   margin-top: 4px;
//   margin-bottom: 8px;
// }

.is-opened {
  height: auto !important;
}

.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  background-color: transparent !important;
  color: #1890ff !important;
}

.el-menu-item.is-active {
  background-color: #e6f7ff !important;
  color: #1890ff;
  border-right: 3px solid #1890ff;
}

// /deep/ .el-submenu__title:hover {
//   background-color: yellow !important;
//   color: #1890ff !important;
// }

/deep/ .el-menu-item:hover .iconfont {
  color: #1890ff !important;
}

.el-menu {
  box-sizing: border-box;
  border-right: 1px solid #e8e8e8;
}

.mask {
  position: fixed;
  width: 100%;
  z-index: 5;
  height: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.65);
  transition: opacity 0.3s linear, height 0s ease 0.3s;
}

.addmask {
  opacity: 0.3;
  height: 100%;
  z-index: 11;
  animation: antdDrawerFadeIn 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition: none;
}

.drawer {
  transition: transform 0.4s cubic-bezier(0.7, 0.3, 0.1, 1);
  width: 256px !important;
  background: #fff;
  z-index: 22;
  height: 100%;
  border: none;
  position: fixed;
}
.paper {
  z-index: 23;
  top: 72px;
  width: 41px;
  height: 40px;
  cursor: pointer;
  right: -40px;
  box-shadow: 2px 0 8px rgb(0 0 0 / 15%);
  border-radius: 0 4px 4px 0;
  background: #fff;
  position: absolute;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.paper i {
  display: flex;
  align-items: center;
}

.sport {
  transform: translateX(-100%);
}
.d768 {
  display: none;
}
</style>
