import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const auth = useAuthStore()
            auth.clearAuth()
            router.push('/login')
        }
        return Promise.reject(error)
    }
)

export default axios
