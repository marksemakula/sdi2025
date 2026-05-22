import { defineStore } from 'pinia';

export interface Vitals {
  temperature: string;
  bloodPressure: string;
  heartRate: string;
}

export interface PreConsultation {
  symptoms: string;
  duration: string;
  medicalHistory: string;
  currentMedications: string;
  allergies: string;
  vitals: Vitals;
}

export interface Consultation extends PreConsultation {
  timestamp: string;
}

const getStored = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const useTelemedicineStore = defineStore('telemedicine', {
  state: () => ({
    consultations: getStored<Consultation[]>('consultations', []),
    currentConsultation: null as PreConsultation | null,
  }),
  actions: {
    addPreConsultation(data: PreConsultation) {
      this.currentConsultation = data;
      const consultation: Consultation = { ...data, timestamp: new Date().toISOString() };
      this.consultations.push(consultation);
      localStorage.setItem('consultations', JSON.stringify(this.consultations));
    },
    endConsultation() {
      this.currentConsultation = null;
    },
  },
});
