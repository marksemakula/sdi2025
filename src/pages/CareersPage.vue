<script setup lang="ts">
import { ref } from 'vue';
import JobListings from '@/components/careers/JobListings.vue';
import ApplicationForm from '@/components/careers/ApplicationForm.vue';
import CurrentOpenings from '@/components/careers/CurrentOpenings.vue';
import SEO from '@/components/SEO.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import type { Job } from '@/stores/careers';

const selectedPosition = ref<Job | null>(null);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <SEO
      title="Medical Careers | Gynaecologist & Obstetrician Jobs in Jinja, Uganda"
      description="Join Specialist Doctors International in Jinja, Uganda. Career opportunities for gynaecologists, obstetricians, midwives, and maternity care specialists."
      keywords="gynaecologist jobs Uganda, obstetrician careers Jinja, midwife jobs Uganda, maternity nurse jobs Jinja"
      url="https://www.specialistdoctors-international.org/careers"
    />

    <div class="bg-gradient-to-r from-secondary to-secondary-dark py-16 pt-24">
      <div class="container-corporate text-center text-white">
        <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
          <span class="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-body mb-4">💼 Join Our Team</span>
          <h1 class="text-4xl md:text-5xl font-display font-bold mb-4">Medical Careers</h1>
          <p class="text-lg text-white/90 max-w-2xl mx-auto">Join our team of dedicated healthcare professionals and make a difference in people's lives</p>
        </div>
      </div>
    </div>

    <Breadcrumb :items="[{ name: 'Medical Careers', url: '/careers' }]" />

    <div class="container-corporate py-12 -mt-8">
      <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <ApplicationForm v-if="selectedPosition" :position="selectedPosition" @back="selectedPosition = null" />
            <JobListings v-else @select="selectedPosition = $event" />
          </div>
          <div>
            <CurrentOpenings />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
