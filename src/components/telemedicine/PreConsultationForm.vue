<script setup lang="ts">
import { reactive } from 'vue';
import { Icon } from '@iconify/vue';
import { useTelemedicineStore } from '@/stores/telemedicine';
import type { PreConsultation } from '@/stores/telemedicine';

const emit = defineEmits<{ (e: 'complete'): void }>();
const telemedicineStore = useTelemedicineStore();

const formData = reactive<PreConsultation>({
  symptoms: '',
  duration: '',
  medicalHistory: '',
  currentMedications: '',
  allergies: '',
  vitals: {
    temperature: '',
    bloodPressure: '',
    heartRate: '',
  },
});

const handleSubmit = () => {
  telemedicineStore.addPreConsultation({ ...formData });
  emit('complete');
};
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0 }"
    class="bg-white rounded-lg shadow-lg p-6"
  >
    <h2 class="text-2xl font-semibold text-tertiary mb-6">Pre-Consultation Assessment</h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Current Symptoms</label>
        <textarea v-model="formData.symptoms" required rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Describe your symptoms..." />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Duration of Symptoms</label>
        <input v-model="formData.duration" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g., 3 days, 1 week" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Icon icon="fa6-solid:thermometer" class="mr-2" /> Temperature (°F)
          </label>
          <input v-model="formData.vitals.temperature" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
        <div>
          <label class="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Icon icon="fa6-solid:heart-pulse" class="mr-2" /> Blood Pressure
          </label>
          <input v-model="formData.vitals.bloodPressure" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g., 120/80" />
        </div>
        <div>
          <label class="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Icon icon="fa6-solid:heart-pulse" class="mr-2" /> Heart Rate (BPM)
          </label>
          <input v-model="formData.vitals.heartRate" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
      </div>
      <div>
        <label class="flex items-center text-sm font-medium text-gray-700 mb-1">
          <Icon icon="fa6-solid:notes-medical" class="mr-2" /> Medical History
        </label>
        <textarea v-model="formData.medicalHistory" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="List any relevant medical conditions..." />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Current Medications</label>
        <textarea v-model="formData.currentMedications" rows="2" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="List any medications you're currently taking..." />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
        <input v-model="formData.allergies" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="List any allergies..." />
      </div>
      <button type="submit" class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors">
        Submit Pre-Consultation Form
      </button>
    </form>
  </div>
</template>
