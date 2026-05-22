<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const images = [
  '/images/Medical/File 2.jpg',
  '/images/Medical/File 3.jpg',
  '/images/Medical/File 4.jpg',
  '/images/Medical/File 5.jpg',
  '/images/Medical/File 6.jpg',
  '/images/Medical/File 7.jpg',
  '/images/Medical/File 8.jpg',
  '/images/Medical/File 9.jpg',
  '/images/Medical/File 10.jpg',
  '/images/Medical/File 11.jpg',
  '/images/Medical/File 12.jpg',
  '/images/Medical/File 13.jpg',
  '/images/Medical/File 15.jpg',
  '/images/Medical/File 16.jpg',
  '/images/Medical/File 17.jpg',
  '/images/Medical/File 18.jpg',
  '/images/Medical/File 20.jpg',
  '/images/Medical/File 21.jpg',
  '/images/Medical/File 23.jpg',
  '/images/Medical/File 24.jpg',
  '/images/Medical/File 25.jpg',
  '/images/Medical/File 26.jpg',
  '/images/Medical/File 27.jpg',
  '/images/Medical/File 28.jpg',
  '/images/Medical/File 29.jpg',
  '/images/Medical/File 30.jpg',
  '/images/Medical/File 31.jpg',
  '/images/Medical/File 32.jpg',
  '/images/Medical/File 33.jpg',
  '/images/Medical/File 34.jpg',
  '/images/Medical/File 35.jpg',
  '/images/Medical/File 36.jpg',
  '/images/Medical/File 37.jpg',
  '/images/Medical/File 38.jpg',
  '/images/Medical/File 39.jpg',
  '/images/Medical/File 40.jpg',
  '/images/Medical/File 41.jpg',
  '/images/Medical/File 42.jpg',
  '/images/Medical/File 43.jpg',
  '/images/Medical/File 44.jpg',
  '/images/Medical/File 45.jpg',
  '/images/Medical/File 46.jpg',
  '/images/Medical/File 47.jpg',
  '/images/Medical/File 48.jpg',
  '/images/Medical/File 49.jpg',
  '/images/Medical/File 50.jpg',
  '/images/Medical/File 51.jpg',
  '/images/Medical/File 52.jpg',
  '/images/Medical/File 53.jpg',
  '/images/Medical/File 56.jpg',
  '/images/Medical/File 57.jpg',
  '/images/Medical/File 58.jpg',
  '/images/Medical/File 59.jpg',
  '/images/Medical/File 60.jpg',
  '/images/Medical/File 62.jpg',
  '/images/Medical/File 63.jpg',
];

const currentImageIndex = ref(0);
let interval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  interval = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
  }, 5000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <div class="absolute inset-0 h-full w-full overflow-hidden z-0">
    <div
      v-for="(image, index) in images"
      :key="image"
      class="absolute inset-0 w-full h-full transition-opacity duration-1000"
      :style="{ opacity: index === currentImageIndex ? 1 : 0 }"
    >
      <img :src="image" alt="Medical background" class="w-full h-full object-cover" />
    </div>
    <div class="absolute inset-0 bg-black/20 z-0" />
  </div>
</template>
