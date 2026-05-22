<script setup lang="ts">
import { computed } from 'vue';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import { Icon } from '@iconify/vue';
import { useTelemedicineStore } from '@/stores/telemedicine';
import { useCareersStore } from '@/stores/careers';
import { useReferralStore } from '@/stores/referral';

use([LineChart, GridComponent, TooltipComponent, TitleComponent, CanvasRenderer]);

const telemedicineStore = useTelemedicineStore();
const careersStore = useCareersStore();
const referralStore = useReferralStore();

const stats = computed(() => [
  { title: 'Total Patients', value: referralStore.referrals.length, icon: 'fa6-solid:person-walking-with-cane', color: 'bg-blue-500' },
  { title: 'Consultations', value: telemedicineStore.consultations.length, icon: 'fa6-solid:user-doctor', color: 'bg-green-500' },
  { title: 'Applications', value: careersStore.applications.length, icon: 'fa6-solid:calendar-check', color: 'bg-orange-500' },
  { title: 'Success Rate', value: '95%', icon: 'fa6-solid:chart-line', color: 'bg-purple-500' },
]);

const consultationOptions = {
  title: { text: 'Weekly Consultations', left: 'center' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  yAxis: { type: 'value' },
  series: [{ data: [10, 15, 12, 18, 14, 9, 11], type: 'line', smooth: true, color: '#74C365' }],
};
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
        class="bg-white rounded-lg shadow p-6"
      >
        <div class="flex items-center">
          <div :class="[stat.color, 'p-3 rounded-full']">
            <Icon :icon="stat.icon" class="h-6 w-6 text-white" />
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">{{ stat.title }}</h3>
            <p class="text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <VChart :option="consultationOptions" style="height: 300px" autoresize />
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium mb-4">Recent Activity</h3>
        <div class="space-y-4">
          <div
            v-for="(consultation, index) in telemedicineStore.consultations.slice(0, 5)"
            :key="index"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: index * 100 } }"
            class="flex items-center p-3 bg-gray-50 rounded-lg"
          >
            <Icon icon="fa6-solid:user-doctor" class="text-primary mr-3" />
            <div>
              <p class="text-sm font-medium">Virtual Consultation</p>
              <p class="text-xs text-gray-500">{{ new Date(consultation.timestamp).toLocaleString() }}</p>
            </div>
          </div>
          <p v-if="telemedicineStore.consultations.length === 0" class="text-gray-500 text-sm">No consultations yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>
