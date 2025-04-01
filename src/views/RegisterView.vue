<template>
    <AuthLayout>
        <div class="p-6">
            <h1 class="text-2xl font-bold mb-4 text-dark">Register</h1>
            <div class="register-form">
                <div class="mb-4">
                    <label
                        for="name"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        <i class="bi bi-person-fill mr-2 text-[#0ea5e9]"></i
                        >Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        v-model="name"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                        placeholder="Enter your full name"
                    />
                </div>
                <div class="mb-4">
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        <i class="bi bi-envelope-fill mr-2 text-[#0ea5e9]"></i
                        >Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                        placeholder="Enter your email"
                    />
                </div>
                <div class="mb-4">
                    <label
                        for="username"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        <i class="bi bi-person-circle mr-2 text-[#0ea5e9]"></i
                        >Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        v-model="username"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                        placeholder="Choose a username"
                    />
                </div>
                <div class="mb-4">
                    <label
                        for="role"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        <i class="bi bi-person-badge mr-2 text-[#0ea5e9]"></i
                        >Register as
                    </label>
                    <select
                        id="role"
                        v-model="roleId"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                    >
                        <option value="1">User</option>
                        <option value="3">Courier</option>
                    </select>
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
                            placeholder="Create a password"
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
                    <p class="mt-1 text-xs text-gray-500">
                        Password must be at least 6 characters
                    </p>
                </div>
                <button
                    @click="register"
                    class="w-full bg-[#0ea5e9] text-white py-3 px-4 rounded-md hover:bg-[#0284c7] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
                >
                    <i class="bi bi-person-plus mr-2"></i>Register
                </button>
                <div class="mt-4 text-center">
                    <router-link
                        to="/login"
                        class="text-[#0ea5e9] hover:text-[#0284c7] flex items-center justify-center"
                    >
                        <i
                            class="bi bi-box-arrow-in-right mr-2 text-[#0ea5e9]"
                        ></i
                        >Already have an account? Login
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

const router = useRouter()
const name = ref('')
const email = ref('')
const username = ref('')
const password = ref('')
const roleId = ref('1')
const showPassword = ref(false)
const error = ref('')

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const register = async () => {
    try {
        const response = await fetch(AUTH_API.REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                username: username.value,
                email: email.value,
                password: password.value,
                roleId: parseInt(roleId.value)
            })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed')
        }

        // Store the token and role
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('userRole', data.role)

        // Redirect based on role
        if (data.role === 'COURIER') {
            router.push('/courier/dashboard')
        } else {
            router.push('/dashboard')
        }
    } catch (err: any) {
        error.value = err.message || 'Registration failed'
    }
}
</script>
