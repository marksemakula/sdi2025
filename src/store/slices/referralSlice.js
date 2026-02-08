import { createSlice } from '@reduxjs/toolkit';

// Generate available slots for all days of the week (Monday-Sunday, 08:30-18:30)
const generateWeeklySlots = () => {
  const slots = [];
  const today = new Date();
  
  // Generate slots for the next 4 weeks
  for (let week = 0; week < 4; week++) {
    for (let day = 0; day < 7; day++) {
      const date = new Date(today);
      // Find the next occurrence of each day of the week
      const currentDay = today.getDay();
      const daysUntilTarget = (day - currentDay + 7) % 7;
      date.setDate(today.getDate() + daysUntilTarget + (week * 7));
      
      // Skip past dates
      if (date < today) continue;
      
      const dateString = date.toISOString().split('T')[0];
      
      // Generate time slots from 08:30 to 18:30 (every 30 minutes)
      const timeSlots = [
        '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00',
        '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
      ];
      
      timeSlots.forEach(time => {
        slots.push({ date: dateString, time });
      });
    }
  }
  
  // Sort by date and time
  return slots.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.time.localeCompare(b.time);
  });
};

// Define default schedules with auto-generated availability
const defaultSchedules = [
  {
    doctorId: 1,
    name: "Dr. Namala Angella",
    specialty: "Consultant Obstetrician / Gynecologist - UG, MBCHB, M.MED, MBA, F-RAEI, FMAS, Member ECSACOG, Member AOGU & Uganda Medical Association",
    availableSlots: generateWeeklySlots()
  },
  {
    doctorId: 2,
    name: "Dr. Nuwamanya Lilian",
    specialty: "GP - UG, MBCHB - Internal Medicine",
    availableSlots: generateWeeklySlots()
  },
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