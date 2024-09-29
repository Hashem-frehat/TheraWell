// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchPatientRecords = createAsyncThunk(
//   "patientRecords/fetchPatientRecords",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/patient-records/doctor",
//         { withCredentials: true }
//       );
//       console.log("Fetched Patient Records:", response.data); // Log the response data
//       return response.data;
//     } catch (err) {
//       console.error("Error fetching patient records:", err.response.data);
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const addTreatment = createAsyncThunk(
//   "patientRecords/addTreatment",
//   async (treatmentData) => {
//     const response = await axios.post(
//       "http://localhost:5000/api/patient-records/",
//       treatmentData
//     );
//     return response.data;
//   }
// );

// export const updateTreatment = createAsyncThunk(
//   "patientRecords/updateTreatment",
//   async ({ recordId, treatmentData }) => {
//     const response = await axios.put(
//       `http://localhost:5000/api/patient-records/${recordId}`,
//       treatmentData
//     );
//     return response.data;
//   }
// );

// const patientRecordsSlice = createSlice({
//   name: "patientRecords",
//   initialState: {
//     records: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPatientRecords.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchPatientRecords.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.records = action.payload;
//       })
//       .addCase(fetchPatientRecords.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload.error || "Could not fetch patient records";
//       })
//       .addCase(addTreatment.fulfilled, (state, action) => {
//         state.records.push(action.payload);
//       })
//       .addCase(updateTreatment.fulfilled, (state, action) => {
//         const index = state.records.findIndex(
//           (record) => record.record_id === action.payload.record_id
//         );
//         if (index !== -1) {
//           state.records[index] = action.payload;
//         }
//       });
//   },
// });

// export default patientRecordsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPatientRecords = createAsyncThunk(
  "patientRecords/fetchPatientRecords",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/patient-records/doctor",
      { withCredentials: true }
    ); // Adjust the endpoint as needed
    return response.data;
  }
);

export const addTreatment = createAsyncThunk(
  "patientRecords/addTreatment",
  async (treatmentData) => {
    const response = await axios.post(
      "http://localhost:5000/api/patient-records/",
      treatmentData
    );
    return response.data;
  }
);
export const updateTreatment = createAsyncThunk(
  "patientRecords/updateTreatment",
  async ({ recordId, treatmentData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/patient-records/${recordId}`,
      treatmentData
    );
    return response.data;
  }
);

const patientRecordsSlice = createSlice({
  name: "patientRecords",
  initialState: {
    records: [],
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
      .addCase(addTreatment.fulfilled, (state, action) => {
        state.records.push(action.payload);
      })
      .addCase(updateTreatment.fulfilled, (state, action) => {
        const index = state.records.findIndex(
          (record) => record.record_id === action.payload.record_id
        );
        if (index !== -1) {
          state.records[index] = action.payload;
        }
      });
  },
});

export default patientRecordsSlice.reducer;
