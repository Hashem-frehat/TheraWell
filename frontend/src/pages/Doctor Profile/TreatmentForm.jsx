import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTreatment,
  updateTreatment,
} from "../../store/slices/patientRecordsSlice";

const TreatmentForm = ({ patientId, doctorId, existingTreatment = null }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    treatmentName: existingTreatment?.treatment_name || "",
    diagnosis: existingTreatment?.diagnosis || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const treatmentData = {
      patientId,
      doctorId,
      treatmentId: existingTreatment?.treatment_id,
      ...formData,
    };

    try {
      if (existingTreatment) {
        await dispatch(
          updateTreatment({
            recordId: existingTreatment.record_id,
            treatmentData,
          })
        );
      } else {
        await dispatch(addTreatment(treatmentData));
      }
      // Reset form after submission
      setFormData({
        treatmentName: "",
        diagnosis: "",
      });
    } catch (err) {
      setError("Failed to submit the treatment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label
          htmlFor="treatmentName"
          className="block text-sm font-medium text-gray-700"
        >
          Treatment Name
        </label>
        <input
          type="text"
          name="treatmentName"
          id="treatmentName"
          value={formData.treatmentName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label
          htmlFor="diagnosis"
          className="block text-sm font-medium text-gray-700"
        >
          Diagnosis
        </label>
        <textarea
          name="diagnosis"
          id="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        ></textarea>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : existingTreatment
          ? "Update Treatment"
          : "Add Treatment"}
      </button>
    </form>
  );
};

export default TreatmentForm;
