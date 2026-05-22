<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useCareersStore } from '@/stores/careers';
import type { Job } from '@/stores/careers';

const emit = defineEmits<{ (e: 'select', position: Job): void }>();
const careersStore = useCareersStore();
</script>

<template>
  <div class="space-y-6">
    <div v-if="careersStore.jobs.length === 0" class="bg-white rounded-lg shadow-lg p-6 text-center">
      <h3 class="text-lg font-medium text-gray-700 mb-2">No current job openings</h3>
      <p class="text-gray-500">Please check back later for new opportunities.</p>
    </div>
    <template v-else>
      <h2 class="text-2xl font-bold text-tertiary mb-4">Available Positions</h2>
      <div
        v-for="(position, index) in careersStore.jobs"
        :key="position.id"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
        class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h2 class="text-xl font-semibold text-tertiary">{{ position.title }}</h2>
            <div class="flex items-center space-x-4 text-sm text-gray-600 mt-2">
              <span class="flex items-center"><Icon icon="fa6-solid:briefcase" class="mr-1" /> {{ position.department }}</span>
              <span class="flex items-center"><Icon icon="fa6-solid:location-dot" class="mr-1" /> {{ position.location }}</span>
              <span class="flex items-center"><Icon icon="fa6-solid:clock" class="mr-1" /> {{ position.type }}</span>
            </div>
          </div>
          <span class="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
            {{ position.experience || 'Experience varies' }}
          </span>
        </div>
        <p class="text-gray-600 mb-4">{{ position.description }}</p>
        <div v-if="position.requirements" class="mb-4">
          <h3 class="font-medium text-gray-700 mb-2">Requirements:</h3>
          <ul class="list-disc list-inside text-gray-600 space-y-1">
            <template v-if="Array.isArray(position.requirements)">
              <li v-for="(req, i) in position.requirements" :key="i">{{ req }}</li>
            </template>
            <li v-else>{{ position.requirements }}</li>
          </ul>
        </div>
        <button @click="emit('select', position)" class="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors">
          Apply Now
        </button>
      </div>
    </template>
  </div>
</template>
