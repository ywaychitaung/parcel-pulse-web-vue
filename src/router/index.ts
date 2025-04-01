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
            path: '/admin/dashboard',
            name: 'adminDashboard',
            component: () => import('@/views/admin/DashboardView.vue'),
            meta: { requiresAuth: true, role: 'ADMIN' }
        },
        {
            path: '/courier/dashboard',
            name: 'courierDashboard',
            component: () => import('@/views/courier/DashboardView.vue'),
            meta: { requiresAuth: true, role: 'COURIER' }
        }
    ]
})

// Updated navigation guard
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const requiredRole = to.matched.find(record => record.meta.role)?.meta.role
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('userRole')

    if (requiresAuth && !token) {
        next('/login')
    } else if (requiredRole && userRole !== requiredRole) {
        next('/dashboard') // Redirect to default dashboard if role doesn't match
    } else {
        next()
    }
})

export default router
