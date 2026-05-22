<script setup lang="ts">
import { ref } from 'vue';
import ConsultationRoom from '@/components/telemedicine/ConsultationRoom.vue';
import ConsultationQueue from '@/components/telemedicine/ConsultationQueue.vue';
import PreConsultationForm from '@/components/telemedicine/PreConsultationForm.vue';
import SEO from '@/components/SEO.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

const consultationStarted = ref(false);
const preConsultationDone = ref(false);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <SEO
      title="Online Gynaecologist & Obstetrician Consultation | Virtual Maternity Care Uganda"
      description="Consult with expert gynaecologists and obstetricians online from anywhere in Uganda. Virtual antenatal care, pregnancy consultations, and women's health telemedicine services."
      keywords="online gynaecologist Uganda, virtual obstetrician consultation, telemedicine maternity Uganda"
      url="https://www.specialistdoctors-international.org/telemedicine"
    />

    <div class="bg-gradient-to-r from-primary to-primary-600 py-16 pt-24">
      <div class="container-corporate text-center text-white">
        <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
          <span class="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-body mb-4">🩺 Available 24/7</span>
          <h1 class="text-4xl md:text-5xl font-display font-bold mb-4">Virtual Consultation</h1>
          <p class="text-lg text-white/90 max-w-2xl mx-auto">Connect with our specialist doctors from the comfort of your home</p>
        </div>
      </div>
    </div>

    <Breadcrumb :items="[{ name: 'Telemedicine Consultation', url: '/telemedicine' }]" />

    <div class="container-corporate py-12 -mt-8">
      <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <template v-if="!consultationStarted">
            <div class="lg:col-span-2">
              <PreConsultationForm @complete="preConsultationDone = true" />
            </div>
            <ConsultationQueue :can-join="preConsultationDone" @join="consultationStarted = true" />
          </template>
          <div v-else class="lg:col-span-3">
            <ConsultationRoom @end="consultationStarted = false" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
