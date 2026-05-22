<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useBlogStore } from '@/stores/blog';
import { Icon } from '@iconify/vue';
import SEO from '@/components/SEO.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

const route = useRoute();
const blogStore = useBlogStore();

onMounted(() => {
  if (blogStore.posts.length === 0) blogStore.fetchBlogPosts();
});

const post = computed(() =>
  blogStore.posts.find((p) => p.id === route.params.postId || p.slug === route.params.postId),
);

const renderContent = (content: string) =>
  content.split('\n\n').map((para, i) => ({ id: i, text: para }));
</script>

<template>
  <div class="min-h-screen bg-gray-50 pt-24 pb-12">
    <!-- Loading -->
    <div v-if="blogStore.loading" class="flex items-center justify-center min-h-[300px]">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
        <p class="text-gray-500">Loading post...</p>
      </div>
    </div>

    <!-- Not found -->
    <div v-else-if="!post" class="flex items-center justify-center min-h-[300px]">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-700">Post not found</h1>
        <p class="text-gray-500 mt-2">The requested blog post doesn't exist.</p>
        <RouterLink to="/blog" class="inline-block mt-4 text-primary hover:text-primary/80">← Back to Blog</RouterLink>
      </div>
    </div>

    <template v-else>
      <SEO
        :title="`${post.title} | SDI Blog`"
        :description="post.excerpt"
        :keywords="`${post.category}, healthcare Uganda, medical article`"
        :url="`https://www.specialistdoctors-international.org/blog/${post.slug}`"
        :image="post.image"
      />
      <Breadcrumb :items="[{ name: 'Health Blog', url: '/blog' }, { name: post.title, url: `/blog/${post.slug || post.id}` }]" />
      <div class="max-w-3xl mx-auto px-4">
        <RouterLink to="/blog" class="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <Icon icon="fa6-solid:arrow-left" class="mr-2" /> Back to Blog
        </RouterLink>
        <article class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="h-96 overflow-hidden">
            <img
              :src="post.image"
              :alt="post.title"
              class="w-full h-full object-cover"
              @error="(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/800x400?text=Image+Not+Found' }"
            />
          </div>
          <div class="p-8">
            <div class="flex flex-wrap gap-4 justify-between items-center mb-6">
              <span class="flex items-center text-sm font-semibold text-primary"><Icon icon="fa6-solid:tag" class="mr-2" /> {{ post.category }}</span>
              <span class="flex items-center text-sm text-gray-500"><Icon icon="fa6-solid:user" class="mr-2" /> {{ post.author }}</span>
              <span class="flex items-center text-sm text-gray-500"><Icon icon="fa6-solid:calendar" class="mr-2" /> {{ post.date }}</span>
            </div>
            <h1 class="text-3xl font-bold mb-6">{{ post.title }}</h1>
            <div class="prose max-w-none">
              <p class="text-lg text-gray-700 mb-6 font-medium">{{ post.excerpt }}</p>
              <div v-if="post.content" class="border-t pt-6 text-gray-700 leading-relaxed">
                <template v-for="{ id, text } in renderContent(post.content)" :key="id">
                  <h2 v-if="text.startsWith('## ')" class="text-2xl font-bold mt-8 mb-4 text-tertiary">{{ text.replace('## ', '') }}</h2>
                  <h3 v-else-if="text.startsWith('### ')" class="text-xl font-bold mt-6 mb-3 text-tertiary">{{ text.replace('### ', '') }}</h3>
                  <ol v-else-if="/^\d+\./.test(text)" class="list-decimal list-inside mb-4 space-y-2">
                    <li v-for="(item, j) in text.split('\n').filter(Boolean)" :key="j">{{ item.replace(/^\d+\.\s*/, '') }}</li>
                  </ol>
                  <ul v-else-if="text.startsWith('- ') || text.startsWith('* ')" class="list-disc list-inside mb-4 space-y-2">
                    <li v-for="(item, j) in text.split('\n').filter(Boolean)" :key="j">{{ item.replace(/^[-*]\s*/, '') }}</li>
                  </ul>
                  <p v-else class="mb-4">{{ text }}</p>
                </template>
              </div>
            </div>
          </div>
        </article>
      </div>
    </template>
  </div>
</template>
