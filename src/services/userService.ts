import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/types/user'
import { USER_API } from '@/constants/api'

export const userService = {
    async getAllUsers(): Promise<User[]> {
        const auth = useAuthStore()
        const response = await axios.get(USER_API.GET_ALL, {
            headers: { Authorization: `Bearer ${auth.token}` }
        })
        return response.data
    }
}
