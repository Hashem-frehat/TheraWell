import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import DoctorProfilePage from "./pages/Doctor Profile/DoctorProfilePage";
import Catalog from "./pages/catalog";
import DoctorAppointmentSetter from "./pages/Doctor Profile/DoctorAppointmentSetter";
import DoctorLogin from "./pages/DoctorLogin";
import PayPalPayment from "./pages/payment";
import DoctorAppointment from "./pages/details";

import UserProfile from "./pages/User Profile/UserProfile";
import ContactUs from "./pages/ContactUs";

import HomePage from "./pages/AdminDashboard/HomePage";
import PatientRecords from "./pages/AdminDashboard/PatientRecords";
import Doctors from "./pages/AdminDashboard/Doctors";
import Stats from "./pages/AdminDashboard/Stats";
import Appointments from "./pages/AdminDashboard/Appointments";
import Messages from "./pages/AdminDashboard/Messages";
import AboutUs from "./pages/AboutUs";
///////////////////////////////////////////////////////////////
import LoginComponent from "./pages/LoginComponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctor-profile" element={<DoctorProfilePage />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/catalog" element={<Catalog />} />

      <Route path="/doctorappointment" element={<DoctorAppointment />} />

      <Route path="/admin" element={<HomePage />}>
        <Route index element={<Stats />} />
        <Route path="patient-records" element={<PatientRecords />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="messages" element={<Messages />} />
      </Route>

      <Route path="/payPalPayment" element={<PayPalPayment />} />
      <Route path="/calendar" element={<DoctorAppointmentSetter />} />
      <Route path="/doctorLogin" element={<DoctorLogin />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/aboutus" element={<AboutUs/>} />
      <Route path="/loginComponent" element={<LoginComponent />} />
    </Routes>
  );
}

export default App;
