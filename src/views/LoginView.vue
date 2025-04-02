<template>
    <AuthLayout>
        <div class="login-page p-6">
            <h1 class="text-2xl font-bold mb-4 text-dark">Login</h1>
            <!-- Add error message display -->
            <div v-if="error" class="mb-4 text-red-500 text-sm text-center">
                {{ error }}
            </div>
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
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { AUTH_API } from '@/constants/api'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const usernameOrEmail = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const auth = useAuthStore()

const login = async () => {
    try {
        const response = await fetch(AUTH_API.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usernameOrEmail: usernameOrEmail.value,
                password: password.value
            })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Login failed')
        }

        // Use auth store to set token and role
        auth.setAuth(data.accessToken, data.role)

        // Redirect based on role
        if (data.role === 'ADMIN') {
            router.push('/admin/dashboard')
        } else if (data.role === 'COURIER') {
            router.push('/courier/dashboard')
        } else {
            router.push('/dashboard')
        }
    } catch (err: any) {
        error.value = err.message || 'Login failed'
    }
}
</script>
