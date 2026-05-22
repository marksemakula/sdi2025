<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { useTelemedicineStore } from '@/stores/telemedicine';
import { useReferralStore } from '@/stores/referral';
import { generateExcelReport } from '@/utils/excel';

const telemedicineStore = useTelemedicineStore();
const referralStore = useReferralStore();
const searchTerm = ref('');

const combinedRecords = computed(() => [
  ...referralStore.referrals.map((r) => ({
    patientName: r.patientName,
    type: 'Referral',
    date: new Date().toISOString(),
    email: '',
    phone: r.contactNumber,
  })),
  ...telemedicineStore.consultations.map((c) => ({
    patientName: 'Virtual Patient',
    type: 'Consultation',
    date: c.timestamp,
    email: '',
    phone: '',
  })),
]);

const filteredRecords = computed(() =>
  combinedRecords.value.filter((r) =>
    r.patientName.toLowerCase().includes(searchTerm.value.toLowerCase()),
  ),
);

const handleExport = () => generateExcelReport(filteredRecords.value);
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div class="relative flex-1 max-w-md">
        <Icon icon="fa6-solid:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input v-model="searchTerm" type="text" placeholder="Search patients..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" />
      </div>
      <button @click="handleExport" class="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
        <Icon icon="fa6-solid:file-excel" class="mr-2" /> Export Records
      </button>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(record, index) in filteredRecords"
            :key="index"
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: index * 50 } }"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ record.patientName }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="['px-2 inline-flex text-xs leading-5 font-semibold rounded-full', record.type === 'Referral' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800']">
                {{ record.type }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ new Date(record.date).toLocaleDateString() }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
