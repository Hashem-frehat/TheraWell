import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookedAppointments } from "../../store/thunks/appointmentThunks";
import { format, isPast } from "date-fns";

const AppointmentsPage = () => {
  const dispatch = useDispatch();
  const { bookedAppointments, status, error } = useSelector(
    (state) => state.appointments
  );
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    dispatch(fetchBookedAppointments());
  }, [dispatch]);

  if (status === "loading") {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  const finishedAppointments = bookedAppointments.filter((appointment) =>
    isPast(new Date(appointment.appointment_date))
  );

  const upcomingAppointments = bookedAppointments.filter(
    (appointment) => !isPast(new Date(appointment.appointment_date))
  );

  const renderAppointments = (appointments) => (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
            Patient Name
          </th>
          <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
            Appointment Date
          </th>
          <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
            Appointment Time
          </th>
          <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
            Patient Email
          </th>
          <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
            Patient Phone
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {appointments.map((appointment) => (
          <tr key={appointment.appointment_id} className="hover:bg-gray-50">
            <td className="py-4 px-4 whitespace-nowrap">
              {appointment.patient_name}
            </td>
            <td className="py-4 px-4 whitespace-nowrap">
              {format(new Date(appointment.appointment_date), "yyyy-MM-dd")}
            </td>
            <td className="py-4 px-4 whitespace-nowrap">
              {appointment.appointment_time}
            </td>
            <td className="py-4 px-4 whitespace-nowrap">
              {appointment.patient_email}
            </td>
            <td className="py-4 px-4 whitespace-nowrap">
              {appointment.patient_phone}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Booked Appointments</h1>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded-tl-lg rounded-tr-lg ${
            activeTab === "upcoming"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`px-4 py-2 rounded-tl-lg rounded-tr-lg ${
            activeTab === "finished"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("finished")}
        >
          Finished
        </button>
      </div>
      {activeTab === "upcoming" && renderAppointments(upcomingAppointments)}
      {activeTab === "finished" && renderAppointments(finishedAppointments)}
    </div>
  );
};

export default AppointmentsPage;
