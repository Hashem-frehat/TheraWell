import { createSlice } from "@reduxjs/toolkit";
import { fetchBookedAppointments } from "../thunks/appointmentThunks";

const appointmentsSlice = createSlice({
  name: "appointments-doctor",
  initialState: {
    bookedAppointments: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookedAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookedAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookedAppointments = action.payload;
        state.error = null;
      })
      .addCase(fetchBookedAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default appointmentsSlice.reducer;
