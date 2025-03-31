<template>
    <AuthLayout>
        <div class="tracking-page p-6">
            <h1 class="text-2xl font-bold mb-4 text-dark">Track Your Parcel</h1>
            <div class="tracking-form">
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
            </div>
        </div>
    </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const trackingNumber = ref('')

const trackParcel = () => {
    // Implement tracking logic here
    console.log('Tracking parcel with number:', trackingNumber.value)
}
</script>
