import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBookedAppointments = createAsyncThunk(
  "appointments/fetchBooked",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments/booked",
        { withCredentials: true }
      );
      return response.data.bookedAppointments;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
