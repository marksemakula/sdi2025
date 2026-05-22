<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

interface Message {
  role: 'patient' | 'doctor';
  text: string;
  time: string;
}

const messages = ref<Message[]>([
  { role: 'doctor', text: 'Hello! I can see your pre-consultation form. How are you feeling today?', time: 'Just now' },
]);
const newMessage = ref('');

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  messages.value.push({ role: 'patient', text: newMessage.value, time: 'Just now' });
  newMessage.value = '';
  setTimeout(() => {
    messages.value.push({ role: 'doctor', text: 'Thank you for sharing that. I\'ll look into your symptoms.', time: 'Just now' });
  }, 1500);
};
</script>

<template>
  <div class="flex flex-col h-full bg-gray-800 rounded-lg overflow-hidden" style="min-height:300px">
    <div class="px-3 py-2 border-b border-gray-700">
      <h3 class="text-white text-sm font-medium flex items-center">
        <Icon icon="fa6-solid:comment" class="mr-2 text-primary" /> Chat
      </h3>
    </div>
    <div class="flex-1 overflow-y-auto p-3 space-y-3">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['flex', msg.role === 'patient' ? 'justify-end' : 'justify-start']"
      >
        <div :class="['max-w-xs px-3 py-2 rounded-lg text-sm', msg.role === 'patient' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-200']">
          <p>{{ msg.text }}</p>
          <p class="text-xs opacity-70 mt-1">{{ msg.time }}</p>
        </div>
      </div>
    </div>
    <div class="p-3 border-t border-gray-700">
      <div class="flex space-x-2">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Type a message..."
          class="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button @click="sendMessage" class="p-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors">
          <Icon icon="fa6-solid:paper-plane" />
        </button>
      </div>
    </div>
  </div>
</template>
