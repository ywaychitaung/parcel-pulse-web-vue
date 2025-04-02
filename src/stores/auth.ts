import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        userRole: localStorage.getItem('userRole') || ''
    }),

    actions: {
        setAuth(token: string, role: string) {
            this.token = token
            this.userRole = role
            localStorage.setItem('token', token)
            localStorage.setItem('userRole', role)
        },

        clearAuth() {
            this.token = ''
            this.userRole = ''
            localStorage.removeItem('token')
            localStorage.removeItem('userRole')
        }
    }
})
