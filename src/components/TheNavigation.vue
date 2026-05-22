<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';

const route = useRoute();
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);

const isHomePage = computed(() => route.path === '/');
const useTransparentStyle = computed(() => isHomePage.value && !isScrolled.value);

const navLinks = [
  { to: '/', label: 'Home', icon: 'fa6-solid:stethoscope' },
  { to: '/referral', label: 'Referral', icon: 'fa6-solid:user-doctor' },
  { to: '/careers', label: 'Careers', icon: 'fa6-solid:user-doctor' },
  { to: '/telemedicine', label: 'Telemedicine', icon: 'fa6-solid:video' },
  { to: '/blog', label: 'Blog', icon: 'fa6-solid:blog' },
  { to: '/donate', label: 'Donate', icon: 'fa6-solid:stethoscope', isDonate: true },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <nav
    aria-label="Main navigation"
    :class="[
      'fixed w-full top-0 z-50 transition-all duration-300',
      useTransparentStyle ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-lg',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-18 py-3">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-3 group">
          <div class="flex items-center transition-transform duration-200 hover:scale-105">
            <img src="/images/SDI_Logo_mini.png" alt="SDI Logo" class="h-10 w-auto mr-3" />
            <div class="hidden sm:block">
              <span
                :class="[
                  'text-xl font-bold font-display tracking-tight transition-colors duration-300',
                  useTransparentStyle ? 'text-white' : 'text-tertiary',
                ]"
              >
                Specialist Doctors
              </span>
              <span
                :class="[
                  'block text-xs font-body -mt-1 transition-colors duration-300',
                  useTransparentStyle ? 'text-white/80' : 'text-gray-500',
                ]"
              >
                International
              </span>
            </div>
            <span
              :class="[
                'sm:hidden text-xl font-bold font-display transition-colors duration-300',
                useTransparentStyle ? 'text-white' : 'text-tertiary',
              ]"
            >
              SDI
            </span>
          </div>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <template v-for="link in navLinks" :key="link.to">
            <RouterLink
              v-if="link.isDonate"
              :to="link.to"
              :aria-current="route.path === link.to ? 'page' : undefined"
              class="ml-2 btn-secondary text-sm py-2 px-5"
            >
              Donate
            </RouterLink>
            <RouterLink
              v-else
              :to="link.to"
              :aria-current="route.path === link.to ? 'page' : undefined"
              :class="[
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                useTransparentStyle
                  ? route.path === link.to
                    ? 'text-white bg-white/20'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                  : route.path === link.to
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5',
              ]"
            >
              <Icon :icon="link.icon" class="h-4 w-4" />
              <span>{{ link.label }}</span>
            </RouterLink>
          </template>
          <RouterLink
            to="/referral"
            aria-label="Book an appointment at Specialist Doctors International"
            class="ml-4 btn-primary text-sm py-2 px-5"
          >
            Book Appointment
          </RouterLink>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            :class="[
              'p-2 rounded-lg transition-colors duration-300',
              useTransparentStyle ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100',
            ]"
            aria-label="Toggle menu"
          >
            <Icon :icon="isMobileMenuOpen ? 'fa6-solid:xmark' : 'fa6-solid:bars'" class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-t border-gray-100 overflow-hidden">
        <div class="px-4 py-4 space-y-2">
          <template v-for="link in navLinks" :key="link.to">
            <RouterLink
              v-if="link.isDonate"
              :to="link.to"
              @click="isMobileMenuOpen = false"
              :aria-current="route.path === link.to ? 'page' : undefined"
              class="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-base font-medium btn-secondary"
            >
              <span>Donate</span>
            </RouterLink>
            <RouterLink
              v-else
              :to="link.to"
              @click="isMobileMenuOpen = false"
              :aria-current="route.path === link.to ? 'page' : undefined"
              :class="[
                'flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium font-body transition-all duration-200',
                route.path === link.to
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-tertiary',
              ]"
            >
              <Icon :icon="link.icon" class="h-5 w-5" />
              <span>{{ link.label }}</span>
            </RouterLink>
          </template>
          <RouterLink
            to="/referral"
            @click="isMobileMenuOpen = false"
            aria-label="Book an appointment at Specialist Doctors International"
            class="block w-full btn-primary text-center mt-4"
          >
            Book Appointment
          </RouterLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, max-height 0.2s ease;
  max-height: 500px;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
