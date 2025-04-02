<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { parcelService } from '@/services/parcelService'
import { userService } from '@/services/userService'
import type { Parcel } from '@/types/parcel'

const router = useRouter()
const parcels = ref<Parcel[]>([])
const loading = ref(true)
const showEditModal = ref(false)
const selectedParcel = ref<Parcel | null>(null)

const stats = ref({
    totalUsers: 0,
    totalParcels: 0,
    inTransit: 0,
    delivered: 0,
    pending: 0
})

// Add navigation method inside script block
const navigateToParcelManagement = () => {
    router.push('/admin/parcels')
}

// Edit parcel
const editParcel = (parcel: Parcel) => {
    selectedParcel.value = { ...parcel }
    showEditModal.value = true
}

// Delete parcel
const deleteParcel = async (id: number) => {
    if (!confirm('Are you sure you want to delete this parcel?')) return
    
    try {
        await parcelService.deleteParcel(id)
        parcels.value = parcels.value.filter(p => p.id !== id)
        stats.value.totalParcels--
    } catch (error) {
        console.error('Failed to delete parcel:', error)
    }
}

// Save edited parcel
const saveParcel = async () => {
    if (!selectedParcel.value) return
    
    try {
        await parcelService.updateParcel(selectedParcel.value.id, selectedParcel.value)
        const index = parcels.value.findIndex(p => p.id === selectedParcel.value?.id)
        if (index !== -1) {
            parcels.value[index] = selectedParcel.value
        }
        showEditModal.value = false
    } catch (error) {
        console.error('Failed to update parcel:', error)
    }
}

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
                        @click="navigateToParcelManagement"
                        class="bg-[#0ea5e9] text-white px-4 py-2 rounded-md hover:bg-[#0284c7]"
                    >
                        <i class="bi bi-plus-lg mr-2"></i>Parcel Management
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
                                        @click="editParcel(parcel)"
                                        class="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button
                                        @click="deleteParcel(parcel.id)"
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

<!-- Edit Modal -->
<div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
            <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Parcel</h3>
            <div class="mt-2 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        v-model="selectedParcel.status"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="PENDING">Pending</option>
                        <option value="IN_TRANSIT">In Transit</option>
                        <option value="DELIVERED">Delivered</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Sender Name</label>
                    <input
                        type="text"
                        v-model="selectedParcel.senderName"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Receiver Name</label>
                    <input
                        type="text"
                        v-model="selectedParcel.receiverName"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                </div>
            </div>
        </div>
        <div class="mt-4 flex justify-end space-x-3">
            <button
                @click="showEditModal = false"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
                Cancel
            </button>
            <button
                @click="saveParcel"
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Save
            </button>
        </div>
    </div>
</div>
