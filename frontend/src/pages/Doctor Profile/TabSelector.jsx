import React from "react";

const TabSelector = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-4 flex flex-row gap-2">
      <button
        className={`px-4 py-2 rounded-t-lg ${
          activeTab === "profile"
            ? "bg-white text-blue-600"
            : "bg-gray-200 text-gray-600"
        }`}
        onClick={() => setActiveTab("profile")}
      >
        Profile
      </button>{" "}
      <button
        className={`px-4 py-2 rounded-t-lg ${
          activeTab === "patients"
            ? "bg-white text-blue-600"
            : "bg-gray-200 text-gray-600"
        }`}
        onClick={() => setActiveTab("patients")}
      >
        Patient Records
      </button>
      <button
        className={`px-4 py-2 rounded-t-lg ${
          activeTab === "setAppointment"
            ? "bg-white text-blue-600"
            : "bg-gray-200 text-gray-600"
        }`}
        onClick={() => setActiveTab("setAppointment")}
      >
        Set Appointment
      </button>
    </div>
  );
};

export default TabSelector;
