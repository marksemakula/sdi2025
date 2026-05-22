<script setup lang="ts">
import { reactive } from 'vue';
import { Icon } from '@iconify/vue';
import HeroCarousel from '@/components/HeroCarousel.vue';
import SEO from '@/components/SEO.vue';

const formData = reactive({
  patientName: '',
  referredBy: '',
  serviceNeeded: '',
  phoneNumber: '',
  symptoms: '',
  appointmentDate: new Date().toISOString().split('T')[0],
});

const handleSubmit = () => {
  const message = `New Appointment Request:
Patient Name: ${formData.patientName}
Referred By: ${formData.referredBy || 'Not specified'}
Service Needed: ${formData.serviceNeeded}
Phone Number: ${formData.phoneNumber}
Symptoms: ${formData.symptoms || 'Not specified'}
Preferred Date: ${formData.appointmentDate}`;

  window.open(`https://wa.me/256702652046?text=${encodeURIComponent(message)}`, '_blank');
};

const services = [
  {
    icon: 'fa6-solid:user-doctor',
    image: '/images/services/Dr.Namala_Angella.jpeg',
    title: 'Specialist Consultations',
    description: 'Access to leading medical specialists across various disciplines',
  },
  {
    icon: 'fa6-solid:hospital',
    image: '/images/services/advanced-facilities.jpg',
    title: 'Advanced Facilities',
    description: 'State-of-the-art medical facilities and equipment',
  },
  {
    icon: 'fa6-solid:truck-medical',
    image: '/images/services/emergency-care.jpg',
    title: 'Emergency Care',
    description: '24/7 emergency medical services and support',
  },
];

const partners = [
  { name: 'WHO', logo: '/images/partners/who.png' },
  { name: 'Rotary', logo: '/images/partners/rotary.png' },
  { name: 'GoU', logo: '/images/partners/gou.png' },
  { name: 'Liberty', logo: '/images/partners/liberty.jpg' },
  { name: 'ACTION IN AFRICA', logo: '/images/partners/action-africa.png' },
  { name: 'Busoga Kingdom', logo: '/images/partners/busoga.png' },
  { name: 'SheisAI', logo: '/images/partners/sheisai.png' },
  { name: 'Winrise', logo: '/images/partners/winrise.png' },
  { name: 'UAP', logo: '/images/partners/uap.png' },
  { name: 'JUBILEE', logo: '/images/partners/jubilee.png' },
  { name: 'AAR', logo: '/images/partners/aar.png' },
];
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <SEO
      title="Best Maternity & Antenatal Care in Jinja, Uganda | Gynaecologist & Obstetrician"
      description="Specialist Doctors International offers the best maternity care, antenatal services, gynaecologist and obstetrician consultations in Jinja, Uganda."
      keywords="maternity hospital Jinja, best antenatal care Uganda, gynaecologist near me Jinja, obstetrician Uganda, pregnancy care Jinja"
      url="https://www.specialistdoctors-international.org/"
    />

    <!-- Hero Section -->
    <section class="relative h-[700px] overflow-hidden -mt-[72px]">
      <HeroCarousel />
      <div class="relative z-10 h-full flex items-center pt-16">
        <div class="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
            class="text-white max-w-2xl"
          >
            <span class="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-body mb-4">
              🏥 Premier Healthcare in Jinja, Uganda
            </span>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display leading-tight" style="text-shadow: 0 2px 4px rgba(0,0,0,0.3)">
              Because We Care
            </h1>
            <p class="text-lg md:text-xl mb-8 font-body opacity-95 leading-relaxed" style="text-shadow: 0 1px 2px rgba(0,0,0,0.2)">
              Access specialized maternity, antenatal, and women's healthcare services from leading gynaecologists and obstetricians.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a href="/referral" class="btn-secondary text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">Make a Referral</a>
              <a href="/telemedicine" class="btn bg-white/95 hover:bg-white text-tertiary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">Virtual Consultation</a>
            </div>
          </div>
          <div
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { duration: 800, delay: 300 } }"
            class="hidden lg:block relative z-20 -ml-8"
            style="width: calc(256px * 1.62)"
          >
            <div class="relative w-full h-full">
              <img src="/images/SDI_Logo.png" alt="" aria-hidden="true" class="absolute w-full h-auto blur-sm opacity-80" style="filter: brightness(0); transform: translate(2px, 2px)" />
              <img src="/images/SDI_Logo.png" alt="SDI Logo" class="w-full h-auto relative drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Appointment Booking Form -->
    <section class="section bg-gradient-to-b from-white to-gray-50">
      <div class="container-corporate">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          class="card-elevated p-8 md:p-10"
        >
          <div class="section-header mb-8">
            <h2 class="section-title">
              <span class="text-primary">Book</span> <span class="text-tertiary">Appointment</span>
            </h2>
            <p class="section-subtitle text-base">Schedule your consultation with our specialist doctors today</p>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="form-group">
                  <label class="label">Patient Name</label>
                  <input v-model="formData.patientName" type="text" class="input" placeholder="Enter patient name" required />
                </div>
                <div class="form-group">
                  <label class="label">Referred By (Optional)</label>
                  <input v-model="formData.referredBy" type="text" class="input" placeholder="Referrer name or contact" />
                </div>
                <div class="form-group">
                  <label class="label">Service Needed</label>
                  <select v-model="formData.serviceNeeded" class="select" required>
                    <option value="">Select a service</option>
                    <option value="Consultation">Specialist Consultation</option>
                    <option value="Antenatal">Antenatal Care (ANC)</option>
                    <option value="Maternity">Maternity Services</option>
                    <option value="Gynaecology">Gynaecology</option>
                    <option value="Scan">Ultrasound Scan</option>
                    <option value="Dental">Dental</option>
                    <option value="Physiotherapy">Physiotherapy</option>
                    <option value="Lab Test">Lab Test</option>
                    <option value="Surgery">Surgery</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="form-group">
                  <label class="label">Phone Number</label>
                  <input v-model="formData.phoneNumber" type="tel" class="input" placeholder="+256 XXX XXX XXX" required />
                </div>
                <div class="form-group">
                  <label class="label">Symptoms (Optional)</label>
                  <input v-model="formData.symptoms" type="text" class="input" placeholder="Describe symptoms briefly" />
                </div>
                <div class="form-group">
                  <label class="label">Preferred Date</label>
                  <input v-model="formData.appointmentDate" type="date" class="input" required />
                </div>
              </div>
              <div class="pt-6 text-center">
                <button type="submit" class="btn-primary px-12 py-3.5 text-base">Book Appointment</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="section bg-white">
      <div class="container-corporate">
        <div class="section-header">
          <h2
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1 }"
            class="section-title"
          >Our Services</h2>
          <p class="section-subtitle">Comprehensive healthcare solutions tailored to your needs</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(service, index) in services"
            :key="index"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: index * 200 } }"
            class="card group cursor-pointer"
          >
            <div class="h-52 overflow-hidden">
              <img :src="service.image" :alt="service.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div class="p-6">
              <div class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <Icon :icon="service.icon" class="text-primary text-2xl group-hover:text-white transition-colors" />
              </div>
              <h3 class="text-xl font-semibold mb-2 font-display text-gray-900">{{ service.title }}</h3>
              <p class="text-gray-600 font-body leading-relaxed">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners Carousel -->
    <section class="py-16" style="background-color: #ECECEC">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Our Health Partners</h2>
        <div class="relative overflow-hidden">
          <div class="flex w-max animate-scroll" @mouseenter="(e) => (e.currentTarget as HTMLElement).style.animationPlayState = 'paused'" @mouseleave="(e) => (e.currentTarget as HTMLElement).style.animationPlayState = 'running'">
            <div v-for="(partner, index) in [...partners, ...partners]" :key="index" class="flex-shrink-0 mx-4 p-6">
              <img :src="partner.logo" :alt="partner.name" class="h-16 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
