<template>
    <div
        class="auth-container min-h-screen bg-pattern flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="text-center text-3xl font-extrabold text-dark">
                <router-link to="/" class="text-primary">
                    <i class="bi bi-box-seam mr-4"></i><span>Parcel Pulse</span>
                </router-link>
            </h2>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-8">
            <div class="card">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Auth layout component
</script>

<style scoped>
/* Auth layout specific styles */
</style>
