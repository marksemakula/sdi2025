import { configureStore } from '@reduxjs/toolkit';
import referralReducer from './slices/referralSlice';
import careersReducer from './slices/careersSlice';
import telemedicineReducer from './slices/telemedicineSlice';
import blogReducer from './slices/blogSlice';

// Enhanced localStorage handling with error protection
const getLocalStorageData = (key, defaultValue) => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Initialize state with safe localStorage access
const preloadedState = {
  referral: {
    referrals: getLocalStorageData('referrals', []),
    schedules: getLocalStorageData('schedules', referralReducer(undefined, {}).schedules)
  },
  careers: {
    jobs: getLocalStorageData('careersJobs', [
      {
        id: '1',
        title: "Senior Cardiologist",
        department: "Cardiology",
        location: "Main Medical Center",
        type: "Full-time",
        experience: "5+ years",
        description: "Looking for an experienced cardiologist to join our heart center team...",
        requirements: [
          "Board certification in Cardiology",
          "5+ years of clinical experience",
          "Strong research background",
          "Excellent patient care skills"
        ],
        postedDate: new Date().toISOString().split('T')[0]
      },
      {
        id: '2',
        title: "Pediatric Specialist",
        department: "Pediatrics",
        location: "Children's Wing",
        type: "Full-time",
        experience: "3+ years",
        description: "Seeking a dedicated pediatric specialist to provide comprehensive care...",
        requirements: [
          "Board certification in Pediatrics",
          "3+ years of pediatric experience",
          "Strong communication skills",
          "Experience with complex cases"
        ],
        postedDate: new Date().toISOString().split('T')[0]
      }
    ]),
    applications: getLocalStorageData('careersApplications', []),
    error: null
  },
  telemedicine: {
    ...telemedicineReducer(undefined, {})
  },
  blog: {
    posts: getLocalStorageData('blogPosts', []),
    loading: false,
    error: null
  }
};

export const store = configureStore({
  reducer: {
    referral: referralReducer,
    careers: careersReducer,
    telemedicine: telemedicineReducer,
    blog: blogReducer
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.timestamp', 'payload.error'],
        ignoredPaths: [
          'referral.schedules',
          'telemedicine.someNonSerializableField',
          'blog.posts.image',
          'careers.jobs.requirements' // If requirements contain non-serializable data
        ]
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

// Subscribe to store changes for persistence
store.subscribe(() => {
  try {
    const { referral, careers, blog } = store.getState();
    
    // Persist referral data
    localStorage.setItem('referrals', JSON.stringify(referral.referrals));
    localStorage.setItem('schedules', JSON.stringify(referral.schedules));
    
    // Persist careers data
    localStorage.setItem('careersJobs', JSON.stringify(careers.jobs));
    localStorage.setItem('careersApplications', JSON.stringify(careers.applications));
    
    // Persist blog posts
    localStorage.setItem('blogPosts', JSON.stringify(blog.posts));
  } catch (error) {
    console.error('Error persisting state to localStorage:', error);
  }
});

export default store;