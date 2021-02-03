/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  // {
  //   path: '/',
  //   component: () => import('@/views/layouts/index'),
  //   redirect: '/home',
  //   meta: { title: '首页', keepAlive: false },
  //   children: [
  //     {
  //       path: '/home',
  //       name: 'Home',
  //       component: () => import('@/views/home/home'),
  //       meta: { title: '首页', keepAlive: false }
  //     },
  //   ]
  // },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@//views/login/login.vue')
  },
  {
    path: '/home',
    component: { render: (e) => e('router-view') },
    redirect: '/home',
    meta: { title: '首页', keepAlive: false },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home/home'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: 'sub',
        name: 'Sub',
        component: () => import('@/views/home/subpage'),
        meta: { title: '子页面', keepAlive: false }
      },
      {
        path: 'list',
        name: 'Test',
        component: () => import('@/views/home/test-list'),
        meta: { title: '测试列表', keepAlive: false }
      }
    ]
  },
  {
    path: '/alarm',
    name: 'alarm',
    component: () => import('@//views/alarm/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@//views/about/index.vue')
  },
  {
    path: '/voice',
    name: 'voice',
    component: () => import('@//views/voice/index.vue')
  }
]
