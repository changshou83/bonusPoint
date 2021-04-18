import Vue from 'vue'
import VueRouter from 'vue-router'
import adIndex from '../views/admin/adIndex.vue'
import Student from '../views/student/student.vue'
import login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  {
    path: '/adIndex',
    component: adIndex,
  },
  {
    path: '/student',
    component: Student,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
