import React, { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa"; // Icons for status and search
import { MdEdit } from "react-icons/md"; // Icon for edit actions
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointments,
  setSearchTerm,
  setCurrentPage,
} from "../../store/slices/appointmentsSlice"; // Adjust the path as needed

const Appointments = () => {
  const dispatch = useDispatch();
  const {
    appointments,
    loading,
    error,
    searchTerm,
    currentPage,
    appointmentsPerPage,
  } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  // Filter appointments based on search term
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.doctor_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.patient_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current appointments for the current page
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  // Calculate total pages
  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage
  );

  // Pagination handlers
  const handlePrevPage = () => {
    dispatch(setCurrentPage(Math.max(1, currentPage - 1)));
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(Math.min(totalPages, currentPage + 1)));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-indigo-700">
          Appointments
        </h2>

        {/* Search bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by doctor or patient name..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
          <FaSearch className="absolute top-4 left-3 text-gray-500" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead className="bg-indigo-700">
              <tr>
                <th className="py-4 px-6 border-b font-semibold text-left text-white">
                  Doctor
                </th>
                <th className="py-4 px-6 border-b font-semibold text-left text-white">
                  Patient
                </th>
                <th className="py-4 px-6 border-b font-semibold text-left text-white">
                  Date
                </th>
                <th className="py-4 px-6 border-b font-semibold text-left text-white">
                  Time
                </th>
                <th className="py-4 px-6 border-b font-semibold text-left text-white">
                  Status
                </th>
                <th className="py-4 px-6 border-b font-semibold text-left text-white">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {currentAppointments.length > 0 ? (
                currentAppointments.map((appointment) => (
                  <tr
                    key={appointment.appointment_id}
                    className="hover:bg-gray-100 transition-colors duration-200"
                  >
                    <td className="py-4 px-6 text-gray-700">
                      {appointment.doctor_name}
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {appointment.patient_name || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {new Date(
                        appointment.appointment_date
                      ).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {appointment.appointment_time}
                    </td>

                    <td className="py-4 px-6 text-gray-700">
                      {appointment.status}
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {appointment.notes || "No notes available"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`py-2 px-4 rounded ${
              currentPage === 1
                ? "bg-gray-300"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          >
            Prev
          </button>

          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`py-2 px-4 rounded ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
