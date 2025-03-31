<template>
    <AuthLayout>
        <div class="login-page p-6">
            <h1 class="text-2xl font-bold mb-4 text-dark">Login</h1>
            <div class="login-form">
                <div class="mb-4">
                    <label
                        for="username"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        <i class="bi bi-person-fill mr-2 text-[#0ea5e9]"></i
                        >Username or Email
                    </label>
                    <input
                        type="text"
                        id="username"
                        v-model="usernameOrEmail"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                        placeholder="Enter your username or email"
                    />
                </div>
                <div class="mb-6">
                    <label
                        for="password"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        <i class="bi bi-lock-fill mr-2 text-[#0ea5e9]"></i
                        >Password
                    </label>
                    <div class="relative">
                        <input
                            :type="showPassword ? 'text' : 'password'"
                            id="password"
                            v-model="password"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center"
                            @click="togglePassword"
                        >
                            <i
                                :class="[
                                    'bi',
                                    showPassword ? 'bi-eye-slash' : 'bi-eye',
                                    'text-gray-500 hover:text-[#0ea5e9] transition-colors'
                                ]"
                            ></i>
                        </button>
                    </div>
                </div>
                <button
                    @click="login"
                    class="w-full bg-[#0ea5e9] text-white py-3 px-4 rounded-md hover:bg-[#0284c7] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
                >
                    <i class="bi bi-box-arrow-in-right mr-2"></i>Login
                </button>
                <div class="mt-4 text-center">
                    <router-link
                        to="/register"
                        class="text-[#0ea5e9] hover:text-[#0284c7] flex items-center justify-center"
                    >
                        <i class="bi bi-person-plus mr-2 text-[#0ea5e9]"></i>
                        Don't have an account? Register
                    </router-link>
                </div>
            </div>
        </div>
    </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const usernameOrEmail = ref('')
const password = ref('')
const showPassword = ref(false)

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const login = () => {
    // Implement login logic here
    console.log('Logging in with:', usernameOrEmail.value, password.value)
}
</script>
