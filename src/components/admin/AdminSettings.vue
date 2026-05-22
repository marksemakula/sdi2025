<script setup lang="ts">
import { reactive } from 'vue';
import { Icon } from '@iconify/vue';

const settings = reactive({
  emailNotifications: true,
  autoBackup: true,
  twoFactorAuth: false,
  sessionTimeout: '30',
});

const handleSubmit = () => {
  localStorage.setItem('adminSettings', JSON.stringify(settings));
  alert('Settings saved successfully');
};
</script>

<template>
  <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" class="max-w-2xl mx-auto">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Icon icon="fa6-solid:bell" class="mr-2 text-primary" /> Notifications
        </h3>
        <div class="space-y-4">
          <label class="flex items-center space-x-3">
            <input v-model="settings.emailNotifications" type="checkbox" class="form-checkbox h-5 w-5 text-primary rounded" />
            <span>Email Notifications</span>
          </label>
          <label class="flex items-center space-x-3">
            <input v-model="settings.autoBackup" type="checkbox" class="form-checkbox h-5 w-5 text-primary rounded" />
            <span>Automatic Data Backup</span>
          </label>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Icon icon="fa6-solid:lock" class="mr-2 text-primary" /> Security
        </h3>
        <div class="space-y-4">
          <label class="flex items-center space-x-3">
            <input v-model="settings.twoFactorAuth" type="checkbox" class="form-checkbox h-5 w-5 text-primary rounded" />
            <span>Two-Factor Authentication</span>
          </label>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
            <select v-model="settings.sessionTimeout" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md">
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Icon icon="fa6-solid:user-gear" class="mr-2 text-primary" /> Account Settings
        </h3>
        <div class="space-y-4">
          <button type="button" class="text-red-600 hover:text-red-700 font-medium">Reset Password</button>
        </div>
      </div>

      <div class="flex justify-end">
        <button type="submit" class="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
          <Icon icon="fa6-solid:floppy-disk" class="mr-2" /> Save Settings
        </button>
      </div>
    </form>
  </div>
</template>
