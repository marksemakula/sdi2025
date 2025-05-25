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
    // Add careers initial state if needed
    ...careersReducer(undefined, {})
  },
  telemedicine: {
    // Add telemedicine initial state if needed
    ...telemedicineReducer(undefined, {})
  },
  blog: {
    // Initialize blog state
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
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp', 'payload.error'],
        // Ignore these paths in the state
        ignoredPaths: [
          'referral.schedules', 
          'telemedicine.someNonSerializableField',
          'blog.posts.image' // If you have non-serializable image data
        ]
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

// Optional: Subscribe to store changes for persistence
store.subscribe(() => {
  try {
    const { referral, blog } = store.getState();
    
    // Persist referral data
    localStorage.setItem('referrals', JSON.stringify(referral.referrals));
    localStorage.setItem('schedules', JSON.stringify(referral.schedules));
    
    // Persist blog posts if they exist
    if (blog.posts && blog.posts.length > 0) {
      localStorage.setItem('blogPosts', JSON.stringify(blog.posts));
    }
  } catch (error) {
    console.error('Error persisting state to localStorage:', error);
  }
});

// Export the store instance
export default store;