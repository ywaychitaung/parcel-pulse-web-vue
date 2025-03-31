<template>
    <div class="app-container min-h-screen bg-pattern">
        <!-- Navigation Header -->
        <header class="bg-white shadow-sm">
            <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <div class="flex-shrink-0 flex items-center">
                            <router-link
                                to="/"
                                class="text-[#0284c7] font-bold text-xl"
                            >
                                <i class="bi bi-box-seam mr-2"></i
                                ><span>Parcel Pulse</span>
                            </router-link>
                        </div>
                        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <router-link
                                to="/"
                                class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-[#0284c7] hover:border-[#0ea5e9]"
                                active-class="border-[#0ea5e9] text-[#0284c7]"
                            >
                                <i class="bi bi-house mr-1"></i
                                ><span>Home</span>
                            </router-link>
                            <router-link
                                to="/track"
                                class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-[#0284c7] hover:border-[#0ea5e9]"
                                active-class="border-[#0ea5e9] text-[#0284c7]"
                            >
                                <i class="bi bi-search mr-1"></i
                                ><span>Track</span>
                            </router-link>
                        </div>
                    </div>
                    <div class="hidden sm:ml-6 sm:flex sm:items-center">
                        <router-link
                            to="/login"
                            class="text-gray-700 hover:text-[#0284c7] px-3 py-2 rounded-md text-sm font-medium"
                        >
                            <i class="bi bi-box-arrow-in-right mr-1"></i
                            ><span>Login</span>
                        </router-link>
                        <router-link
                            to="/register"
                            class="ml-4 px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-[#0284c7] hover:bg-[#0369a1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0ea5e9]"
                        >
                            <i class="bi bi-person-plus mr-1"></i>Register
                        </router-link>
                    </div>
                </div>
            </nav>
        </header>

        <!-- Main Content -->
        <main>
            <slot></slot>
        </main>

        <!-- Footer -->
        <footer class="bg-white border-t border-gray-200 py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p class="text-center text-gray-500 text-sm">
                    Copyrights <i class="bi bi-c-circle mr-1"></i
                    >{{ currentYear }}
                    <i class="bi bi-box-seam mx-1"></i> Parcel Pulse. All rights
                    reserved.
                </p>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
// Default layout component
const currentYear = new Date().getFullYear()
</script>

<style scoped>
/* Layout specific styles */
.mr-1 {
    margin-right: 0.25rem;
}
.mr-2 {
    margin-right: 0.5rem;
}
</style>
