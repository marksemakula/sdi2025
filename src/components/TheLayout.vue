<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import TheNavigation from './TheNavigation.vue';
import TheFooter from './TheFooter.vue';

const route = useRoute();
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <TheNavigation />
    <main class="flex-grow">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
