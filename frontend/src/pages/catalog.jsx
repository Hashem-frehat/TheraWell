import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import {
  User,
  Mail,
  DollarSign,
  Briefcase,
  Phone,
  FileText,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
const Catalog = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/catalog/doctors"
        );
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleDoctorClick = (doctor_id) => {
    sessionStorage.setItem("selectedDoctorId", doctor_id);
    navigate("/doctorappointment");
    console.log(`Doctor ID ${doctor_id} stored in sessionStorage`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-white via-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">
            Doctor Catalog
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.doctor_id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                onClick={() => handleDoctorClick(doctor.doctor_id)}
              >
                <div className="p-6">
                  <h2 className="font-bold text-2xl mb-4 text-blue-900">
                    {doctor.name}
                  </h2>
                  <img
                    src={doctor.img}
                    alt={doctor.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <div className="space-y-3">
                    <p className="flex items-center text-blue-500">
                      JOD : {doctor.price}
                    </p>
                    <p className="flex items-center text-blue-500">
                      <Briefcase className="w-5 h-5 mr-2" />
                      {doctor.years_of_experience} years experience
                    </p>
                    <p className="flex items-center text-blue-500">
                      <Phone className="w-5 h-5 mr-2" />
                      {doctor.contact_number}
                    </p>
                  </div>
                  <p className="mt-4 text-blue-900">
                    <FileText className="w-5 h-5 inline mr-2" />
                    {doctor.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Catalog;
