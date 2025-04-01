import { defineStore } from 'pinia'

interface AuthState {
  token: string | null
  user: any | null
  role: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    role: localStorage.getItem('role')
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.role
  },

  actions: {
    setAuth(token: string, role: string) {
      this.token = token
      this.role = role
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
    },

    setUser(user: any) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },

    clearAuth() {
      this.token = null
      this.user = null
      this.role = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('role')
    }
  }
})