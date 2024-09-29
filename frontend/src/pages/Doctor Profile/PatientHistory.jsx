import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPatientRecords,
  fetchTreatments,
  addTreatment,
  updateTreatment,
} from "../../store/slices/historyRecordsSlice";

const PatientHistory = ({ doctorId }) => {
  const dispatch = useDispatch();
  const { records, status, error } = useSelector((state) => state.history);

  const [newTreatment, setNewTreatment] = useState({
    treatment_name: "",
    description: "",
  });
  const [editingTreatment, setEditingTreatment] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatientRecords(doctorId));
      dispatch(fetchTreatments());
    }
  }, [status, dispatch, doctorId]);

  const handleAddTreatment = () => {
    if (!newTreatment.treatment_name || !newTreatment.description) {
      alert("Please provide treatment name and description.");
      return;
    }
    dispatch(addTreatment(newTreatment))
      .unwrap()
      .then(() => {
        setNewTreatment({ treatment_name: "", description: "" });
        dispatch(fetchPatientRecords(doctorId)); // Refresh patient records after adding a treatment
      });
  };

  const handleEditTreatment = (record) => {
    setEditingTreatment({
      treatment_id: record.treatment_id,
      treatment_name: record.treatment_name,
      treatment_description: record.treatment_description,
    });
  };

  const handleUpdateTreatment = () => {
    dispatch(updateTreatment(editingTreatment))
      .unwrap()
      .then(() => {
        setEditingTreatment(null);
        dispatch(fetchPatientRecords(doctorId)); // Refresh patient records after updating the treatment
      })
      .catch((error) => {
        console.error("Error updating treatment:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-gradient-to-r from-blue-50 to-green-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">
        Patient Records
      </h2>

      {/* Patient records */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((record) => (
          <div
            key={record.record_id}
            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold text-green-600">
              {record.patient_name}
            </h3>
            <p className="text-gray-600">Age: {record.age}</p>
            <p className="text-gray-600">Diagnosis: {record.diagnosis}</p>
            <p className="text-gray-600">Treatment: {record.treatment_name}</p>
            <p className="text-gray-600">
              Description: {record.treatment_description}
            </p>
            <p className="text-gray-600">Section: {record.treatment_section}</p>
            <div className="flex justify-end mt-2">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => handleEditTreatment(record)}
              >
                Edit Treatment
              </button>
            </div>

            {/* Edit Treatment Form */}
            {editingTreatment?.treatment_id === record.treatment_id && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-purple-500">
                  Edit Treatment
                </h4>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="border border-purple-400 rounded-lg p-2 mr-2 flex-1"
                    placeholder="Treatment Name"
                    value={editingTreatment.treatment_name}
                    onChange={(e) =>
                      setEditingTreatment({
                        ...editingTreatment,
                        treatment_name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="border border-purple-400 rounded-lg p-2 mr-2 flex-1"
                    placeholder="Description"
                    value={editingTreatment.treatment_description}
                    onChange={(e) =>
                      setEditingTreatment({
                        ...editingTreatment,
                        treatment_description: e.target.value,
                      })
                    }
                  />
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleUpdateTreatment}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            <p className="text-sm text-gray-500 mt-2">
              Last Updated: {new Date(record.updated_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientHistory;
