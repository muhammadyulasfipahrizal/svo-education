import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/admin/live',
      name: 'live',
      component: () => import('../views/AdminLiveView.vue')
    },
    {
      path: '/admin/event',
      name: 'admin-event',
      component: () => import('../views/Admin/AdminEvent/AdminEvent.vue')
    },
    {
      path: '/admin/event-detail/:id',
      name: 'admin-event-detail',
      component: () => import('../views/Admin/AdminEvent/AdminEventDetail/AdminEventDetail.vue')
    }
  ]
})

export default router
