<script setup lang="ts">
import { reactive } from 'vue';
import { Icon } from '@iconify/vue';
import type { DoctorSchedule } from '@/stores/referral';

interface ReferralFormData {
  patientName: string;
  dateOfBirth: string;
  contactNumber: string;
  referringDoctor: string;
  institution: string;
  doctorContact: string;
  serviceRequested: string;
  clinicalInfo: string;
  preferredDate: string;
  preferredTime: string;
}

interface Props {
  schedules: DoctorSchedule[];
}

defineProps<Props>();
const emit = defineEmits<{ (e: 'submit', data: ReferralFormData): void }>();

const formData = reactive<ReferralFormData>({
  patientName: '',
  dateOfBirth: '',
  contactNumber: '',
  referringDoctor: '',
  institution: '',
  doctorContact: '',
  serviceRequested: '',
  clinicalInfo: '',
  preferredDate: '',
  preferredTime: '',
});

const handleSubmit = () => emit('submit', { ...formData });
</script>

<template>
  <form
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { duration: 500 } }"
    @submit.prevent="handleSubmit"
    class="card-elevated p-8"
  >
    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="form-group">
          <label class="label flex items-center">
            <Icon icon="fa6-solid:user" class="mr-2 text-primary" /> Patient Name
          </label>
          <input v-model="formData.patientName" type="text" required class="input" placeholder="Enter patient's full name" />
        </div>
        <div class="form-group">
          <label class="label flex items-center">
            <Icon icon="fa6-solid:calendar" class="mr-2 text-primary" /> Date of Birth
          </label>
          <input v-model="formData.dateOfBirth" type="date" required class="input" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="form-group">
          <label class="label flex items-center">
            <Icon icon="fa6-solid:user-doctor" class="mr-2 text-primary" /> Referring Doctor
          </label>
          <input v-model="formData.referringDoctor" type="text" required class="input" placeholder="Doctor's name" />
        </div>
        <div class="form-group">
          <label class="label flex items-center">
            <Icon icon="fa6-solid:hospital" class="mr-2 text-primary" /> Institution
          </label>
          <input v-model="formData.institution" type="text" required class="input" placeholder="Hospital or clinic name" />
        </div>
      </div>

      <div class="form-group">
        <label class="label flex items-center">
          <Icon icon="fa6-solid:phone" class="mr-2 text-primary" /> Contact Number
        </label>
        <input v-model="formData.contactNumber" type="tel" required class="input" placeholder="+256 XXX XXX XXX" />
      </div>

      <div class="form-group">
        <label class="label">Service Requested</label>
        <select v-model="formData.serviceRequested" required class="select">
          <option value="">Select a service</option>
          <option value="antenatal">Antenatal Care (ANC)</option>
          <option value="maternity">Maternity Services</option>
          <option value="gynaecology">Gynaecology Consultation</option>
          <option value="obstetrics">Obstetrics Care</option>
          <option value="physiotherapy">Physiotherapy</option>
          <option value="dental">Dental Services</option>
          <option value="imaging">Imaging/Ultrasound Scan</option>
          <option value="laboratory">Laboratory Tests</option>
        </select>
      </div>

      <div class="form-group">
        <label class="label">Clinical Information</label>
        <textarea v-model="formData.clinicalInfo" required rows="4" class="textarea"
          placeholder="Please provide relevant clinical history and current symptoms..." />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="form-group">
          <label class="label">Preferred Date</label>
          <input v-model="formData.preferredDate" type="date" required class="input" />
        </div>
        <div class="form-group">
          <label class="label">Preferred Time</label>
          <select v-model="formData.preferredTime" required class="select">
            <option value="">Select time</option>
            <option v-for="t in times" :key="t.value" :value="t.value">{{ t.label }}</option>
          </select>
        </div>
      </div>

      <button type="submit" class="w-full btn-primary py-3.5 text-base">Submit Referral</button>
    </div>
  </form>
</template>

<script lang="ts">
const times = [
  { value: '08:30', label: '08:30 AM' }, { value: '09:00', label: '09:00 AM' },
  { value: '09:30', label: '09:30 AM' }, { value: '10:00', label: '10:00 AM' },
  { value: '10:30', label: '10:30 AM' }, { value: '11:00', label: '11:00 AM' },
  { value: '11:30', label: '11:30 AM' }, { value: '12:00', label: '12:00 PM' },
  { value: '12:30', label: '12:30 PM' }, { value: '13:00', label: '01:00 PM' },
  { value: '13:30', label: '01:30 PM' }, { value: '14:00', label: '02:00 PM' },
  { value: '14:30', label: '02:30 PM' }, { value: '15:00', label: '03:00 PM' },
  { value: '15:30', label: '03:30 PM' }, { value: '16:00', label: '04:00 PM' },
  { value: '16:30', label: '04:30 PM' }, { value: '17:00', label: '05:00 PM' },
  { value: '17:30', label: '05:30 PM' }, { value: '18:00', label: '06:00 PM' },
  { value: '18:30', label: '06:30 PM' },
];
</script>
