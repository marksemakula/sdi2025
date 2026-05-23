import { defineStore } from 'pinia';

export interface TimeSlot {
  date: string;
  time: string;
}

export interface DoctorSchedule {
  doctorId: number;
  name: string;
  specialty: string;
  availableSlots: TimeSlot[];
}

export interface Referral {
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

const generateWeeklySlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const today = new Date();

  for (let week = 0; week < 4; week++) {
    for (let day = 0; day < 7; day++) {
      const date = new Date(today);
      const currentDay = today.getDay();
      const daysUntilTarget = (day - currentDay + 7) % 7;
      date.setDate(today.getDate() + daysUntilTarget + week * 7);

      if (date < today) continue;

      const dateString = date.toISOString().split('T')[0];
      const timeSlots = [
        '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00',
        '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
      ];

      timeSlots.forEach((time) => slots.push({ date: dateString, time }));
    }
  }

  return slots.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.time.localeCompare(b.time);
  });
};

const defaultSchedules: DoctorSchedule[] = [
  { doctorId: 1, name: 'Dr. Namala Angella', specialty: 'Consultant Obs/Gyn', availableSlots: generateWeeklySlots() },
  { doctorId: 2, name: 'Dr. Isaac Obenet', specialty: 'GP', availableSlots: generateWeeklySlots() },
  { doctorId: 3, name: 'Dr. Maseruka Robert', specialty: 'Consultant Surgeon', availableSlots: generateWeeklySlots() },
];

const getStored = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const useReferralStore = defineStore('referral', {
  state: () => ({
    referrals: getStored<Referral[]>('referrals', []),
    schedules: defaultSchedules,
  }),
  actions: {
    addReferral(referral: Referral) {
      this.referrals.push(referral);
      localStorage.setItem('referrals', JSON.stringify(this.referrals));
    },
    updateSchedules(schedules: DoctorSchedule[]) {
      this.schedules = schedules;
      localStorage.setItem('schedules', JSON.stringify(schedules));
    },
  },
});
