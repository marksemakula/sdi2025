<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';
</script>

<template>
  <footer class="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <!-- Company Info -->
        <div class="space-y-4">
          <div class="flex items-center space-x-5">
            <div class="flex-shrink-0">
              <img src="/images/SDI_LogoF.png" alt="SDI Logo" class="h-32 w-auto" />
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-2xl leading-tight">Specialist Doctors</span>
              <span class="text-base text-gray-300 font-normal">International</span>
            </div>
          </div>
          <p class="text-gray-300 text-sm leading-relaxed mt-2">
            Providing world-class medical care through our network of experienced specialists.
          </p>
          <div class="flex flex-wrap gap-3 mt-4">
            <a v-for="social in socials" :key="social.label"
              :href="social.href"
              :target="social.href !== '#' ? '_blank' : undefined"
              :rel="social.href !== '#' ? 'noopener noreferrer' : undefined"
              :aria-label="social.label"
              class="text-gray-300 hover:text-primary transition-colors duration-300 hover:scale-110 inline-block"
            >
              <Icon :icon="social.icon" :width="18" />
            </a>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="space-y-4">
          <h3 class="font-semibold text-lg">Contact Info</h3>
          <div class="space-y-3">
            <div class="flex items-center space-x-3">
              <Icon icon="fa6-solid:phone" class="text-primary" :width="16" />
              <span class="text-gray-300 text-sm">+256 702 652 046 | +256 784 004 979</span>
            </div>
            <div class="flex items-center space-x-3">
              <Icon icon="fa6-solid:envelope" class="text-primary" :width="16" />
              <span class="text-gray-300 text-sm">service@specialistdoctors-international.org</span>
            </div>
            <div class="flex items-start space-x-3">
              <Icon icon="fa6-solid:location-dot" class="text-primary mt-1" :width="16" />
              <span class="text-gray-300 text-sm">Nizam Rd. - Jinja, Uganda</span>
            </div>
          </div>
        </div>

        <!-- Get the App -->
        <div class="space-y-4">
          <h3 class="font-semibold text-lg">Get the App</h3>
          <p class="text-gray-300 text-sm">
            Access telemedicine services anytime, anywhere with our mobile app.
          </p>
          <div class="space-y-3">
            <a href="#"
              class="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300 hover:scale-105 inline-flex"
            >
              <Icon icon="fa6-brands:apple" class="text-white" :width="20" />
              <div>
                <div class="text-xs text-gray-300">Download on the</div>
                <div class="text-sm font-medium">App Store</div>
              </div>
            </a>
            <a href="#"
              class="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300 hover:scale-105 inline-flex"
            >
              <Icon icon="fa6-brands:google-play" class="text-white" :width="20" />
              <div>
                <div class="text-xs text-gray-300">Get it on</div>
                <div class="text-sm font-medium">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-300 text-sm">
          © {{ new Date().getFullYear() }} Specialist Doctors International. All rights reserved.
        </p>
        <div class="flex items-center space-x-6 mt-4 md:mt-0">
          <RouterLink to="#" class="text-gray-300 hover:text-primary transition-colors duration-300 text-sm">
            Privacy Policy
          </RouterLink>
          <RouterLink to="#" class="text-gray-300 hover:text-primary transition-colors duration-300 text-sm">
            Terms of Service
          </RouterLink>
          <div class="flex items-center space-x-2">
            <span class="text-gray-300 text-sm">Powered by</span>
            <img src="/images/logo.png" alt="Inzozi Logo" class="h-10 w-auto brightness-0 invert" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
const socials = [
  { label: 'Slack', icon: 'fa6-brands:slack', href: '#' },
  { label: 'X (Twitter)', icon: 'fa6-brands:x-twitter', href: '#' },
  { label: 'Instagram', icon: 'fa6-brands:instagram', href: '#' },
  { label: 'Facebook', icon: 'fa6-brands:facebook', href: 'https://www.facebook.com/specialistdoctorsintl/' },
  { label: 'LinkedIn', icon: 'fa6-brands:linkedin', href: 'https://www.linkedin.com/company/specialist-doctors-international' },
  { label: 'TikTok', icon: 'fa6-brands:tiktok', href: '#' },
  { label: 'Discord', icon: 'fa6-brands:discord', href: '#' },
  { label: 'Threads', icon: 'fa6-brands:threads', href: '#' },
  { label: 'Snapchat', icon: 'fa6-brands:snapchat', href: '#' },
  { label: 'YouTube', icon: 'fa6-brands:youtube', href: '#' },
];
</script>
