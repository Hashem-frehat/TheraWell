const db = require("../config/db");
const jwt = require("jsonwebtoken");

exports.getAvailableAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await db.query(
      "SELECT * FROM Appointments WHERE doctor_id = $1 AND isTimeSlotAvailable = TRUE",
      [doctorId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.bookAppointment = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(400).json({ message: "User is not authenticated" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const patient_id = decodedToken.userId;
    const { appointment_id, notes, amount, payment_details } = req.body;

    // بدء المعاملة
    await db.query("BEGIN");

    // حجز الموعد
    const appointmentResult = await db.query(
      "UPDATE Appointments SET patient_id = $1, isTimeSlotAvailable = FALSE, notes = $3 WHERE appointment_id = $2 AND isTimeSlotAvailable = TRUE RETURNING *",
      [patient_id, appointment_id, notes]
    );

    if (appointmentResult.rows.length === 0) {
      await db.query("ROLLBACK");
      return res
        .status(400)
        .json({ message: "Appointment not available or already booked" });
    }

    // إنشاء سجل الفاتورة
    const billingResult = await db.query(
      "INSERT INTO Billing (patient_id, amount, status, payment_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [patient_id, amount, "paid", new Date()]
    );

    // إنهاء المعاملة
    await db.query("COMMIT");

    res.status(200).json({
      appointment: appointmentResult.rows[0],
      billing: billingResult.rows[0],
    });
  } catch (error) {
    await db.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createAvailableAppointments = async (req, res) => {
  try {
    const { doctor_id, appointment_date, appointment_times } = req.body;

    const values = appointment_times
      .map((time) => `(${doctor_id}, '${appointment_date}', '${time}', TRUE)`)
      .join(", ");

    const query = `
        INSERT INTO Appointments (doctor_id, appointment_date, appointment_time, isTimeSlotAvailable)
        VALUES ${values}
        RETURNING *
      `;

    const result = await db.query(query);
    res.status(201).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
