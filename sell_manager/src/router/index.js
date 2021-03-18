import Vue from 'vue'
import VueRouter from 'vue-router'
import local from '../utils/local'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const asyncRouter = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () =>
      import(/* webpackChunkName: "about" */ '../layout/Home.vue'),
    children: [
      {
        path: '/dashboard',
        // alias: '/',
        meta: { name: '后台面板', icon: 'icon-shouye' },
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Dashboard/Index.vue')
      },
      {
        path: '/order',
        meta: { name: '订单管理', role: ['super'], icon: 'icon-icon-' },
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Order/Index.vue')
      },
      {
        path: '/product',
        redirect: '/prolist',
        meta: { name: '商品管理', icon: 'icon-shangpin' },
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Product/Index.vue'),
        children: [
          {
            path: '/prolist',
            meta: { name: '商品列表' },
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Product/ProList.vue'
              )
          },
          {
            path: '/proadd',
            meta: { name: '商品添加' },
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Product/ProAdd.vue'
              )
          },
          {
            path: '/procate',
            meta: { name: '商品分类' },
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Product/ProCate.vue'
              )
          },
          {
            path: '/edit',
            meta: { name: '商品编辑' },
            hidden: true,
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Product/EditGoods.vue'
              )
          }
        ]
      },
      {
        path: '/shop',
        meta: { name: '店铺管理', role: ['super'], icon: 'icon-dianpu' },
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Shop/Index.vue')
      },
      {
        path: '/account',
        redirect: '/accountlist',
        meta: { name: '账号管理', icon: 'icon-zhanghao' },
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Account/Index.vue'),
        children: [
          {
            path: '/accountlist',
            meta: { name: '账号列表', role: ['super'] },
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Account/AccountList.vue'
              )
          },
          {
            path: '/accountadd',
            meta: { name: '账号添加', role: ['super'] },
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Account/AccountAdd.vue'
              )
          },
          {
            path: '/resepwd',
            meta: { name: '账号修改', role: ['super', 'normal'] },
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Account/ResetPwd.vue'
              )
          },
          {
            path: '/person',
            meta: { name: '个人中心', role: ['super', 'normal'] },
            hidden: true,
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Account/Person.vue'
              )
          }
        ]
      },
      {
        path: '/sellcount',
        redirect: '/goodscount',
        meta: { name: '销售统计', icon: 'icon-tongji' },
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/SellCount/Index.vue'
          ),
        children: [
          {
            path: '/goodscount',
            meta: { name: '商品统计' },
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/SellCount/GoodsCount.vue'
              )
          },
          {
            path: '/orderscount',
            meta: { name: '订单统计' },
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/SellCount/OrdersCount.vue'
              )
          }
        ]
      }
    ]
  }
]

const routes = [
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login/Index.vue')
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/404/Index.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = local.get('token')
  if (!token) {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

setRouter()
export function setRouter() {
  const role = local.get('role')
  if (!role) return
  const endRouter = calc(asyncRouter[0].children, role)
  asyncRouter[0].children = endRouter

  router.addRoutes(asyncRouter)
  console.log(router.getRouter())
  const menus = calcMenu(endRouter)
  local.set('menus', JSON.stringify(menus))
}

function calcMenu(arr) {
  return arr.filter(item => {
    if (item.hidden) {
      return false
    } else {
      if (item.children) {
        item.children = calcMenu(item.children)
      }
      return true
    }
  })
}

// 计算路由查看role字段是否有
function calc(a, r) {
  return a.filter(item => {
    if (fun(item, r)) {
      if (item.children) {
        item.children = calc(item.children, r)
      }
      return true
    } else {
      return false
    }
  })
}

// 计算路由的children里面role是否包含当前的role，包含就保留
function fun(i, r) {
  if (i.meta && i.meta.role) {
    return i.meta.role.includes(r)
  } else {
    return true
  }
}

export default router
