<template>
    <DefaultLayout>
        <div class="min-h-screen bg-gradient-primary">
            <!-- Hero Section -->
            <div class="bg-[#0369a1]">
                <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div class="text-center">
                        <h1
                            class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-contrast"
                        >
                            <i class="bi bi-box-seam mr-4"> </i
                            ><span>Parcel Pulse</span>
                        </h1>
                        <p
                            class="mt-3 max-w-md mx-auto text-base text-[#e0f2fe] sm:text-lg md:mt-5 md:text-xl"
                        >
                            The modern solution for parcel tracking and delivery
                            management
                        </p>

                        <div
                            class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
                        >
                            <div class="rounded-md shadow">
                                <router-link
                                    to="/track"
                                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#0284c7] bg-white hover:bg-gray-50 hover:text-[#0ea5e9] transition-colors duration-200 md:py-4 md:text-lg md:px-10"
                                >
                                    <i
                                        class="bi bi-search mr-2 text-[#0ea5e9]"
                                    ></i
                                    ><span>Track Parcel</span>
                                </router-link>
                            </div>
                            <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                <router-link
                                    to="/register"
                                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#0369a1] hover:bg-[#075985] md:py-4 md:text-lg md:px-10"
                                >
                                    <i class="bi bi-person-plus mr-2"></i
                                    ><span>Register</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Features Section -->
            <div class="py-16 bg-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center">
                        <h2
                            class="text-base text-[#0284c7] font-semibold tracking-wide uppercase"
                        >
                            <i class="bi bi-stars mr-2 text-yellow-400"></i
                            >FEATURES
                        </h2>
                        <p
                            class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                        >
                            Everything you need for parcel tracking
                        </p>
                        <p class="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            Our comprehensive courier service platform offers a
                            range of features to make shipping and tracking
                            easy.
                        </p>
                    </div>

                    <div class="mt-12">
                        <div
                            class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12"
                        >
                            <FeatureCard
                                v-for="feature in features"
                                :key="feature.title"
                                :icon="feature.icon"
                                :icon-color="feature.iconColor"
                                :title="feature.title"
                                :description="feature.description"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- CTA Section -->
            <div class="bg-[#075985]">
                <div
                    class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8"
                >
                    <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
                        <span class="block">Ready to get started?</span>
                        <span class="block">Create an account today.</span>
                    </h2>
                    <p class="mt-4 text-lg leading-6 text-[#e0f2fe]">
                        Join thousands of users who trust ParcelPulse for their
                        shipping needs.
                    </p>
                    <router-link
                        to="/register"
                        class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#0284c7] bg-white hover:bg-[#f0f9ff] sm:w-auto"
                    >
                        <i class="bi bi-person-plus mr-2"></i
                        ><span>Register for free</span>
                    </router-link>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
// Home view component
import { ref } from 'vue'
import FeatureCard from '@/components/FeatureCard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const features = ref([
    {
        icon: 'bi-clock-history',
        iconColor: 'text-sky-600',
        title: 'Real-time Tracking',
        description:
            'Track your parcels with real-time status updates and notifications.'
    },
    {
        icon: 'bi-calendar-check',
        iconColor: 'text-teal-600',
        title: 'Schedule Pickups',
        description:
            'Schedule parcel pickups and deliveries at your convenience.'
    },
    {
        icon: 'bi-graph-up-arrow',
        iconColor: 'text-purple-600',
        title: 'Shipment Analytics',
        description:
            'View your shipment history and analytics to optimize your shipping.'
    },
    {
        icon: 'bi-sliders',
        iconColor: 'text-gray-600',
        title: 'Delivery Preferences',
        description: 'Set your delivery preferences and special instructions.'
    }
])
</script>
