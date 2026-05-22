<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';

interface Props {
  canJoin: boolean;
}

defineProps<Props>();
const emit = defineEmits<{ (e: 'join'): void }>();

const queuePosition = ref(3);
const estimatedWait = ref(15);

let interval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  interval = setInterval(() => {
    if (queuePosition.value > 1) {
      queuePosition.value--;
      estimatedWait.value = Math.max(5, estimatedWait.value - 5);
    }
  }, 10000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-semibold text-tertiary mb-4 flex items-center">
      <Icon icon="fa6-solid:users" class="text-primary mr-2" /> Consultation Queue
    </h2>
    <div class="space-y-4">
      <div class="bg-gray-50 rounded-lg p-4 text-center">
        <p class="text-sm text-gray-500 mb-1">Your position</p>
        <p class="text-5xl font-bold text-primary">{{ queuePosition }}</p>
        <p class="text-sm text-gray-500 mt-1">in queue</p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gray-50 rounded-lg p-3 text-center">
          <Icon icon="fa6-solid:clock" class="text-primary text-xl mx-auto mb-1" />
          <p class="text-sm text-gray-500">Est. Wait</p>
          <p class="text-xl font-bold text-gray-800">{{ estimatedWait }} min</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-3 text-center">
          <Icon icon="fa6-solid:user-doctor" class="text-primary text-xl mx-auto mb-1" />
          <p class="text-sm text-gray-500">Doctors</p>
          <p class="text-xl font-bold text-gray-800">Available</p>
        </div>
      </div>
      <button
        :disabled="!canJoin"
        @click="emit('join')"
        :class="[
          'w-full py-3 px-4 rounded-md font-medium transition-colors',
          canJoin
            ? 'bg-primary hover:bg-primary/90 text-white'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed',
        ]"
      >
        {{ canJoin ? 'Join Consultation' : 'Complete Pre-Consultation First' }}
      </button>
    </div>
  </div>
</template>
