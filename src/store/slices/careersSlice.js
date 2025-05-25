import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: JSON.parse(localStorage.getItem('applications')) || [],
};

const careersSlice = createSlice({
  name: 'careers',
  initialState,
  reducers: {
    addApplication: (state, action) => {
      state.applications.push(action.payload);
      localStorage.setItem('applications', JSON.stringify(state.applications));
    },
    removeApplication: (state, action) => {
      state.applications = state.applications.filter(app => app.email !== action.payload);
      localStorage.setItem('applications', JSON.stringify(state.applications));
    },
  },
});

export const { addApplication, removeApplication } = careersSlice.actions;
export default careersSlice.reducer;