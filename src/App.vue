<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, RouterView } from 'vue-router';

const route = useRoute();

// Scroll to top on every navigation
watch(
  () => route.fullPath,
  () => window.scrollTo(0, 0),
);
</script>

<template>
  <RouterView />
</template>
