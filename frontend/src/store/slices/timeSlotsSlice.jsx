import { createSlice } from "@reduxjs/toolkit";
import { setAppointmentSlots } from "../thunks/timeSlotThunks";

const timeSlotsSlice = createSlice({
  name: "timeSlots",
  initialState: {
    dateTimeSlots: {}, // Maps dates to their selected time slots
  },
  reducers: {
    setTimeSlots: (state, action) => {
      const { date, slots } = action.payload;
      state.dateTimeSlots[date] = slots; // Save slots for the specific date
    },
    getTimeSlots: (state, action) => {
      const date = action.payload;
      return state.dateTimeSlots[date] || []; // Retrieve slots for the specific date
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setAppointmentSlots.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setAppointmentSlots.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dateTimeSlots[action.payload.date] = action.payload.slots;
        state.error = null;
      })
      .addCase(setAppointmentSlots.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setTimeSlots, getTimeSlots } = timeSlotsSlice.actions;
export default timeSlotsSlice.reducer;
