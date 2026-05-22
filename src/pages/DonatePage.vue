<script setup lang="ts">
import { Icon } from '@iconify/vue';
import SEO from '@/components/SEO.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

const impactItems = [
  {
    icon: 'fa6-solid:baby',
    title: 'Safe Deliveries',
    description: 'Fund the equipment and specialist care that gives every mother a safe delivery.',
  },
  {
    icon: 'fa6-solid:user-doctor',
    title: 'Antenatal Care',
    description: 'Help cover prenatal check-ups, ultrasounds, and essential screenings for expectant mothers.',
  },
  {
    icon: 'fa6-solid:heart',
    title: "Women's Health",
    description: 'Support gynaecological consultations and treatments for women across Eastern Uganda.',
  },
];
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <SEO
      title="Donate | Support Maternity & Women's Health Care in Uganda"
      description="Support Specialist Doctors International's mission to provide quality maternity and women's health care in Jinja, Uganda."
      keywords="donate maternity care Uganda, support healthcare Jinja, fund safe delivery Uganda"
      url="https://www.specialistdoctors-international.org/donate"
    />

    <div class="bg-gradient-to-r from-primary to-tertiary py-16 pt-24">
      <div class="max-w-7xl mx-auto px-4 text-center text-white">
        <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
          <span class="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-body mb-4">❤️ Make a Difference</span>
          <h1 class="text-4xl md:text-5xl font-bold font-display mb-4">Donate to SDI</h1>
          <p class="text-lg text-white/90 max-w-2xl mx-auto">
            Help us continue delivering expert maternity and women's health care to families in Jinja and across Eastern Uganda.
          </p>
        </div>
      </div>
    </div>

    <Breadcrumb :items="[{ name: 'Donate', url: '/donate' }]" />

    <!-- Impact cards -->
    <section class="max-w-5xl mx-auto px-4 py-12" aria-labelledby="impact-heading">
      <h2 id="impact-heading" class="text-2xl font-bold text-tertiary text-center mb-8">Where Your Donation Goes</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="item in impactItems"
          :key="item.title"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          class="bg-white rounded-2xl shadow-md p-6 text-center"
        >
          <Icon :icon="item.icon" class="text-primary text-4xl mx-auto mb-4" aria-hidden="true" />
          <h3 class="text-lg font-semibold text-tertiary mb-2">{{ item.title }}</h3>
          <p class="text-gray-600 text-sm">{{ item.description }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <div class="max-w-2xl mx-auto px-4 pb-16 text-center">
      <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }" class="bg-white rounded-2xl shadow-lg p-10">
        <Icon icon="fa6-solid:hand-holding-heart" class="text-primary text-6xl mx-auto mb-6" aria-hidden="true" />
        <h2 class="text-2xl font-bold text-tertiary mb-3">Ready to Make an Impact?</h2>
        <p class="text-gray-600 mb-8">Contact our team to discuss donation options, bank transfers, or in-kind contributions. Every gift — large or small — saves lives.</p>
        <a
          href="https://wa.me/256702652046?text=I%20would%20like%20to%20make%20a%20donation%20to%20Specialist%20Doctors%20International"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 btn-primary px-8 py-4 text-lg"
          aria-label="Contact SDI on WhatsApp to discuss donating"
        >
          <Icon icon="fa6-solid:heart" aria-hidden="true" /> Contact Us to Donate
        </a>
      </div>
    </div>
  </div>
</template>
