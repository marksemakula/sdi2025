<script setup lang="ts">
import { ref } from 'vue';
import { useReferralStore } from '@/stores/referral';
import { generateEmailFile } from '@/utils/email';
import ReferralForm from '@/components/referral/ReferralForm.vue';
import ScheduleViewer from '@/components/referral/ScheduleViewer.vue';
import SuccessModal from '@/components/common/SuccessModal.vue';
import SEO from '@/components/SEO.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import type { Referral } from '@/stores/referral';

const referralStore = useReferralStore();
const showSuccess = ref(false);

const handleSubmit = (formData: Referral) => {
  referralStore.addReferral(formData);
  generateEmailFile(formData);
  showSuccess.value = true;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <SEO
      title="Book Antenatal & Maternity Appointment | Gynaecologist Referral in Jinja"
      description="Book your antenatal care, maternity, gynaecologist or obstetrician appointment at Specialist Doctors International in Jinja, Uganda."
      keywords="book antenatal appointment Jinja, maternity referral Uganda, gynaecologist appointment Jinja"
      url="https://www.specialistdoctors-international.org/referral"
    />

    <div class="bg-gradient-to-r from-tertiary to-tertiary-dark py-16 pt-24">
      <div class="container-corporate text-center text-white">
        <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
          <h1 class="text-4xl md:text-5xl font-display font-bold mb-4">Patient Referral</h1>
          <p class="text-lg text-white/80 max-w-2xl mx-auto">Easily refer patients to our specialist doctors for comprehensive care</p>
        </div>
      </div>
    </div>

    <Breadcrumb :items="[{ name: 'Book Appointment & Referral', url: '/referral' }]" />

    <div class="container-corporate py-12 -mt-8">
      <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <ReferralForm :schedules="referralStore.schedules" @submit="handleSubmit" />
          </div>
          <div class="card-elevated p-6 h-fit">
            <ScheduleViewer :schedules="referralStore.schedules" />
          </div>
        </div>
      </div>
    </div>

    <SuccessModal
      :show="showSuccess"
      message="Referral submitted successfully! An email file has been generated for your records."
      @close="showSuccess = false"
    />
  </div>
</template>
