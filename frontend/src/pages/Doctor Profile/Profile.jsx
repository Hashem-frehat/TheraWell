import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctorProfile,
  updateDoctorProfile,
} from "../../store/slices/doctorSlice";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  DollarSign,
  Award,
} from "lucide-react";
import Swal from "sweetalert2";

const DoctorProfile = () => {
  const dispatch = useDispatch();
  const { profile, status, error } = useSelector((state) => state.doctor || []);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    dispatch(fetchDoctorProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setEmail(profile.email);
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDoctorProfile({ email, oldPassword, newPassword }))
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been successfully updated.",
          confirmButtonColor: "#307BC4",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to update profile: " + error.message,
          confirmButtonColor: "#307BC4",
        });
      });
  };

  if (status === "loading")
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  if (status === "failed")
    return <div className="text-red-500 text-center">Error: {error}</div>;
  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-20 bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
        <h2 className="text-3xl font-bold mb-2 flex items-center">
          <User className="mr-2" /> Doctor Profile
        </h2>
        <p className="text-blue-100">Healing with expertise and compassion</p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <InfoItem icon={<User />} label="Name" value={profile.name} />
          <InfoItem
            icon={<Award />}
            label="Years of Experience"
            value={profile.years_of_experience}
          />
          <InfoItem
            icon={<DollarSign />}
            label="Price"
            value={`$${profile.price}`}
          />
          <InfoItem
            icon={<Phone />}
            label="Contact Number"
            value={profile.contact_number}
          />
          <InfoItem
            icon={<Calendar />}
            label="Availability"
            value={profile.availability}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            icon={<Mail />}
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            icon={<Lock />}
            label="Current Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <InputField
            icon={<Lock />}
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50 transition duration-300">
    <div className="text-blue-500">{icon}</div>
    <div>
      <span className="font-semibold text-gray-700">{label}:</span>{" "}
      <span className="text-gray-600">{value}</span>
    </div>
  </div>
);

const InputField = ({ icon, label, type, value, onChange }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-4 sm:text-lg border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-300 h-11"
        required
      />
    </div>
  </div>
);

export default DoctorProfile;
