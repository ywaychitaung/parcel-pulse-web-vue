import axios from '@/utils/axios'
import { useAuthStore } from '@/stores/auth'
import type { Parcel } from '@/types/parcel'
import { PARCEL_API } from '@/constants/api'

export const parcelService = {
    async trackParcel(trackingNumber: string) {
        try {
            const response = await axios.get(PARCEL_API.TRACK(trackingNumber))
            return response.data
        } catch (error) {
            throw new Error('Failed to track parcel')
        }
    },

    async getUserParcels(): Promise<Parcel[]> {
        const auth = useAuthStore()
        const response = await axios.get(PARCEL_API.GET_USER_PARCELS, {
            headers: { Authorization: `Bearer ${auth.token}` }
        })
        return response.data
    },

    async getAllParcels(): Promise<Parcel[]> {
        const auth = useAuthStore()
        const response = await axios.get(PARCEL_API.GET_ALL, {
            headers: { Authorization: `Bearer ${auth.token}` }
        })
        return response.data
    },

    async createParcel(parcelData: Partial<Parcel>): Promise<Parcel> {
        const auth = useAuthStore()
        const response = await axios.post(PARCEL_API.CREATE, parcelData, {
            headers: { Authorization: `Bearer ${auth.token}` }
        })
        return response.data
    },

    async updateParcel(
        id: number,
        parcelData: Partial<Parcel>
    ): Promise<Parcel> {
        const auth = useAuthStore()
        const response = await axios.put(PARCEL_API.UPDATE(id), parcelData, {
            headers: { Authorization: `Bearer ${auth.token}` }
        })
        return response.data
    },

    async deleteParcel(id: number): Promise<void> {
        const auth = useAuthStore()
        await axios.delete(PARCEL_API.DELETE(id), {
            headers: { Authorization: `Bearer ${auth.token}` }
        })
    },

    async searchParcels(params: {
        status?: string
        startDate?: string
        endDate?: string
    }): Promise<Parcel[]> {
        const auth = useAuthStore()
        const response = await axios.get(PARCEL_API.SEARCH, {
            params,
            headers: { Authorization: `Bearer ${auth.token}` }
        })
        return response.data
    }
}
