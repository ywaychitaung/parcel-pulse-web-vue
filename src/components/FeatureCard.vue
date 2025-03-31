<template>
    <div
        class="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex"
    >
        <div class="flex-shrink-0">
            <div
                class="flex items-center justify-center h-16 w-16 rounded-full bg-primary-500 text-white shadow-lg"
            >
                <i :class="['bi', icon, 'text-2xl', iconColor]"></i>
            </div>
        </div>
        <div class="ml-6">
            <h3 class="text-xl leading-6 font-bold text-gray-900">
                {{ title }}
            </h3>
            <p class="mt-2 text-base text-gray-600">
                {{ description }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    icon: {
        type: String,
        required: true
    },
    iconColor: {
        type: String,
        default: 'text-white'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})
</script>
