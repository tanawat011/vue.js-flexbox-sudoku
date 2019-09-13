import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/',
      component: () => import('./containers/Default'),
      children: [
        { path: '/', name: 'Home', component: () => import('./views/Home') },
        { path: '/sudoku', name: 'Sudoku', component: () => import('./views/Sudoku') }
      ]
    }
  ]
})

export default router
