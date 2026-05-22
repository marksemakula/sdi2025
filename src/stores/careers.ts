import { defineStore } from 'pinia';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience?: string;
  description: string;
  requirements: string | string[];
  postedDate: string;
}

export interface Application {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  certifications: string;
  coverLetter: string;
  resume: string | null;
  position: string;
  applicationDate: string;
}

const getStored = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const defaultJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Cardiologist',
    department: 'Cardiology',
    location: 'Main Medical Center',
    type: 'Full-time',
    experience: '5+ years',
    description: 'Looking for an experienced cardiologist to join our heart center team...',
    requirements: [
      'Board certification in Cardiology',
      '5+ years of clinical experience',
      'Strong research background',
      'Excellent patient care skills',
    ],
    postedDate: new Date().toISOString().split('T')[0],
  },
  {
    id: '2',
    title: 'Pediatric Specialist',
    department: 'Pediatrics',
    location: "Children's Wing",
    type: 'Full-time',
    experience: '3+ years',
    description: 'Seeking a dedicated pediatric specialist to provide comprehensive care...',
    requirements: [
      'Board certification in Pediatrics',
      '3+ years of pediatric experience',
      'Strong communication skills',
      'Experience with complex cases',
    ],
    postedDate: new Date().toISOString().split('T')[0],
  },
];

export const useCareersStore = defineStore('careers', {
  state: () => ({
    jobs: getStored<Job[]>('careersJobs', defaultJobs),
    applications: getStored<Application[]>('careersApplications', []),
    error: null as string | null,
  }),
  actions: {
    addJob(job: Omit<Job, 'id' | 'postedDate'>) {
      const newJob: Job = {
        ...job,
        id: Date.now().toString(),
        postedDate: new Date().toISOString().split('T')[0],
      };
      this.jobs.push(newJob);
      localStorage.setItem('careersJobs', JSON.stringify(this.jobs));
    },
    updateJob(job: Job) {
      const index = this.jobs.findIndex((j) => j.id === job.id);
      if (index !== -1) {
        this.jobs[index] = job;
        localStorage.setItem('careersJobs', JSON.stringify(this.jobs));
      }
    },
    deleteJob(id: string) {
      this.jobs = this.jobs.filter((j) => j.id !== id);
      localStorage.setItem('careersJobs', JSON.stringify(this.jobs));
    },
    addApplication(application: Application) {
      this.applications.push(application);
      localStorage.setItem('careersApplications', JSON.stringify(this.applications));
    },
    setError(msg: string | null) {
      this.error = msg;
    },
  },
});
