import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPatientRecords = createAsyncThunk(
  "history/fetchPatientRecords",
  async (patientId) => {
    const response = await axios.get(
      `http://localhost:5000/api/patient-records/history/${patientId}`,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const fetchTreatments = createAsyncThunk(
  "history/fetchTreatments",
  async (patientId) => {
    const response = await axios.get(
      `http://localhost:5000/api/patient-treatment`
    );
    return response.data;
  }
);

export const addTreatment = createAsyncThunk(
  "history/addTreatment",
  async (newTreatment) => {
    const response = await axios.post(
      "http://localhost:5000/api/patient-records/treatments",
      newTreatment
    );
    return response.data;
  }
);

export const updateTreatment = createAsyncThunk(
  "history/updateTreatment",
  async (treatment, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/patient-records/${treatment.treatment_id}`, // Ensure ID is in the URL
        {
          treatmentName: treatment.treatment_name, // Payload for update
          description: treatment.treatment_description,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: "Network error" });
      }
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    records: [],
    treatments: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientRecords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatientRecords.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.records = action.payload;
      })
      .addCase(fetchPatientRecords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTreatments.fulfilled, (state, action) => {
        state.treatments = action.payload;
      })
      .addCase(addTreatment.fulfilled, (state, action) => {
        state.treatments.push(action.payload);
      })
      .addCase(updateTreatment.fulfilled, (state, action) => {
        const updatedTreatment = action.payload;
        state.treatments = state.treatments.map((treatment) =>
          treatment.treatment_id === updatedTreatment.treatment_id
            ? updatedTreatment
            : treatment
        );
      });
  },
});

export default historySlice.reducer;
