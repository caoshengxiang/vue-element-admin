import Layout from '@/layout/index'

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
    name: 'login',
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
    path: '/icons',
    component: () => import('@/views/icons/index'),
    meta: { title: '项目图标' },
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
      meta: { title: '首页', icon: 'example', affix: true }
    }]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    children: [{
      path: 'index',
      name: 'profile-index',
      component: () => import('@/views/profile/index'),
      meta: { title: '个人中心' },
      hidden: true
    }]
  },
  {
    path: '/event',
    name: 'event',
    component: Layout,
    redirect: '/event/warning-index',
    meta: { title: '智慧监测', icon: 'tree-table' },
    children: [
      {
        path: 'warning-index',
        name: 'warning-index',
        component: () => import('@/views/warning/index'),
        meta: { title: '预警事件', icon: 'example' }
      }, {
        path: 'warning-add',
        name: 'warning-add',
        component: () => import('@/views/warning/add'),
        meta: { title: '预警详情', icon: 'example' },
        hidden: true
      },
      {
        path: 'task-index',
        name: 'task-index',
        component: () => import('@/views/task/index'),
        meta: { title: '任务调度', icon: 'example' }
      }, {
        path: 'task-add',
        name: 'task-add',
        component: () => import('@/views/task/add'),
        meta: { title: '任务详情', icon: 'example' },
        hidden: true
      }
    ]
  },
  {
    path: '/electronic-license',
    name: 'electronic-license',
    component: Layout,
    redirect: '/electronic-license/index',
    meta: { title: '电子牌照', icon: 'tree-table' },
    children: [{
      path: 'index',
      name: 'electronic-license-index',
      component: () => import('@/views/electronic-license/index'),
      meta: { title: '车辆备案', icon: 'example' }
    }, {
      path: 'add',
      name: 'electronic-license-add',
      component: () => import('@/views/electronic-license/add'),
      meta: { title: '电子牌照（添加/编辑）', icon: 'example' },
      hidden: true
    }, {
      path: 'check-index',
      name: 'check-index',
      component: () => import('@/views/check/index'),
      meta: { title: '绩效考核', icon: 'example' }
    }, {
      path: 'quota-index',
      name: 'quota-index',
      component: () => import('@/views/quota/index'),
      meta: { title: '配额管理', icon: 'example' }
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
      meta: { title: '点位查看', icon: 'example' }
    }, {
      path: 'add',
      name: 'point-add',
      component: () => import('@/views/point/add'),
      meta: { title: '点位（添加/编辑）', icon: 'example' },
      hidden: true
    }, {
      path: 'capacity',
      name: 'point-capacity',
      component: () => import('@/views/point/capacity'),
      meta: { title: '潮汐容量', icon: 'example' },
      hidden: true
    }]
  },
  {
    path: '/fence',
    name: 'fence',
    component: Layout,
    redirect: '/fence/parking-area',
    meta: { title: '电子围栏', icon: 'tree-table' },
    children: [
      {
        path: 'parking-area',
        name: 'parking-area',
        component: () => import('@/views/fence/parking-area/index'),
        meta: { title: '停放区', icon: 'example' }
      },
      {
        path: 'fence-area-add',
        name: 'fence-area-add',
        component: () => import('@/views/fence/parking-area/add'),
        meta: { title: '停放区（添加/编辑）', icon: 'example' },
        hidden: true
      },
      {
        path: 'no-stop',
        name: 'no-stop',
        component: () => import('@/views/fence/no-stop/index'),
        meta: { title: '禁停区', icon: 'example' }
      },
      {
        path: 'fence-no-add',
        name: 'fence-no-add',
        component: () => import('@/views/fence/no-stop/add'),
        meta: { title: '禁停区（添加/编辑）', icon: 'example' },
        hidden: true
      }
      // {
      //   path: 'fence-map',
      //   name: 'fence-map',
      //   component: () => import('@/views/fence/map/index'),
      //   meta: { title: '围栏地图', icon: 'example' }
      // }
    ]
  },
  // {
  //   path: '/warning',
  //   name: 'warning',
  //   component: Layout,
  //   redirect: '/warning/index',
  //   children: []
  // },
  // {
  //   path: '/task',
  //   name: 'task',
  //   component: Layout,
  //   redirect: '/task/index',
  //   children: []
  // },
  {
    path: '/camera',
    name: 'camera',
    component: Layout,
    redirect: '/camera/index',
    children: [{
      path: 'index',
      name: 'camera-index',
      component: () => import('@/views/camera/index'),
      meta: { title: '摄像头管理', icon: 'example' }
    }, {
      path: 'add',
      name: 'camera-add',
      component: () => import('@/views/camera/add'),
      meta: { title: '摄像头添加/编辑', icon: 'example' },
      hidden: true
    }]
  },
  {
    path: '/cycle-record',
    name: 'cycle-record',
    component: Layout,
    redirect: '/cycle-record/index',
    meta: { title: '骑行记录', icon: 'tree-table' },
    children: [
      {
        path: 'index',
        name: 'cycle-record-index',
        component: () => import('@/views/cycle-record/cycle-record/index'),
        meta: { title: '骑行记录', icon: 'example' }
      },
      {
        path: 'detail',
        name: 'cycle-record-detail',
        component: () => import('@/views/cycle-record/cycle-record/detail'),
        meta: { title: '详情', icon: 'example' },
        hidden: true
      },
      {
        path: 'violate-index',
        name: 'violate-record-index',
        component: () => import('@/views/cycle-record/violate-record/index'),
        meta: { title: '骑行人违章记录', icon: 'example' }
      },
      {
        path: 'violate-detail',
        name: 'violate-record-detail',
        component: () => import('@/views/cycle-record/cycle-record/detail'),
        meta: { title: '详情', icon: 'example' },
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
      meta: { title: '单车维保', icon: 'example' }
    }]
  },
  // 这里用于权限路由测试， 动态返回
  // {
  //   path: '/user',
  //   name: 'user',
  //   component: Layout,
  //   redirect: '/user/index',
  //   children: [{
  //     path: 'index',
  //     name: 'user-index',
  //     component: () => import('@/views/user/index'),
  //     meta: { title: '人员管理', icon: 'example' }
  //   }]
  // },
  {
    path: '/ingLog',
    name: 'ingLog',
    component: Layout,
    redirect: '/ingLog/index',
    children: [{
      path: 'index',
      name: 'insLog-index',
      component: () => import('@/views/ingLog/index'),
      meta: { title: '巡查日志', icon: 'example' }
    }, {
      path: 'detail',
      name: 'insLog-detail',
      component: () => import('@/views/ingLog/detail'),
      meta: { title: '详情', icon: 'example' },
      hidden: true
    }]
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Layout,
    redirect: '/statistics/record',
    meta: { title: '统计分析', icon: 'tree-table' },
    children: [{
      path: 'record',
      name: 'statistics-record',
      component: () => import('@/views/statistics/record/index'),
      meta: { title: '车辆备案统计', icon: 'example' }
    }, {
      path: 'park',
      name: 'statistics-park',
      component: () => import('@/views/statistics/park/index'),
      meta: { title: '单车停放量统计', icon: 'example' }
    }, {
      path: 'violation',
      name: 'violation-record',
      component: () => import('@/views/statistics/violation/index'),
      meta: { title: '违章停放统计', icon: 'example' }
    }, {
      path: 'illegal',
      name: 'statistics-illegal',
      component: () => import('@/views/statistics/illegal/index'),
      meta: { title: '非法投放统计', icon: 'example' }
    }, {
      path: 'task',
      name: 'statistics-task',
      component: () => import('@/views/statistics/task/index'),
      meta: { title: '调度任务统计', icon: 'example' }
    }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://49.235.131.71:9512/#/data/v',
        meta: { title: '大屏', icon: 'link' }
      }
    ]
  },
  {
    path: 'external-link2',
    component: Layout,
    children: [
      {
        path: 'http://49.235.131.71:9512/#/data/map',
        meta: { title: 'GIS大屏', icon: 'link' }
      }
    ]
  }

  // 404 page must be placed at the end !!!
  // 使用了addRoutes
  //  不能在自己写的路由里边添加404 要在addRoutes中添加404页面不然就会跳转404， 在addRoutes 最后添加路由的 通配符 * 跳转404 页面果然好了
  // { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = []
