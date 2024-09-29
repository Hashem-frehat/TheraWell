import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientRecords } from "../../store/slices/patientRecordsSlice";
import TreatmentForm from "./TreatmentForm";
import PatientHistory from "./PatientHistory";

const PatientRecords = () => {
  const dispatch = useDispatch();
  const patientRecords = useSelector((state) => state.patientRecords.records);
  const status = useSelector((state) => state.patientRecords.status);
  const error = useSelector((state) => state.patientRecords.error);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatientRecords());
    }
  }, [status, dispatch]);

  const hasRecords = Array.isArray(patientRecords) && patientRecords.length > 0;

  return (
    <div className="container mx-auto p-6 bg-gradient-to-b from-blue-100 to-green-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-blue-800 border-b pb-4">
        Patient Records
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {/* Patients List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            Patients Appointments
          </h2>
          {hasRecords ? (
            <ul className="space-y-3 max-h-96 overflow-y-auto">
              {patientRecords.map((record) => (
                <li
                  key={record.record_id}
                  className="cursor-pointer p-3 rounded-md transition-colors bg-yellow-100 hover:bg-yellow-200"
                  onClick={() => setSelectedPatient(record)}
                >
                  <h3 className="font-medium">
                    Patient Name: {record.patient_name}
                  </h3>
                  <h3 className="font-medium">
                    Appointment Date: {record.appointment_date}
                  </h3>
                  <h3 className="font-medium">
                    Appointment Time: {record.appointment_time}
                  </h3>
                  <h3 className="font-medium">Notes: {record.notes}</h3>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No patient records found.</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <PatientHistory />
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
