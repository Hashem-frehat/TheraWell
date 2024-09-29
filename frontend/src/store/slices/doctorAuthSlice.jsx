import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginDoctor = createAsyncThunk(
  "authDoctor/loginDoctor",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/doctorAuth/doctorLogin",
        { email, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authDoctorSlice = createSlice({
  name: "authDoctor",
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginDoctor.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginDoctor.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default authDoctorSlice.reducer;
