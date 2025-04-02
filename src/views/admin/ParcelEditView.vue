<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
            <h1 class="text-2xl font-bold mb-6">
                {{ isEdit ? 'Edit' : 'Create' }} Parcel
            </h1>
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Sender Name</label
                        >
                        <input
                            v-model="parcelData.senderName"
                            type="text"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Sender Address</label
                        >
                        <input
                            v-model="parcelData.senderAddress"
                            type="text"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Receiver Name</label
                        >
                        <input
                            v-model="parcelData.receiverName"
                            type="text"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Receiver Address</label
                        >
                        <input
                            v-model="parcelData.receiverAddress"
                            type="text"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Weight (kg)</label
                        >
                        <input
                            v-model.number="parcelData.weight"
                            type="number"
                            step="0.01"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Status</label
                        >
                        <select
                            v-model="parcelData.status"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        >
                            <option value="PENDING">Pending</option>
                            <option value="IN_TRANSIT">In Transit</option>
                            <option value="DELIVERED">Delivered</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700"
                        >Description</label
                    >
                    <textarea
                        v-model="parcelData.description"
                        rows="3"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    ></textarea>
                </div>
                <div class="flex justify-end space-x-3">
                    <button
                        type="button"
                        @click="router.back()"
                        class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        {{ isEdit ? 'Update' : 'Create' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { parcelService } from '@/services/parcelService'
import type { Parcel } from '@/types/parcel'

const router = useRouter()
const route = useRoute()
const isEdit = route.params.id !== undefined

const parcelData = ref<Partial<Parcel>>({
    senderName: '',
    senderAddress: '',
    receiverName: '',
    receiverAddress: '',
    weight: 0,
    status: 'PENDING',
    description: ''
})

onMounted(async () => {
    if (isEdit && route.params.id) {
        try {
            const response = await parcelService.getParcel(
                Number(route.params.id)
            )
            parcelData.value = { ...response }
        } catch (error) {
            console.error('Failed to fetch parcel:', error)
            router.push('/admin/parcels')
        }
    }
})

const handleSubmit = async () => {
    try {
        if (isEdit && route.params.id) {
            await parcelService.updateParcel(
                Number(route.params.id),
                parcelData.value
            )
        } else {
            await parcelService.createParcel(parcelData.value)
        }
        // Redirect to parcel management page
        router.push('/admin/parcels')
    } catch (error) {
        console.error('Failed to save parcel:', error)
    }
}
</script>
