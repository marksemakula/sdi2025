<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useBlogStore } from '@/stores/blog';
import { Icon } from '@iconify/vue';
import SEO from '@/components/SEO.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

const route = useRoute();
const blogStore = useBlogStore();
const currentIndex = ref(0);
const isAutoPlaying = ref(true);
let autoPlayTimer: ReturnType<typeof setInterval> | null = null;

const searchQuery = computed(() => (route.query.q as string) || '');

const filteredPosts = computed(() =>
  searchQuery.value
    ? blogStore.posts.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          p.excerpt?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          p.category?.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )
    : blogStore.posts,
);

const visiblePosts = computed(() => {
  const postsToShow = Math.min(3, filteredPosts.value.length);
  return Array.from({ length: postsToShow }, (_, i) => filteredPosts.value[(currentIndex.value + i) % filteredPosts.value.length]);
});

const startAutoPlay = () => {
  if (autoPlayTimer) clearInterval(autoPlayTimer);
  autoPlayTimer = setInterval(() => {
    if (filteredPosts.value.length > 1 && !searchQuery.value) {
      currentIndex.value = (currentIndex.value + 1) % filteredPosts.value.length;
    }
  }, 5000);
};

const pauseAndResume = () => {
  isAutoPlaying.value = false;
  if (autoPlayTimer) clearInterval(autoPlayTimer);
  setTimeout(() => {
    isAutoPlaying.value = true;
    startAutoPlay();
  }, 10000);
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % filteredPosts.value.length;
  pauseAndResume();
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + filteredPosts.value.length) % filteredPosts.value.length;
  pauseAndResume();
};

watch(searchQuery, () => { currentIndex.value = 0; });

onMounted(() => {
  blogStore.fetchBlogPosts();
  startAutoPlay();
});

onUnmounted(() => {
  if (autoPlayTimer) clearInterval(autoPlayTimer);
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 pt-24 pb-12">
    <SEO
      title="Maternity & Women's Health Blog | Pregnancy Tips & Antenatal Advice Uganda"
      description="Expert articles on maternity care, antenatal advice, pregnancy tips, and women's health from leading gynaecologists and obstetricians in Jinja, Uganda."
      keywords="maternity blog Uganda, pregnancy tips Jinja, antenatal advice Uganda, women's health articles"
      url="https://www.specialistdoctors-international.org/blog"
    />
    <Breadcrumb :items="[{ name: 'Health Blog', url: '/blog' }]" />

    <div class="max-w-7xl mx-auto px-4">
      <!-- Header -->
      <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" class="text-center mb-12">
        <h1 class="text-4xl font-bold text-tertiary mb-4">Our Blog</h1>
        <template v-if="searchQuery">
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Search results for: <span class="font-semibold text-primary">"{{ searchQuery }}"</span>
            <span v-if="filteredPosts.length === 0" class="block mt-2 text-base text-gray-500">No articles found. Try a different keyword.</span>
          </p>
        </template>
        <p v-else class="text-lg text-gray-600 max-w-2xl mx-auto">Stay updated with the latest news, insights, and trends in healthcare.</p>
      </div>

      <!-- Loading -->
      <div v-if="blogStore.loading" class="flex items-center justify-center min-h-[300px]">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p class="text-gray-500">Loading blog posts...</p>
        </div>
      </div>

      <!-- No posts -->
      <div v-else-if="blogStore.posts.length === 0" class="flex items-center justify-center min-h-[300px]">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-700">No blog posts available</h1>
          <p class="text-gray-500 mt-2">Check back later for updates</p>
        </div>
      </div>

      <!-- Carousel -->
      <div v-else class="relative">
        <div class="flex flex-col md:flex-row justify-center gap-8">
          <div
            v-for="post in visiblePosts"
            :key="post.id"
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :enter="{ opacity: 1, scale: 1 }"
            class="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col hover:-translate-y-1 transition-transform"
          >
            <div class="h-48 overflow-hidden">
              <img
                :src="post.image"
                :alt="post.title"
                class="w-full h-full object-cover"
                @error="(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x200?text=Image+Not+Found' }"
              />
            </div>
            <div class="p-6 flex-grow">
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-semibold text-primary uppercase tracking-wider">{{ post.category }}</span>
                <span class="text-xs text-gray-500 flex items-center">
                  <Icon icon="fa6-solid:calendar" class="mr-1" /> {{ post.date }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">{{ post.title }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-3">{{ post.excerpt }}</p>
            </div>
            <div class="px-6 pb-4">
              <RouterLink :to="`/blog/${post.id}`" class="w-full text-sm font-medium text-secondary hover:text-primary transition-colors text-center py-2 border-t border-gray-100 block">
                Read More →
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Nav arrows -->
        <template v-if="filteredPosts.length > 1">
          <button @click="prevSlide" class="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors" aria-label="Previous slide">
            <Icon icon="fa6-solid:chevron-left" class="text-gray-700" />
          </button>
          <button @click="nextSlide" class="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors" aria-label="Next slide">
            <Icon icon="fa6-solid:chevron-right" class="text-gray-700" />
          </button>
        </template>
      </div>

      <!-- Dot indicators -->
      <div v-if="filteredPosts.length > 1" class="flex justify-center mt-8 space-x-2">
        <button
          v-for="(_, index) in filteredPosts"
          :key="index"
          @click="() => { currentIndex = index; pauseAndResume(); }"
          :class="['w-3 h-3 rounded-full transition-colors', currentIndex === index ? 'bg-primary' : 'bg-gray-300']"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>
    </div>
  </div>
</template>
