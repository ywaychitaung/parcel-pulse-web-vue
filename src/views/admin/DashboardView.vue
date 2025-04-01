<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { parcelService } from '@/services/parcelService'
import { userService } from '@/services/userService'
import type { Parcel } from '@/types/parcel'

const parcels = ref<Parcel[]>([])
const loading = ref(true)

const stats = ref({
    totalUsers: 0,
    totalParcels: 0,
    inTransit: 0,
    delivered: 0,
    pending: 0
})

onMounted(async () => {
    try {
        const [parcelsData, usersData] = await Promise.all([
            parcelService.getAllParcels(),
            userService.getAllUsers()
        ])

        parcels.value = parcelsData
        stats.value = {
            totalUsers: usersData.length,
            totalParcels: parcelsData.length,
            inTransit: parcelsData.filter(
                (p: Parcel) => p.status === 'IN_TRANSIT'
            ).length,
            delivered: parcelsData.filter(
                (p: Parcel) => p.status === 'DELIVERED'
            ).length,
            pending: parcelsData.filter((p: Parcel) => p.status === 'PENDING')
                .length
        }
    } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <div class="p-6">
            <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold">Total Users</h2>
                        <i class="bi bi-people text-2xl text-[#0ea5e9]"></i>
                    </div>
                    <p class="text-3xl font-bold mt-2">
                        {{ stats.totalUsers }}
                    </p>
                </div>

                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold">Total Parcels</h2>
                        <i class="bi bi-box-seam text-2xl text-[#0ea5e9]"></i>
                    </div>
                    <p class="text-3xl font-bold mt-2">
                        {{ stats.totalParcels }}
                    </p>
                </div>

                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold">Pending</h2>
                        <i class="bi bi-hourglass text-2xl text-[#0ea5e9]"></i>
                    </div>
                    <p class="text-3xl font-bold mt-2">{{ stats.pending }}</p>
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

            <!-- Parcels Table -->
            <div class="mt-8">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-semibold">Recent Parcels</h2>
                    <button
                        class="bg-[#0ea5e9] text-white px-4 py-2 rounded-md hover:bg-[#0284c7]"
                    >
                        <i class="bi bi-plus-lg mr-2"></i>Add New Parcel
                    </button>
                </div>

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
                                    Sender
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
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Actions
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
                                    {{ parcel.senderName }}
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
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <button
                                        class="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button
                                        class="text-red-600 hover:text-red-900"
                                    >
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
