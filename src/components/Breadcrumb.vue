<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useHead } from '@unhead/vue';
import { Icon } from '@iconify/vue';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface Props {
  items?: BreadcrumbItem[];
}

const props = withDefaults(defineProps<Props>(), { items: () => [] });

const BASE_URL = 'https://www.specialistdoctors-international.org';

const allItems = computed<BreadcrumbItem[]>(() => [
  { name: 'Home', url: '/' },
  ...props.items,
]);

useHead(
  computed(() => ({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: allItems.value.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${BASE_URL}${item.url}`,
          })),
        }),
      },
    ],
  })),
);
</script>

<template>
  <nav aria-label="Breadcrumb" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
    <ol
      class="flex flex-wrap items-center gap-1.5 text-sm text-gray-500"
      itemscope
      itemtype="https://schema.org/BreadcrumbList"
    >
      <li
        v-for="(item, index) in allItems"
        :key="item.url"
        class="flex items-center gap-1.5"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <Icon v-if="index > 0" icon="fa6-solid:chevron-right" class="h-2.5 w-2.5 flex-shrink-0 text-gray-400" aria-hidden="true" />
        <Icon v-if="index === 0" icon="fa6-solid:house" class="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />

        <span
          v-if="index === allItems.length - 1"
          class="font-medium text-gray-700 truncate max-w-[240px]"
          itemprop="name"
          aria-current="page"
        >
          {{ item.name }}
        </span>
        <RouterLink
          v-else
          :to="item.url"
          class="hover:text-primary transition-colors truncate max-w-[160px]"
          itemprop="item"
        >
          <span itemprop="name">{{ item.name }}</span>
        </RouterLink>

        <meta itemprop="position" :content="String(index + 1)" />
      </li>
    </ol>
  </nav>
</template>
