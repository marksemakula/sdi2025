<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface Props {
  show: boolean;
  message: string;
}

defineProps<Props>();
const emit = defineEmits<{ (e: 'close'): void }>();
</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <Transition name="modal-inner">
        <div v-if="show" class="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <Icon icon="fa6-solid:circle-check" class="text-primary text-2xl mr-2" />
              <h3 class="text-xl font-semibold">Success</h3>
            </div>
            <button @click="emit('close')" class="text-gray-400 hover:text-gray-600">
              <Icon icon="fa6-solid:xmark" />
            </button>
          </div>
          <p class="text-gray-600">{{ message }}</p>
          <button
            @click="emit('close')"
            class="mt-6 w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-inner-enter-active, .modal-inner-leave-active { transition: transform 0.2s ease, opacity 0.2s ease; }
.modal-inner-enter-from, .modal-inner-leave-to { transform: scale(0.9); opacity: 0; }
</style>
