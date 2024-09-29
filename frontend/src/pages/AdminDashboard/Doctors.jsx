import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaSearch, FaUserMd } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { motion } from 'framer-motion';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(5);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctor/admin');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const toggleActiveStatus = async (doctorId, isActive) => {
    try {
      await axios.put(`http://localhost:5000/api/doctor/admin/${doctorId}/status`, {
        isActive: !isActive,
      });

      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor.doctor_id === doctorId ? { ...doctor, isactive: !isActive } : doctor
        )
      );

      Swal.fire({
        icon: isActive ? 'error' : 'success',
        title: isActive ? 'Doctor Account Deactivated' : 'Doctor Account Activated',
        text: `The doctor account has been ${isActive ? 'deactivated' : 'activated'} successfully.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error toggling doctor status:', error);
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-8 bg-gradient-to-br from-indigo-100 to-purple-100"
    >
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-indigo-700 flex items-center">
          <FaUserMd className="mr-3" />
          Doctors Dashboard
        </h2>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-5 left-4 text-gray-500" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-indigo-700">
              <tr>
                <th className="py-4 px-6 text-left text-white font-semibold">Name</th>
                <th className="py-4 px-6 text-left text-white font-semibold">Email</th>
                {/* <th className="py-4 px-6 text-left text-white font-semibold">Description</th> */}
                <th className="py-4 px-6 text-left text-white font-semibold">Status</th>
                <th className="py-4 px-6 text-left text-white font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentDoctors.length > 0 ? (
                currentDoctors.map((doctor) => (
                  <motion.tr
                    key={doctor.doctor_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-indigo-50 transition-colors duration-200"
                  >
                    <td className="py-4 px-6 text-gray-700">{doctor.name}</td>
                    <td className="py-4 px-6 text-gray-700">{doctor.email}</td>
                    {/* <td className="py-4 px-6 text-gray-700">{doctor.description}</td> */}
                    <td className="py-4 px-6 text-gray-700 flex items-center">
                      {doctor.isactive ? (
                        <FaCheckCircle className="text-green-500 mr-2" />
                      ) : (
                        <FaTimesCircle className="text-red-500 mr-2" />
                      )}
                      {doctor.isactive ? 'Active' : 'Inactive'}
                    </td>
                    <td className="py-4 px-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleActiveStatus(doctor.doctor_id, doctor.isactive)}
                        className={`py-2 px-4 flex items-center rounded-full shadow-lg transition duration-200 ease-in-out ${
                          doctor.isactive
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        <MdEdit className="mr-2" />
                        {doctor.isactive ? 'Deactivate' : 'Activate'}
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                    No doctors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`py-2 px-4 rounded-full ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
          >
            Prev
          </motion.button>

          <span className="text-gray-700 font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`py-2 px-4 rounded-full ${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
          >
            Next
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Doctors;
