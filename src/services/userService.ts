import axios from '@/utils/axios'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/types/user'
import { USER_API } from '@/constants/api'

export const userService = {
    async getAllUsers(): Promise<User[]> {
        try {
            const auth = useAuthStore()
            if (!auth.token) {
                throw new Error('No authentication token found')
            }

            const response = await axios.get(USER_API.GET_ALL, {
                headers: { Authorization: `Bearer ${auth.token}` }
            })
            return response.data
        } catch (error: any) {
            if (error.response?.status === 401) {
                throw new Error('Unauthorized access. Please login again.')
            }
            throw new Error('Failed to fetch users')
        }
    }
}
