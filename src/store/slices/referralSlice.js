import { createSlice } from '@reduxjs/toolkit';

// Define default schedules first to avoid reference error
const defaultSchedules = [
  {
    doctorId: 1,
    name: "Dr. Namala Angella",
    specialty: "Consultant Obstetrician / Gynecologist - UG, MBCHB, M.MED, MBA, F-RAEI, FMAS, Member ECSACOG, Member AOGU & Uganda Medical Association",
    availableSlots: [
      { date: "2025-06-06", time: "09:00" },
      { date: "2025-06-11", time: "10:00" },
      { date: "2025-06-21", time: "14:00" },
    ]
  },
  {
    doctorId: 1,
    name: "Dr. Nuwamanya Lilian",
    specialty: "GP - UG, MBCHB - Internal Medicine",
    availableSlots: [
      { date: "2025-05-20", time: "09:00" },
      { date: "2025-06-07", time: "09:00" },
      { date: "2025-06-11", time: "09:00" },
    ]
  },
  // Add more default schedules as needed
];

const initialState = {
  referrals: JSON.parse(localStorage.getItem('referrals')) || [],
  schedules: JSON.parse(localStorage.getItem('schedules')) || defaultSchedules,
};

const referralSlice = createSlice({
  name: 'referral',
  initialState,
  reducers: {
    addReferral: (state, action) => {
      state.referrals.push(action.payload);
      localStorage.setItem('referrals', JSON.stringify(state.referrals));
    },
    updateSchedules: (state, action) => {
      state.schedules = action.payload;
      localStorage.setItem('schedules', JSON.stringify(action.payload));
    },
  },
});

export const { addReferral, updateSchedules } = referralSlice.actions;
export default referralSlice.reducer;