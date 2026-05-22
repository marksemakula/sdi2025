<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useCareersStore } from '@/stores/careers';
import type { Job } from '@/stores/careers';

interface Props {
  position: Job;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'back'): void }>();
const careersStore = useCareersStore();

const resumeFile = ref<File | null>(null);
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  experience: '',
  certifications: '',
  coverLetter: '',
});

const handleFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  resumeFile.value = input.files?.[0] ?? null;
};

const handleSubmit = () => {
  if (!resumeFile.value) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    careersStore.addApplication({
      ...formData,
      position: props.position.title,
      resume: e.target?.result as string,
      applicationDate: new Date().toISOString(),
    });
    emit('back');
  };
  reader.readAsDataURL(resumeFile.value);
};
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, x: 20 }"
    :enter="{ opacity: 1, x: 0 }"
    class="bg-white rounded-lg shadow-lg p-6"
  >
    <button @click="emit('back')" class="flex items-center text-gray-600 hover:text-tertiary mb-6">
      <Icon icon="fa6-solid:arrow-left" class="mr-2" /> Back to Listings
    </button>
    <h2 class="text-2xl font-semibold text-tertiary mb-6">Apply for {{ position.title }}</h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input v-model="formData.firstName" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input v-model="formData.lastName" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="formData.email" type="email" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input v-model="formData.phone" type="tel" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
        <input v-model="formData.experience" type="number" required min="0" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
        <textarea v-model="formData.certifications" required rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="List your relevant certifications..." />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
        <textarea v-model="formData.coverLetter" required rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Tell us why you're the perfect fit..." />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Resume</label>
        <label class="flex items-center px-4 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 w-fit">
          <Icon icon="fa6-solid:upload" class="mr-2" />
          <span>{{ resumeFile ? resumeFile.name : 'Upload Resume' }}</span>
          <input type="file" accept=".pdf,.doc,.docx" class="hidden" @change="handleFileChange" />
        </label>
      </div>
      <button type="submit" class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors">
        Submit Application
      </button>
    </form>
  </div>
</template>
