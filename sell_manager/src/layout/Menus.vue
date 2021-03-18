<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#001529"
    text-color="#ffffffa6"
    active-text-color="#fff"
    :collapse="bool"
    :collapse-transition="false"
    :router="true"
  >
    <template v-for="item in menus">
      <!-- 一级菜单 -->
      <el-menu-item v-if="!item.children" :index="item.path" :key="item.path">
        <i class="iconfont" :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.name }}</span>
      </el-menu-item>
      <!-- 二级菜单 -->
      <el-submenu v-else :index="item.path" :key="item.path">
        <template slot="title">
          <i class="iconfont" :class="item.meta.icon"></i>
          <span>{{ item.meta.name }}</span>
        </template>
        <el-menu-item
          v-for="sub in item.children"
          :index="sub.path"
          :key="sub.path"
          >{{ sub.meta.name }}</el-menu-item
        >
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import local from '../utils/local'
export default {
  data() {
    return {
      menus: []
    }
  },
  created() {
    this.menus = JSON.parse(local.get('menus'))
  },
  props: {
    bool: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
/* .el-menu .iconfont {
  margin-right: 10px;
}
.el-menu-item:hover span {
  color: #fff;
}
.el-menu-item.is-active {
  background-color: #1890ff !important;
}
.el-menu-item:hover span {
  color: #fff;
}
.el-menu {
  border: none;
}
.el-submenu__title:hover span {
  color: #fff !important;
} */

.el-menu .iconfont {
  margin-right: 10px;
}

.el-menu {
  border: none;
}

.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  background-color: transparent !important;
  color: #e6f7ff !important;
}

.el-menu-item.is-active {
  background-color: #1890ff !important;
}

/deep/ .el-menu-item:hover .iconfont {
  color: #e6f7ff !important;
}

/deep/ .el-submenu__title:hover {
  background-color: transparent !important;
  color: #e6f7ff !important;
}
/deep/ .el-submenu__title:hover .iconfont {
  color: #e6f7ff !important;
}

/deep/ .el-submenu__title:hover .el-icon-arrow-down {
  color: #1890ff !important;
}
</style>
