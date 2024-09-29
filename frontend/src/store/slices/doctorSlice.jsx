import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/doctors";

export const fetchDoctorProfile = createAsyncThunk(
  "doctor/fetchProfile",
  async () => {
    const response = await axios.get(`${API_URL}/getById`, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const updateDoctorProfile = createAsyncThunk(
  "doctor/updateProfile",
  async ({ email, oldPassword, newPassword }) => {
    const response = await axios.put(
      `${API_URL}/putById`,
      {
        email,
        oldPassword, // Add current password for verification
        newPassword, // Add new password to be updated
      },
      { withCredentials: true }
    );
    return response.data;
  }
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    profile: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctorProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchDoctorProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateDoctorProfile.fulfilled, (state, action) => {
        state.profile = { ...state.profile, ...action.payload }; // Update profile with the returned data
      });
  },
});

export default doctorSlice.reducer;
