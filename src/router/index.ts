import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/track',
            name: 'track',
            component: () => import('@/views/TrackingView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/RegisterView.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/views/DashboardView.vue'),
            meta: { requiresAuth: true }
        }
    ]
})

// Navigation guard for protected routes
router.beforeEach((to, _from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const isAuthenticated = localStorage.getItem('token')

    if (requiresAuth && !isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router
