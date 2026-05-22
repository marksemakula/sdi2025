<script setup lang="ts">
import { computed } from 'vue';
import { useHead } from '@unhead/vue';

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  robots?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Specialist Doctors International',
  description: 'Best maternity care, antenatal services, gynaecologist and obstetrician consultations in Jinja, Uganda.',
  keywords: 'maternity Jinja, antenatal Uganda, gynaecologist Jinja, obstetrician Uganda',
  image: '/images/SDI_Logo.png',
  url: 'https://www.specialistdoctors-international.org/',
  type: 'website',
  robots: '',
});

const fullTitle = computed(() =>
  props.title.includes('Specialist Doctors International')
    ? props.title
    : `${props.title} | Specialist Doctors International - Jinja, Uganda`,
);

const baseKeywords =
  "maternity Jinja, maternity Uganda, antenatal care Jinja, antenatal Uganda, gynaecologist Jinja, gynaecologist Uganda, obstetrician Jinja, obstetrician Uganda, prenatal care Uganda, pregnancy care Jinja, women's health Uganda";

const fullKeywords = computed(() =>
  props.keywords ? `${props.keywords}, ${baseKeywords}` : baseKeywords,
);

const fullImageUrl = computed(() =>
  props.image.startsWith('http')
    ? props.image
    : `https://www.specialistdoctors-international.org${props.image}`,
);

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Specialist Doctors International',
  url: 'https://www.specialistdoctors-international.org/',
  logo: 'https://www.specialistdoctors-international.org/images/SDI_Logo.png',
  sameAs: [
    'https://www.facebook.com/specialistdoctorsintl/',
    'https://www.linkedin.com/company/specialist-doctors-international',
  ],
};

useHead(
  computed(() => ({
    title: fullTitle.value,
    link: [{ rel: 'canonical', href: props.url }],
    meta: [
      { name: 'title', content: fullTitle.value },
      { name: 'description', content: props.description },
      { name: 'keywords', content: fullKeywords.value },
      ...(props.robots ? [{ name: 'robots', content: props.robots }] : []),
      { property: 'og:type', content: props.type },
      { property: 'og:url', content: props.url },
      { property: 'og:title', content: fullTitle.value },
      { property: 'og:description', content: props.description },
      { property: 'og:image', content: fullImageUrl.value },
      { property: 'og:locale', content: 'en_UG' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: props.url },
      { name: 'twitter:title', content: fullTitle.value },
      { name: 'twitter:description', content: props.description },
      { name: 'twitter:image', content: fullImageUrl.value },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(organizationSchema),
      },
    ],
  })),
);
</script>

<template>
  <!-- Headless — all output goes to <head> via @unhead/vue -->
</template>
