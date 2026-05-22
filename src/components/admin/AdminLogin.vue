<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const emit = defineEmits<{ (e: 'login'): void }>();

const email = ref('');
const password = ref('');
const error = ref('');

const ADMIN_EMAIL = 'admin@specialistdoctors-international.org';
const ADMIN_PASSWORD = '@Student1705';

const handleSubmit = () => {
  if (email.value === ADMIN_EMAIL && password.value === ADMIN_PASSWORD) {
    emit('login');
  } else {
    error.value = 'Invalid credentials. Please try again.';
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-tertiary mb-6 text-center">Admin Login</h2>
      <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{{ error }}</div>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="email">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon="fa6-solid:user" class="text-gray-400" />
            </div>
            <input id="email" v-model="email" type="email" class="pl-10 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your admin email" required />
          </div>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-2" for="password">Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon="fa6-solid:lock" class="text-gray-400" />
            </div>
            <input id="password" v-model="password" type="password" class="pl-10 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your password" required />
          </div>
        </div>
        <button type="submit" class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300">
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>
