<script setup lang="ts">
import { ref } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { parcelService } from '@/services/parcelService'
import type { Parcel } from '@/types/parcel'

const trackingNumber = ref('')
const parcel = ref<Parcel | null>(null)
const loading = ref(false)
const error = ref('')

const trackParcel = async () => {
    if (!trackingNumber.value) {
        error.value = 'Please enter a tracking number'
        return
    }

    try {
        loading.value = true
        error.value = ''
        parcel.value = await parcelService.trackParcel(trackingNumber.value)
    } catch (err: any) {
        error.value = err.message || 'Failed to track parcel'
        // Clear parcel data on error
        parcel.value = null
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <AuthLayout>
        <div class="tracking-page p-6">
            <h1 class="text-2xl font-bold mb-4 text-dark">Track Your Parcel</h1>
            <div class="tracking-form max-w-2xl mx-auto">
                <div class="mb-6">
                    <label
                        for="tracking-number"
                        class="block text-sm font-medium text-gray-700 mb-2"
                    >
                        <i class="bi bi-upc-scan mr-2 text-[#0ea5e9]"></i
                        >Tracking Number
                    </label>
                    <input
                        type="text"
                        id="tracking-number"
                        v-model="trackingNumber"
                        class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                        placeholder="Enter your tracking number"
                    />
                    <p class="mt-2 text-xs text-gray-500">
                        <i class="bi bi-info-circle mr-1"></i>
                        Enter the tracking number provided in your shipping
                        confirmation.
                    </p>
                </div>
                <button
                    @click="trackParcel"
                    class="w-full bg-[#0284c7] text-white py-3 px-4 rounded-md hover:bg-[#0369a1] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
                >
                    <i class="bi bi-search mr-2"></i>Track Parcel
                </button>

                <div
                    v-if="error"
                    class="mt-4 p-4 bg-red-100 text-red-700 rounded-md"
                >
                    {{ error }}
                </div>

                <div v-if="loading" class="mt-4 text-center">
                    <div
                        class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0ea5e9] mx-auto"
                    ></div>
                </div>

                <div v-if="parcel" class="mt-6 bg-white p-6 rounded-lg shadow">
                    <h2 class="text-xl font-semibold mb-4">Tracking Details</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm text-gray-600">Tracking Number</p>
                            <p class="font-medium">
                                {{ parcel.trackingNumber }}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Status</p>
                            <p class="font-medium">{{ parcel.status }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Sender</p>
                            <p class="font-medium">{{ parcel.senderName }}</p>
                            <p class="text-sm text-gray-500">
                                {{ parcel.senderAddress }}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Receiver</p>
                            <p class="font-medium">{{ parcel.receiverName }}</p>
                            <p class="text-sm text-gray-500">
                                {{ parcel.receiverAddress }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthLayout>
</template>
