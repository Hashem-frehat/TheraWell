import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setAppointmentSlots = createAsyncThunk(
  "timeSlots/setAppointmentSlots",
  async ({ date, slots }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments/set-slots",
        {
          date: date,
          timeSlots: slots,
        },
        { withCredentials: true }
      );

      // Update sessionStorage
      const storedData = JSON.parse(
        sessionStorage.getItem("dateTimeSlots") || "{}"
      );
      storedData[date] = slots;
      sessionStorage.setItem("dateTimeSlots", JSON.stringify(storedData));

      console.log("API Response:", response.data);
      return { date, slots };
    } catch (error) {
      console.error("Error posting appointment slots:", error);
      return rejectWithValue(error.response.data);
    }
  }
);
