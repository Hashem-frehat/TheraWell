import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, addDays } from "date-fns";
import { setTimeSlots } from "../../store/slices/timeSlotsSlice";
import { setAppointmentSlots } from "../../store/thunks/timeSlotThunks";
import "./Calendar.css";

const DoctorAppointmentSetter = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tempSelectedTimeSlots, setTempSelectedTimeSlots] = useState([]);

  const dateKey = format(selectedDate, "yyyy-MM-dd");
  const { dateTimeSlots, status, error } = useSelector(
    (state) => state.timeSlots
  );

  const timeSlots = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsSubmitted(false);
    setTempSelectedTimeSlots(dateTimeSlots[format(date, "yyyy-MM-dd")] || []);
  };

  const handleTimeSlotToggle = (time) => {
    if (isSubmitted) return;

    setTempSelectedTimeSlots((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleSubmit = async () => {
    try {
      await dispatch(
        setAppointmentSlots({ date: dateKey, slots: tempSelectedTimeSlots })
      ).unwrap();
      alert(
        `Selected date: ${dateKey}\nSelected time slots: ${tempSelectedTimeSlots.join(
          ", "
        )}\nAppointment slots successfully set.`
      );
    } catch (err) {
      alert(`Error setting appointment slots: ${err.message}`);
    }
  };

  useEffect(() => {
    const storedDateTimeSlots = JSON.parse(
      sessionStorage.getItem("dateTimeSlots")
    );
    if (storedDateTimeSlots) {
      Object.entries(storedDateTimeSlots).forEach(([date, slots]) => {
        dispatch(setTimeSlots({ date, slots }));
      });
    }
    setTempSelectedTimeSlots(storedDateTimeSlots?.[dateKey] || []);
  }, [dispatch, dateKey]);

  return (
    <div className="justify-center p-20">
      <h1 className="text-2xl font-bold mb-4">Set Available Appointments</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      <div className="flex flex-row gap-4">
        <div className="w-full">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            minDate={addDays(new Date(), 1)}
            maxDate={addDays(new Date(), 21)}
            className=" w-full rounded-2xl border-2 border-slate-200 p-8 bg-primarybackground"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">
            {format(selectedDate, "MMMM d, yyyy")}
          </h2>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSlotToggle(time)}
                className={`p-2 rounded ${
                  tempSelectedTimeSlots.includes(time)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                disabled={isSubmitted}
              >
                {time}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Set Available Times
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentSetter;
