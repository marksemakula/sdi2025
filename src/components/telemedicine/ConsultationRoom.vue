<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import ChatInterface from './ChatInterface.vue';

const emit = defineEmits<{ (e: 'end'): void }>();

const isMuted = ref(false);
const isVideoOff = ref(false);
const isScreenSharing = ref(false);
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <!-- Video Container -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 bg-gray-900 min-h-[400px]">
      <!-- Main Video -->
      <div class="lg:col-span-2 bg-gray-800 rounded-lg flex items-center justify-center relative min-h-[300px]">
        <div class="text-center text-white">
          <Icon icon="fa6-solid:user-doctor" class="text-6xl text-gray-400 mb-3" />
          <p class="text-gray-400">Connecting to doctor...</p>
        </div>
        <!-- Self View -->
        <div class="absolute bottom-4 right-4 w-40 h-28 bg-gray-700 rounded-lg flex items-center justify-center border-2 border-gray-600">
          <Icon icon="fa6-solid:user" class="text-3xl text-gray-400" />
        </div>
      </div>
      <!-- Chat Panel -->
      <div class="lg:col-span-1">
        <ChatInterface />
      </div>
    </div>

    <!-- Controls -->
    <div class="flex items-center justify-center space-x-4 p-4 border-t bg-gray-50">
      <button @click="isMuted = !isMuted"
        :class="['p-3 rounded-full transition-colors', isMuted ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300']"
        :aria-label="isMuted ? 'Unmute' : 'Mute'"
      >
        <Icon :icon="isMuted ? 'fa6-solid:microphone-slash' : 'fa6-solid:microphone'" class="text-xl" />
      </button>
      <button @click="isVideoOff = !isVideoOff"
        :class="['p-3 rounded-full transition-colors', isVideoOff ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300']"
        :aria-label="isVideoOff ? 'Turn on video' : 'Turn off video'"
      >
        <Icon :icon="isVideoOff ? 'fa6-solid:video-slash' : 'fa6-solid:video'" class="text-xl" />
      </button>
      <button @click="isScreenSharing = !isScreenSharing"
        :class="['p-3 rounded-full transition-colors', isScreenSharing ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300']"
        aria-label="Share screen"
      >
        <Icon icon="fa6-solid:desktop" class="text-xl" />
      </button>
      <button @click="emit('end')" class="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors" aria-label="End consultation">
        <Icon icon="fa6-solid:phone-slash" class="text-xl" />
      </button>
    </div>
  </div>
</template>
