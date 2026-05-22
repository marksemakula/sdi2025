<script setup lang="ts">
import { onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { useBlogStore } from '@/stores/blog';

const blogStore = useBlogStore();

onMounted(() => blogStore.fetchBlogPosts());
const handleRefresh = () => blogStore.fetchBlogPosts();
const handleOpenCMS = () => window.open('/admin/', '_blank');
</script>

<template>
  <div class="space-y-6">
    <!-- CMS Banner -->
    <div class="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-lg shadow-lg">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold mb-2">Blog Content Management</h2>
          <p class="text-white/90">Blog posts are managed through our Content Management System (CMS).</p>
        </div>
        <button @click="handleOpenCMS" class="inline-flex items-center px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md">
          <Icon icon="fa6-solid:arrow-up-right-from-square" class="mr-2" /> Open CMS Editor
        </button>
      </div>
    </div>

    <!-- Instructions -->
    <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
      <h3 class="font-semibold text-blue-800 mb-2">How to Use the CMS</h3>
      <ol class="list-decimal list-inside text-blue-700 space-y-1">
        <li>Click "Open CMS Editor" above to access the content management system</li>
        <li>Log in with your Netlify Identity credentials</li>
        <li>Navigate to "Blog Posts" in the sidebar</li>
        <li>Create new posts or edit existing ones using the visual editor</li>
        <li>Save and publish when ready - changes will be live within minutes</li>
      </ol>
    </div>

    <!-- Posts Overview -->
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-tertiary">Published Blog Posts</h2>
        <button @click="handleRefresh" :disabled="blogStore.loading" class="inline-flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          <Icon icon="fa6-solid:rotate" :class="['mr-2', blogStore.loading && 'animate-spin']" />
          Refresh
        </button>
      </div>
      <div v-if="blogStore.error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
        <span>{{ blogStore.error }}</span>
      </div>
      <div v-if="blogStore.loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4" />
        <p class="text-gray-500">Loading posts...</p>
      </div>
      <div v-else-if="blogStore.posts.length === 0" class="text-center py-8">
        <p class="text-gray-500 mb-4">No blog posts yet.</p>
        <button @click="handleOpenCMS" class="text-primary hover:text-primary/80 font-medium">
          Create your first post →
        </button>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="post in blogStore.posts" :key="post.id" class="hover:bg-gray-50">
              <td class="px-4 py-4">
                <div class="flex items-center">
                  <img v-if="post.image" :src="post.image" :alt="post.title" class="w-12 h-12 object-cover rounded mr-3" @error="(e) => { (e.target as HTMLElement).style.display = 'none' }" />
                  <div>
                    <div class="font-medium text-gray-900">{{ post.title }}</div>
                    <div class="text-sm text-gray-500 line-clamp-1">{{ post.excerpt }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  <Icon icon="fa6-solid:tag" class="mr-1" :width="10" /> {{ post.category }}
                </span>
              </td>
              <td class="px-4 py-4">
                <span class="inline-flex items-center text-sm text-gray-600">
                  <Icon icon="fa6-solid:user" class="mr-2" :width="12" /> {{ post.author }}
                </span>
              </td>
              <td class="px-4 py-4">
                <span class="inline-flex items-center text-sm text-gray-600">
                  <Icon icon="fa6-solid:calendar" class="mr-2" :width="12" /> {{ post.date }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
