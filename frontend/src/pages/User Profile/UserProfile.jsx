import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../store/slices/userSlice";
import { User, Mail, Lock, Edit2, Save, X, AlertCircle, CheckCircle } from "lucide-react";
import Navbar from "../../components/navbar";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  const { user, loading, error, successMessage } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData(prevState => ({
        ...prevState,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUserProfile(formData));
    if (!error) {
      setIsEditing(false);
      setFormData(prevState => ({
        ...prevState,
        currentPassword: "",
        newPassword: "",
      }));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(prevState => ({
      ...prevState,
      name: user.name,
      email: user.email,
      currentPassword: "",
      newPassword: "",
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8" style={{
      backgroundImage: "url('https://img.freepik.com/free-photo/stethoscope-clipboard_23-2147652325.jpg?w=996&t=st=1727079292~exp=1727079892~hmac=758d7d04dcb527877dda725ae21d1c992aea961dd82f16d166642ad3bbfadd5e')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <Navbar />
      <div className="max-w-md mx-auto bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-20">
        <div className="md:flex">
          <div className="md:shrink-0">
            <div className="h-48 w-full object-cover md:h-full md:w-48 bg-blue-500 flex items-center justify-center">
              <User size={64} className="text-white" />
            </div>
          </div>
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold mb-1">
              Hospital User Profile
            </div>
            <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
              {formData.name}
            </h2>
            {error && (
              <div className="mt-4 flex items-center text-red-500">
                <AlertCircle size={20} className="mr-2" />
                <span>{error}</span>
              </div>
            )}
            {successMessage && (
              <div className="mt-4 flex items-center text-green-500">
                <CheckCircle size={20} className="mr-2" />
                <span>{successMessage}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                  <User size={16} className="mr-2" />
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                  <Mail size={16} className="mr-2" />
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {isEditing && (
                <>
                  <div className="mb-4">
                    <label htmlFor="currentPassword" className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                      <Lock size={16} className="mr-2" />
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                      <Lock size={16} className="mr-2" />
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </>
              )}
              <div className="flex items-center justify-end">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                  >
                    <Edit2 size={16} className="mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 flex items-center"
                    >
                      <X size={16} className="mr-2" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                    >
                      <Save size={16} className="mr-2" />
                      {loading ? "Updating..." : "Save Changes"}
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;