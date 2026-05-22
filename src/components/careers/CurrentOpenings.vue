<script setup lang="ts">
import { Icon } from '@iconify/vue';

const stats = [
  { icon: 'fa6-solid:briefcase', label: 'Open Positions', value: '15+' },
  { icon: 'fa6-solid:user-doctor', label: 'Medical Specialties', value: '12' },
  { icon: 'fa6-solid:hospital', label: 'Locations', value: '5' },
];
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h3 class="text-xl font-semibold text-tertiary mb-6">Quick Stats</h3>
    <div class="space-y-6">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        v-motion
        :initial="{ opacity: 0, x: -20 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: index * 100 } }"
        class="flex items-center space-x-4"
      >
        <div class="bg-primary/10 p-3 rounded-full">
          <Icon :icon="stat.icon" class="text-primary text-xl" />
        </div>
        <div>
          <div class="text-2xl font-bold text-gray-800">{{ stat.value }}</div>
          <div class="text-sm text-gray-600">{{ stat.label }}</div>
        </div>
      </div>
    </div>
    <div class="mt-8 p-4 bg-tertiary/10 rounded-lg">
      <h4 class="font-medium text-tertiary mb-2">Why Join Us?</h4>
      <ul class="text-sm text-gray-600 space-y-2">
        <li>• Competitive compensation</li>
        <li>• Advanced medical facilities</li>
        <li>• Professional development</li>
        <li>• Work-life balance</li>
      </ul>
    </div>
  </div>
</template>
