<template>
    <div class="dashboard-page">
        <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-lg font-semibold mb-2">Recent Shipments</h2>
                <p class="text-gray-600">View your recent shipment activity</p>
                <button class="mt-4 text-primary-600 hover:text-primary-800">
                    View All
                </button>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-lg font-semibold mb-2">Schedule Pickup</h2>
                <p class="text-gray-600">Schedule a new parcel pickup</p>
                <button class="mt-4 text-primary-600 hover:text-primary-800">
                    Schedule Now
                </button>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-lg font-semibold mb-2">Delivery Preferences</h2>
                <p class="text-gray-600">Update your delivery preferences</p>
                <button class="mt-4 text-primary-600 hover:text-primary-800">
                    Update
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Dashboard component logic
</script>
