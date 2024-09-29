import React, { useState } from "react";
import TabSelector from "./TabSelector";
import PatientRecords from "./PatientRecords";
import Appointments from "./Appointments";
import Profile from "./Profile";
import DoctorAppointmentSetter from "./DoctorAppointmentSetter";

const DoctorProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Doctor Dashboard
      </h1>

      <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="bg-white p-4 rounded-lg shadow">
        {activeTab === "patients" && <PatientRecords />}

        {activeTab === "profile" && <Profile />}
        {activeTab === "setAppointment" && <DoctorAppointmentSetter />}
      </div>
    </div>
  );
};

export default DoctorProfilePage;
