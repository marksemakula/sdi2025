// src/store/slices/careersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [
    {
      id: '1',
      title: 'General Practitioner',
      department: 'Primary Care',
      location: 'New York',
      type: 'Full-time',
      description: 'Provide comprehensive medical care to patients...',
      requirements: 'MD degree, valid license, 3+ years experience',
      postedDate: '2023-05-15'
    }
  ],
  applications: [],
  error: null
};

const careersSlice = createSlice({
  name: 'careers',
  initialState,
  reducers: {
    addJob: (state, action) => {
      const newJob = {
        ...action.payload,
        id: Date.now().toString(),
        postedDate: new Date().toISOString().split('T')[0]
      };
      state.jobs.push(newJob);
    },
    updateJob: (state, action) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
    },
    addApplication: (state, action) => {
      state.applications.push(action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { 
  addJob, 
  updateJob, 
  deleteJob, 
  addApplication, 
  setError, 
  clearError 
} = careersSlice.actions;

export default careersSlice.reducer;