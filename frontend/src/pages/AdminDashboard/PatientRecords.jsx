import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaSearch, FaUserAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

const PatientRecords = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/admin');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/users/admin/${id}/status`, {
        isActive: !currentStatus,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user_id === id ? { ...user, isactive: !currentStatus } : user
        )
      );

      Swal.fire({
        title: `User ${!currentStatus ? 'activated' : 'deactivated'}!`,
        text: `The user has been ${!currentStatus ? 'activated' : 'deactivated'} successfully.`,
        icon: !currentStatus ? 'success' : 'warning',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update the user status.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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
      <div className="container mx-auto bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-bold mb-8 text-indigo-800 text-center">Patient Records</h2>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-4 pl-12 border-2 border-indigo-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-5 left-4 text-indigo-500 text-xl" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
              <tr>
                <th className="py-4 px-6 text-left text-white font-semibold">Name</th>
                <th className="py-4 px-6 text-left text-white font-semibold">Email</th>
                <th className="py-4 px-6 text-left text-white font-semibold">Phone</th>
                <th className="py-4 px-6 text-left text-white font-semibold">Status</th>
                <th className="py-4 px-6 text-left text-white font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <motion.tr
                      key={user.email}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-indigo-50 transition-colors duration-300"
                    >
                      <td className="py-4 px-6 text-gray-800 flex items-center">
                        <FaUserAlt className="text-indigo-500 mr-3" />
                        {user.name}
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        <div className="flex items-center">
                          <FaEnvelope className="text-indigo-500 mr-3" />
                          {user.email}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        <div className="flex items-center">
                          <FaPhone className="text-indigo-500 mr-3" />
                          {user.phone || 'N/A'}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        <span className={`flex items-center px-3 py-1 rounded-full text-sm font-semibold ${user.isactive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                          {user.isactive ? (
                            <FaCheckCircle className="mr-2" />
                          ) : (
                            <FaTimesCircle className="mr-2" />
                          )}
                          {user.isactive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleStatus(user.user_id, user.isactive)}
                          className={`py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out flex items-center ${
                            user.isactive ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}
                        >
                          <MdEdit className="mr-2" />
                          {user.isactive ? 'Deactivate' : 'Activate'}
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 px-6 text-center text-gray-500 text-lg">
                      No users found
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`py-2 px-6 rounded-full font-semibold ${
              currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
          >
            Previous
          </motion.button>

          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`py-2 px-6 rounded-full font-semibold ${
              currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
          >
            Next
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientRecords;