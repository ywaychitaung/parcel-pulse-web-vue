<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { parcelService } from '@/services/parcelService'
import type { Parcel } from '@/types/parcel'

const parcels = ref<Parcel[]>([])
const loading = ref(false)
const error = ref('')

// Load parcels
const loadParcels = async () => {
    try {
        loading.value = true
        parcels.value = await parcelService.getAllParcels()
    } catch (err: any) {
        error.value = err.message || 'Failed to load parcels'
    } finally {
        loading.value = false
    }
}

// Delete parcel
const deleteParcel = async (id: number) => {
    if (!confirm('Are you sure you want to delete this parcel?')) return

    try {
        await parcelService.deleteParcel(id)
        await loadParcels() // Refresh the list
    } catch (err: any) {
        error.value = err.message || 'Failed to delete parcel'
    }
}

onMounted(() => {
    loadParcels()
})
</script>

<template>
    <div class="p-6">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Parcel Management</h1>
            <router-link
                to="/admin/parcels/create"
                class="bg-[#0ea5e9] text-white px-4 py-2 rounded-md hover:bg-[#0284c7]"
            >
                <i class="bi bi-plus-lg mr-2"></i>Create Parcel
            </router-link>
        </div>

        <div v-if="error" class="bg-red-100 text-red-700 p-4 rounded-md mb-4">
            {{ error }}
        </div>

        <div class="bg-white rounded-lg shadow overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            ID
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Tracking Number
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
                            Status
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-if="loading">
                        <td colspan="5" class="px-6 py-4 text-center">
                            Loading...
                        </td>
                    </tr>
                    <tr v-else-if="parcels.length === 0">
                        <td colspan="5" class="px-6 py-4 text-center">
                            No parcels found
                        </td>
                    </tr>
                    <tr v-for="parcel in parcels" :key="parcel.id">
                        <td class="px-6 py-4">{{ parcel.id }}</td>
                        <td class="px-6 py-4">{{ parcel.trackingNumber }}</td>
                        <td class="px-6 py-4">{{ parcel.senderName }}</td>
                        <td class="px-6 py-4">{{ parcel.receiverName }}</td>
                        <td class="px-6 py-4">
                            <span
                                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                :class="{
                                    'bg-yellow-100 text-yellow-800':
                                        parcel.status === 'PENDING',
                                    'bg-blue-100 text-blue-800':
                                        parcel.status === 'IN_TRANSIT',
                                    'bg-green-100 text-green-800':
                                        parcel.status === 'DELIVERED'
                                }"
                            >
                                {{ parcel.status }}
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <router-link
                                :to="`/admin/parcels/${parcel.id}/edit`"
                                class="text-[#0ea5e9] hover:text-[#0284c7] mr-4"
                            >
                                <i class="bi bi-pencil"></i>
                            </router-link>
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
</template>
