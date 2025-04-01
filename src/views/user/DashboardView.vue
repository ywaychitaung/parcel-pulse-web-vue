<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { parcelService } from '@/services/parcelService'
import type { Parcel } from '@/types/parcel'

const parcels = ref<Parcel[]>([])
const loading = ref(true)

const stats = ref({
    total: 0,
    inTransit: 0,
    delivered: 0
})

onMounted(async () => {
    try {
        const data = await parcelService.getUserParcels()
        parcels.value = data
        stats.value = {
            total: data.length,
            inTransit: data.filter((p: Parcel) => p.status === 'IN_TRANSIT').length,
            delivered: data.filter((p: Parcel) => p.status === 'DELIVERED').length
        }
    } catch (error) {
        console.error('Failed to fetch parcels:', error)
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <div class="p-6">
            <h1 class="text-2xl font-bold mb-6">User Dashboard</h1>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold">My Parcels</h2>
                        <i class="bi bi-box-seam text-2xl text-[#0ea5e9]"></i>
                    </div>
                    <p class="text-3xl font-bold mt-2">{{ stats.total }}</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold">In Transit</h2>
                        <i class="bi bi-truck text-2xl text-[#0ea5e9]"></i>
                    </div>
                    <p class="text-3xl font-bold mt-2">{{ stats.inTransit }}</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold">Delivered</h2>
                        <i
                            class="bi bi-check2-circle text-2xl text-[#0ea5e9]"
                        ></i>
                    </div>
                    <p class="text-3xl font-bold mt-2">{{ stats.delivered }}</p>
                </div>
            </div>

            <div class="mt-8">
                <h2 class="text-xl font-semibold mb-4">Recent Parcels</h2>
                <div class="bg-white rounded-lg shadow overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Tracking Number
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Receiver
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Created At
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="parcel in parcels" :key="parcel.id">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{ parcel.trackingNumber }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        :class="{
                                            'px-2 py-1 text-xs rounded-full': true,
                                            'bg-blue-100 text-blue-800':
                                                parcel.status === 'IN_TRANSIT',
                                            'bg-green-100 text-green-800':
                                                parcel.status === 'DELIVERED',
                                            'bg-yellow-100 text-yellow-800':
                                                parcel.status === 'PENDING'
                                        }"
                                    >
                                        {{ parcel.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{ parcel.receiverName }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{
                                        new Date(
                                            parcel.createdAt
                                        ).toLocaleDateString()
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
