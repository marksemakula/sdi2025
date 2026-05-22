<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-tertiary mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-8">Page not found</p>
      <RouterLink to="/" class="btn-primary px-8 py-3">Go Home</RouterLink>
    </div>
  </div>
</template>
