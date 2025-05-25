import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  consultations: JSON.parse(localStorage.getItem('consultations')) || [],
  currentConsultation: null,
};

const telemedicineSlice = createSlice({
  name: 'telemedicine',
  initialState,
  reducers: {
    addPreConsultation: (state, action) => {
      state.currentConsultation = action.payload;
      state.consultations.push({
        ...action.payload,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('consultations', JSON.stringify(state.consultations));
    },
    endConsultation: (state) => {
      state.currentConsultation = null;
    },
  },
});

export const { addPreConsultation, endConsultation } = telemedicineSlice.actions;
export default telemedicineSlice.reducer;