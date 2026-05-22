<script setup lang="ts">
import { computed } from 'vue';
import { format, parseISO, isToday, isTomorrow, addDays } from 'date-fns';
import { Icon } from '@iconify/vue';
import type { DoctorSchedule } from '@/stores/referral';

interface Props {
  schedules: DoctorSchedule[];
}

const props = defineProps<Props>();

interface DaySlot {
  date: string;
  label: string;
  slotCount: number;
  firstSlot: string;
  lastSlot: string;
}

const getUpcomingDays = (slots: DoctorSchedule['availableSlots']): DaySlot[] => {
  const today = new Date();
  const next7Days: DaySlot[] = [];
  for (let i = 0; i < 7; i++) {
    const date = addDays(today, i);
    const dateString = date.toISOString().split('T')[0];
    const daySlots = slots.filter((s) => s.date === dateString);
    if (daySlots.length > 0) {
      next7Days.push({
        date: dateString,
        label: isToday(date) ? 'Today' : isTomorrow(date) ? 'Tomorrow' : format(date, 'EEE, MMM d'),
        slotCount: daySlots.length,
        firstSlot: daySlots[0].time,
        lastSlot: daySlots[daySlots.length - 1].time,
      });
    }
  }
  return next7Days;
};
</script>

<template>
  <div>
    <h3 class="text-xl font-semibold mb-4 flex items-center">
      <Icon icon="fa6-solid:calendar" class="mr-2 text-primary" />
      Available Appointments
    </h3>
    <div class="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
      <p class="text-sm text-green-800 font-medium">✓ Open Daily: Monday - Sunday</p>
      <p class="text-sm text-green-700">08:30 AM - 6:30 PM</p>
    </div>
    <div class="space-y-4">
      <div
        v-for="(doctor, index) in schedules"
        :key="doctor.doctorId"
        v-motion
        :initial="{ opacity: 0, x: -20 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: index * 100 } }"
        class="border border-gray-200 rounded-lg p-4 bg-white"
      >
        <div class="flex items-start mb-3">
          <Icon icon="fa6-solid:user-doctor" class="text-primary mt-1 mr-2 flex-shrink-0" />
          <div>
            <h4 class="font-semibold text-tertiary">{{ doctor.name }}</h4>
            <p class="text-xs text-gray-500 leading-tight">{{ doctor.specialty }}</p>
          </div>
        </div>
        <div class="space-y-2">
          <p class="text-xs font-medium text-gray-600 uppercase tracking-wide">Next 7 Days:</p>
          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="(day, di) in getUpcomingDays(doctor.availableSlots).slice(0, 6)"
              :key="di"
              class="text-xs bg-gray-50 p-2 rounded border border-gray-100"
            >
              <span class="font-medium text-tertiary">{{ day.label }}</span>
              <div class="text-gray-500 flex items-center mt-1">
                <Icon icon="fa6-solid:clock" class="mr-1" :width="10" />
                {{ day.firstSlot }} - {{ day.lastSlot }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="text-xs text-gray-500 mt-4 text-center">Select your preferred date and time in the form</p>
  </div>
</template>
