<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import DashboardStats from '@/components/admin/DashboardStats.vue';
import PatientRecords from '@/components/admin/PatientRecords.vue';
import Analytics from '@/components/admin/Analytics.vue';
import AdminSettings from '@/components/admin/AdminSettings.vue';
import AdminLogin from '@/components/admin/AdminLogin.vue';
import BlogManagement from '@/components/admin/BlogManagement.vue';
import JobsManagement from '@/components/admin/JobsManagement.vue';
import SEO from '@/components/SEO.vue';

const isAuthenticated = ref(false);
const activeTab = ref('dashboard');

interface Tab {
  id: string;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fa6-solid:chart-bar' },
  { id: 'patients', label: 'Patient Records', icon: 'fa6-solid:users' },
  { id: 'blog', label: 'Blog Management', icon: 'fa6-solid:blog' },
  { id: 'jobs', label: 'Jobs Management', icon: 'fa6-solid:briefcase' },
  { id: 'analytics', label: 'Analytics', icon: 'fa6-solid:calendar' },
  { id: 'settings', label: 'Settings', icon: 'fa6-solid:gear' },
];
</script>

<template>
  <SEO title="Admin | Specialist Doctors International" robots="noindex, nofollow" />

  <template v-if="!isAuthenticated">
    <AdminLogin @login="isAuthenticated = true" />
  </template>

  <div v-else class="min-h-screen bg-gray-50 pt-20">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="flex border-b overflow-x-auto">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'flex items-center px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700',
              ]"
            >
              <Icon :icon="tab.icon" class="mr-2" /> {{ tab.label }}
            </button>
          </div>
          <div class="p-6">
            <DashboardStats v-if="activeTab === 'dashboard'" />
            <PatientRecords v-else-if="activeTab === 'patients'" />
            <BlogManagement v-else-if="activeTab === 'blog'" />
            <JobsManagement v-else-if="activeTab === 'jobs'" />
            <Analytics v-else-if="activeTab === 'analytics'" />
            <AdminSettings v-else-if="activeTab === 'settings'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
