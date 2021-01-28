import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    children: [
      {
        path: 'home',
        component: () => import('@/myviews/home/index'),
        name: 'home',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/changePassWord',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/myviews/changePassWord/index'),
        name: 'changePassWord',
        meta: { title: '修改密码' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/promotionCenter',
    component: Layout,
    name: 'promotionCenter',
    meta: { title: '推广中心', icon: 'promotionCenter' },
    redirect: '/promotionCenter/startToPromote',
    children: [
      {
        path: 'startToPromote',
        component: () => import('@/myviews/promotionCenter/startToPromote/index'),
        name: 'startToPromote',
        meta: { title: '开始推广' }
      },
      {
        path: 'promotionData',
        component: () => import('@/myviews/promotionCenter/promotionData/index'),
        name: 'promotionData',
        redirect: '/promotionCenter/promotionData/currentPromotionData',
        meta: { title: '推广数据' },
        children: [
          {
            path: 'currentPromotionData',
            component: () => import('@/myviews/promotionCenter/promotionData/currentPromotionData/index'),
            name: 'currentPromotionData',
            meta: { title: '当前推广数据' }
          },
          {
            path: 'subUserPromotionData',
            component: () => import('@/myviews/promotionCenter/promotionData/subUserPromotionData/index'),
            name: 'subUserPromotionData',
            meta: { title: '子用户推广数据' }
          },
          {
            path: 'totalData',
            component: () => import('@/myviews/promotionCenter/promotionData/totalData/index'),
            name: 'totalData',
            meta: { title: '数据合计' }
          }
        ]
      }
    ]
  },
  {
    path: '/finance',
    component: Layout,
    name: 'finance',
    meta: { title: '财务中心', icon: 'finance' },
    redirect: '/finance/currentUserSettlement',
    children: [
      {
        path: 'currentUserSettlement',
        component: () => import('@/myviews/finance/currentUserSettlement/index'),
        name: 'currentUserSettlement',
        meta: { title: '当前用户结算' }
      },
      {
        path: 'subUserSettlement',
        component: () => import('@/myviews/finance/subUserSettlement/index'),
        name: 'subUserSettlement',
        meta: { title: '子用户结算' }
      },
      {
        path: 'financeTotalData',
        component: () => import('@/myviews/finance/financeTotalData/index'),
        name: 'financeTotalData',
        meta: { title: '财务合计结算' }
      }
    ]
  },
  {
    path: '/subUserManage',
    component: Layout,
    name: 'subUserManage',
    redirect: '/subUserManage/subUserList',
    meta: { title: '子用户管理', icon: 'user' },
    children: [
      {
        path: 'subUserList',
        component: () => import('@/myviews/subUserManage/subUserList/index'),
        name: 'subUserList',
        meta: { title: '子用户列表' }
      },
      {
        path: 'addSubUser',
        component: () => import('@/myviews/subUserManage/addSubUser/index'),
        name: 'addSubUser',
        meta: { title: '新增子用户' }
      }
    ]
  },
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
