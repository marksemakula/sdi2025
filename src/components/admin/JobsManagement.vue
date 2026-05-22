<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useCareersStore } from '@/stores/careers';
import type { Job } from '@/stores/careers';

const careersStore = useCareersStore();
const isEditing = ref(false);
const currentJob = ref<Job | null>(null);
const formErrors = reactive<Partial<Record<keyof typeof formData, string>>>({});

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary'];

const blankForm = {
  title: '',
  department: '',
  location: '',
  type: '',
  description: '',
  requirements: '',
};

const formData = reactive({ ...blankForm });

watch(currentJob, (job) => {
  if (job) {
    formData.title = job.title;
    formData.department = job.department;
    formData.location = job.location;
    formData.type = job.type;
    formData.description = job.description;
    formData.requirements = Array.isArray(job.requirements) ? job.requirements.join('\n') : job.requirements;
  }
});

const validateForm = () => {
  const errors: typeof formErrors = {};
  if (!formData.title.trim()) errors.title = 'Title is required';
  if (!formData.department.trim()) errors.department = 'Department is required';
  if (!formData.location.trim()) errors.location = 'Location is required';
  if (!formData.type) errors.type = 'Job type is required';
  if (!formData.description.trim()) errors.description = 'Description is required';
  if (!formData.requirements.trim()) errors.requirements = 'Requirements are required';
  return errors;
};

const handleSubmit = () => {
  const errors = validateForm();
  if (Object.keys(errors).length) {
    Object.assign(formErrors, errors);
    return;
  }
  if (isEditing.value && currentJob.value) {
    careersStore.updateJob({ ...currentJob.value, ...formData, requirements: formData.requirements.split('\n').filter(Boolean) });
  } else {
    careersStore.addJob({ ...formData, requirements: formData.requirements.split('\n').filter(Boolean) });
  }
  handleReset();
};

const handleReset = () => {
  isEditing.value = false;
  currentJob.value = null;
  Object.assign(formData, blankForm);
  Object.keys(formErrors).forEach((k) => delete formErrors[k as keyof typeof formErrors]);
};

const handleEdit = (job: Job) => {
  isEditing.value = true;
  currentJob.value = job;
};

const handleDelete = (id: string) => {
  if (window.confirm('Are you sure you want to delete this job posting?')) {
    careersStore.deleteJob(id);
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- Form -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4 text-tertiary">{{ isEditing ? 'Edit Job Posting' : 'Create New Job Posting' }}</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Job Title <span class="text-red-500">*</span></label>
            <input v-model="formData.title" type="text" :class="['w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary', formErrors.title ? 'border-red-500' : 'border-gray-300']" />
            <p v-if="formErrors.title" class="mt-1 text-sm text-red-600">{{ formErrors.title }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Department <span class="text-red-500">*</span></label>
            <input v-model="formData.department" type="text" :class="['w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary', formErrors.department ? 'border-red-500' : 'border-gray-300']" />
            <p v-if="formErrors.department" class="mt-1 text-sm text-red-600">{{ formErrors.department }}</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Location <span class="text-red-500">*</span></label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon icon="fa6-solid:location-dot" class="text-gray-400" /></div>
              <input v-model="formData.location" type="text" :class="['pl-10 w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary', formErrors.location ? 'border-red-500' : 'border-gray-300']" />
            </div>
            <p v-if="formErrors.location" class="mt-1 text-sm text-red-600">{{ formErrors.location }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Job Type <span class="text-red-500">*</span></label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon icon="fa6-solid:clock" class="text-gray-400" /></div>
              <select v-model="formData.type" :class="['pl-10 w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary', formErrors.type ? 'border-red-500' : 'border-gray-300']">
                <option value="">Select job type</option>
                <option v-for="type in jobTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>
            <p v-if="formErrors.type" class="mt-1 text-sm text-red-600">{{ formErrors.type }}</p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Job Description <span class="text-red-500">*</span></label>
          <textarea v-model="formData.description" rows="4" :class="['w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary', formErrors.description ? 'border-red-500' : 'border-gray-300']" />
          <p v-if="formErrors.description" class="mt-1 text-sm text-red-600">{{ formErrors.description }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Requirements <span class="text-red-500">*</span> <span class="text-gray-400 font-normal">(one per line)</span></label>
          <textarea v-model="formData.requirements" rows="4" :class="['w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary', formErrors.requirements ? 'border-red-500' : 'border-gray-300']" />
          <p v-if="formErrors.requirements" class="mt-1 text-sm text-red-600">{{ formErrors.requirements }}</p>
        </div>
        <div class="flex justify-end space-x-3 pt-4">
          <button v-if="isEditing" type="button" @click="handleReset" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Icon icon="fa6-solid:xmark" class="inline mr-2" /> Cancel
          </button>
          <button type="submit" class="px-4 py-2 bg-primary text-white rounded-md shadow-sm text-sm font-medium hover:bg-primary/90">
            <Icon :icon="isEditing ? 'fa6-solid:check' : 'fa6-solid:plus'" class="inline mr-2" />
            {{ isEditing ? 'Update Job' : 'Create Job' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Job List -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4 text-tertiary">Current Job Postings</h2>
      <div v-if="careersStore.jobs.length === 0" class="text-center py-8 text-gray-500">No job postings found. Create your first job posting above.</div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Posted</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="job in careersStore.jobs" :key="job.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ job.title }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ job.department }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ job.location }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10 text-primary">{{ job.type }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ job.postedDate }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex space-x-2 justify-end">
                  <button @click="handleEdit(job)" class="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors" title="Edit">
                    <Icon icon="fa6-solid:pen-to-square" />
                  </button>
                  <button @click="handleDelete(job.id)" class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors" title="Delete">
                    <Icon icon="fa6-solid:trash" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
