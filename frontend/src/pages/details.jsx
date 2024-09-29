import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Star, DollarSign, Briefcase, Phone, FileText } from "lucide-react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { jsPDF } from "jspdf";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
const DoctorAppointment = () => {
  const [doctor, setDoctor] = useState(null);
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [notes, setNotes] = useState([]);
  const [stars, setStars] = useState([]);

  const [billingId, setBillingId] = useState(null);
  useEffect(() => {
    const doctorId = sessionStorage.getItem("selectedDoctorId");
    if (doctorId) {
      fetchDoctorDetails(doctorId);
      fetchAvailableAppointments(doctorId);
      fetchFeedback(doctorId);
      fetchstars(doctorId);
    }
  }, []);

  const fetchDoctorDetails = async (doctorId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/doctors/${doctorId}`
      );
      setDoctor(response.data);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };
  const fetchstars = async (doctorId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/feedback/stars/${doctorId}`
      );
      setStars(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAvailableAppointments = async (doctorId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/app/available/${doctorId}`
      );
      setAvailableAppointments(response.data);
    } catch (error) {
      console.error("Error fetching available appointments:", error);
    }
  };

  const fetchFeedback = async (doctorId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/feedback/${doctorId}`
      );
      setFeedback(response.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      const slots = availableAppointments.filter(
        (app) =>
          new Date(app.appointment_date).toDateString() ===
          selectedDate.toDateString()
      );
      setAvailableSlots(slots);
    }
  }, [selectedDate, availableAppointments]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const generatePDF = (appointmentDetails) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Doctor Appointment Receipt", 10, 10);
    doc.setFontSize(12);
    doc.text(`Doctor: ${doctor.name}`, 10, 30);
    doc.text(`Patient: ${appointmentDetails.patientName}`, 10, 40);
    doc.text(
      `Date: ${new Date(selectedSlot.appointment_date).toLocaleDateString()}`,
      10,
      50
    );
    doc.text(`Time: ${selectedSlot.appointment_time}`, 10, 60);
    doc.text(`Price: $${doctor.price}`, 10, 70);
    doc.text(`Order ID: ${appointmentDetails.orderId}`, 10, 80);
    doc.text(`Notes: ${appointmentDetails.notes}`, 10, 90);
    return doc;
  };
  const handleBookAppointment = async () => {
    if (!selectedSlot) {
      Swal.fire("خطأ", "الرجاء اختيار موعد.", "error");
      return;
    }
    const appointmentPrice = doctor.price;
    const orderId = Math.random().toString(36).substr(2, 9);
    try {
      Swal.fire({
        title: "حجز موعد",
        inputLabel:
          "What is your condition and what symptoms are you experiencing?",
        html: `
          <textarea id="notes" class="swal2-textarea" placeholder="ما هي حالتك وما هي الأعراض التي تشعر بها؟"></textarea>
          <div id="paypal-button-container"></div>
        `,
        showCancelButton: true,
        showConfirmButton: false,
        didOpen: () => {
          const paypalButtonsContainer = Swal.getPopup().querySelector(
            "#paypal-button-container"
          );
          const paypalScript = document.createElement("script");
          paypalScript.src =
            "https://www.paypal.com/sdk/js?client-id=AWrR0dEDBlc9AVYB7E-RbYM8HyZMGiRs_ibLN1lcJXBnv8DhZc1BuvhagRX5ycmsDSNQ3B5TxKya81_v";
          paypalScript.async = true;
          paypalScript.onload = () => {
            window.paypal
              .Buttons({
                createOrder: (data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: appointmentPrice.toString(),
                        },
                      },
                    ],
                  });
                },
                onApprove: async (data, actions) => {
                  const details = await actions.order.capture();
                  const notes = document.getElementById("notes").value;

                  try {
                    const token = Cookies.get("token");
                    if (!token) {
                      alert("User ID is missing in cookies. Please log in.");
                      return;
                    }
                    const decodedToken = jwtDecode(token);
                    const patientId = decodedToken.userId;
                    const response = await axios.post(
                      "http://localhost:5000/api/app/book",
                      {
                        appointment_id: selectedSlot.appointment_id,
                        notes: notes,
                        amount: appointmentPrice,
                        payment_details: details,
                        patient_id: patientId,
                      },
                      { withCredentials: true }
                    );
                    const appointmentDetails = {
                      patientName: patientId, // Assuming the token contains the patient's name
                      orderId: orderId, // Assuming the API returns an order ID
                      notes: notes,
                    };
                    const doc = generatePDF(appointmentDetails);

                    const pdfResult = await Swal.fire({
                      title: "Appointment Booked Successfully!",
                      text: "Would you like to download the receipt as PDF?",
                      icon: "success",
                      showCancelButton: true,
                      confirmButtonText: "Download PDF",
                      cancelButtonText: "No, thanks",
                    });

                    if (pdfResult.isConfirmed) {
                      doc.save("appointment_receipt.pdf");
                    }

                    fetchAvailableAppointments(doctor.doctor_id);
                  } catch (error) {
                    console.error("خطأ في حجز الموعد:", error);
                    Swal.fire(
                      "خطأ",
                      "فشل في حجز الموعد. الرجاء المحاولة مرة أخرى.",
                      "error"
                    );
                  }
                },
              })
              .render(paypalButtonsContainer);
          };
          document.body.appendChild(paypalScript);
        },
      });
    } catch (error) {
      console.error("خطأ في تحضير حجز الموعد:", error);
      Swal.fire(
        "خطأ",
        "فشل في تحضير حجز الموعد. الرجاء المحاولة مرة أخرى.",
        "error"
      );
    }
  };
  const handleSubmitFeedback = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        alert("User ID is missing in cookies. Please log in.");
        return;
      } else {
        const decodedToken = jwtDecode(token);
        const patientId = decodedToken.userId;

        await axios.post("http://localhost:5000/api/feedback", {
          doctor_id: doctor.doctor_id,
          patient_id: patientId,
          rating,
          comment,
        });
        alert("Feedback submitted successfully!");
        setRating(0);
        setComment("");
        fetchFeedback(doctor.doctor_id);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const hasAvailableSlot = availableAppointments.some(
        (app) =>
          new Date(app.appointment_date).toDateString() === date.toDateString()
      );
      return hasAvailableSlot ? "bg-green-200" : "";
    }
  };

  if (!doctor) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-8 mt-20 ">
      <Navbar />
      <div className="max-w-6xl mx-auto bg-blue-50 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-blue-900 text-center">
          {doctor.name}
        </h1>
        <img
          src={doctor.img}
          alt={doctor.name}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <p className="mb-8 text-blue-700 text-center text-xl">
          {doctor.description}
        </p>
        <p className="flex items-center text-3xl text-blue-500">
          price : JOD :{doctor.price}
        </p>
        <div className="flex items-center  justify-end mb-2">
          {/* قم بإنشاء مصفوفة من 1 إلى 5 لتمثيل النجوم */}
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={40}
              className={`${
                star <= stars.averageRating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-blue-800 border-b pb-2">
              Book an Appointment
            </h2>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="mb-6 mx-auto"
              tileClassName={tileClassName}
            />
            <div className="grid grid-cols-4 gap-3 mb-6">
              {availableSlots.map((slot) => (
                <button
                  key={slot.appointment_id}
                  onClick={() => handleSlotSelect(slot)}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    selectedSlot &&
                    selectedSlot.appointment_id === slot.appointment_id
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
                >
                  {slot.appointment_time}
                </button>
              ))}
            </div>
            {selectedSlot && (
              <button
                onClick={handleBookAppointment}
                className="w-full bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-200 text-lg font-semibold"
              >
                Book Appointment
              </button>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-blue-800 border-b pb-2">
              Feedback
            </h2>
            <div className="mb-4 flex justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  className={`cursor-pointer transition-colors duration-200 ${
                    star <= rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 hover:text-yellow-200"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Leave your comment..."
              rows="4"
            />
            <button
              onClick={handleSubmitFeedback}
              className="w-full bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-200 text-lg font-semibold"
            >
              Submit Feedback
            </button>

            <div className="mt-10 ">
              <h3 className="text-xl font-semibold mb-4 text-blue-800 border-b pb-2">
                Previous Feedback
              </h3>
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {feedback.map((item) => (
                  <div
                    key={item.feedback_id}
                    className="bg-blue-50 p-4 rounded-lg shadow"
                  >
                    <p className="text-blue-700">{item.name}</p>
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={20}
                          className={`${
                            star <= item.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-blue-700">{item.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
