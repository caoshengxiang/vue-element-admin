import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
  },
  {
    path: '/electronic-license',
    name: 'electronic-license',
    component: Layout,
    redirect: '/electronic-license/index',
    children: [{
      path: 'index',
      name: 'electronic-license-index',
      component: () => import('@/views/electronic-license/index'),
      meta: { title: '电子牌照', icon: 'dashboard' }
    }, {
      path: 'add',
      name: 'electronic-license-add',
      component: () => import('@/views/electronic-license/add'),
      meta: { title: '电子牌照（添加/编辑）', icon: 'dashboard' },
      hidden: true
    }]
  },
  {
    path: '/point',
    name: 'point',
    component: Layout,
    redirect: '/point/index',
    children: [{
      path: 'index',
      name: 'point-index',
      component: () => import('@/views/point/index'),
      meta: { title: '点位查看', icon: 'dashboard' }
    }, {
      path: 'add',
      name: 'point-add',
      component: () => import('@/views/point/add'),
      meta: { title: '点位（添加/编辑）', icon: 'dashboard' },
      hidden: true
    }]
  },
  {
    path: '/fence',
    name: 'fence',
    component: Layout,
    redirect: '/fence/parking-area',
    meta: { title: '电子围栏', icon: 'example' },
    children: [
      {
        path: 'parking-area',
        name: 'parking-area',
        component: () => import('@/views/fence/parking-area/index'),
        meta: { title: '停放区', icon: 'dashboard' }
      },
      {
        path: 'no-stop',
        name: 'no-stop',
        component: () => import('@/views/fence/no-stop/index'),
        meta: { title: '禁停区', icon: 'dashboard' }
      },
      {
        path: 'fence-map',
        name: 'fence-map',
        component: () => import('@/views/fence/map/index'),
        meta: { title: '围栏地图', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/warning',
    name: 'warning',
    component: Layout,
    redirect: '/warning/index',
    children: [{
      path: 'index',
      name: 'warning-index',
      component: () => import('@/views/warning/index'),
      meta: { title: '预警事件', icon: 'dashboard' }
    }]
  },
  {
    path: '/task',
    name: 'task',
    component: Layout,
    redirect: '/task/index',
    children: [{
      path: 'index',
      name: 'task-index',
      component: () => import('@/views/task/index'),
      meta: { title: '任务调度', icon: 'dashboard' }
    }]
  },
  {
    path: '/cycle-record',
    name: 'cycle-record',
    component: Layout,
    redirect: '/cycle-record/index',
    children: [
      {
        path: 'index',
        name: 'cycle-record-index',
        component: () => import('@/views/cycle-record/index'),
        meta: { title: '骑行人违章记录', icon: 'dashboard' }
      },
      {
        path: 'detail',
        name: 'cycle-record-detail',
        component: () => import('@/views/cycle-record/index'),
        meta: { title: '详情', icon: 'dashboard' },
        hidden: true
      }
    ]
  },
  {
    path: '/repair',
    name: 'repair',
    component: Layout,
    redirect: '/repair/index',
    children: [{
      path: 'index',
      name: 'repair-index',
      component: () => import('@/views/repair/index'),
      meta: { title: '单车维保', icon: 'dashboard' }
    }]
  },
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/index',
    children: [{
      path: 'index',
      name: 'user-index',
      component: () => import('@/views/user/index'),
      meta: { title: '人员管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/ingLog',
    name: 'ingLog',
    component: Layout,
    redirect: '/ingLog/index',
    children: [{
      path: 'index',
      name: 'insLog-index',
      component: () => import('@/views/ingLog/index'),
      meta: { title: '巡查日志', icon: 'dashboard' }
    }]
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Layout,
    redirect: '/statistics/record',
    meta: { title: '统计分析', icon: 'dashboard' },
    children: [{
      path: 'record',
      name: 'statistics-record',
      component: () => import('@/views/statistics/record/index'),
      meta: { title: '车辆备案统计', icon: 'dashboard' }
    }, {
      path: 'park',
      name: 'statistics-park',
      component: () => import('@/views/statistics/park/index'),
      meta: { title: '单车停放量统计', icon: 'dashboard' }
    }, {
      path: 'violation',
      name: 'violation-record',
      component: () => import('@/views/statistics/violation/index'),
      meta: { title: '违章停放统计', icon: 'dashboard' }
    }, {
      path: 'illegal',
      name: 'statistics-illegal',
      component: () => import('@/views/statistics/illegal/index'),
      meta: { title: '非法投放统计', icon: 'dashboard' }
    }, {
      path: 'task',
      name: 'statistics-task',
      component: () => import('@/views/statistics/task/index'),
      meta: { title: '调度任务统计', icon: 'dashboard' }
    }
    ]
  },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
