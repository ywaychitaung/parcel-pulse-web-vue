<template>
    <div class="min-h-screen bg-gray-100">
        <div class="p-6">
            <h1 class="text-2xl font-bold mb-6">Courier Dashboard</h1>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold">Assigned Deliveries</h2>
                        <i class="bi bi-box-seam text-2xl text-[#0ea5e9]"></i>
                    </div>
                    <p class="text-3xl font-bold mt-2">0</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold">Completed Today</h2>
                        <i class="bi bi-check2-circle text-2xl text-[#0ea5e9]"></i>
                    </div>
                    <p class="text-3xl font-bold mt-2">0</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold">Pending Pickups</h2>
                        <i class="bi bi-hourglass text-2xl text-[#0ea5e9]"></i>
                    </div>
                    <p class="text-3xl font-bold mt-2">0</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Courier dashboard logic will be implemented here
</script>