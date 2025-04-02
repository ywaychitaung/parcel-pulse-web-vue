import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
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
        path: '/admin/parcels',
        name: 'admin-parcels',
        component: () => import('@/views/admin/ParcelManagementView.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/parcels/create',
        name: 'admin-parcels-create',
        component: () => import('@/views/admin/ParcelEditView.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/parcels/:id/edit',
        name: 'admin-parcels-edit',
        component: () => import('@/views/admin/ParcelEditView.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/courier/dashboard',
        name: 'courierDashboard',
        component: () => import('@/views/courier/DashboardView.vue'),
        meta: { requiresAuth: true, role: 'COURIER' }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// Updated navigation guard to fix the TypeScript error
router.beforeEach((to, _from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const requiredRole = to.matched.find((record) => record.meta.role)?.meta
        .role
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('userRole')

    if (requiresAuth && !token) {
        next('/login')
    } else if (requiredRole && userRole !== requiredRole) {
        next('/dashboard')
    } else {
        next()
    }
})

export default router
