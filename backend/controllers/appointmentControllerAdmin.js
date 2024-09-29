// controllers/appointmentController.js
const pool = require("../config/db");

const getAppointments = async (req, res) => {
  try {
    const query = `
      SELECT a.appointment_id, a.appointment_date, a.appointment_time, a.status, 
             a.notes, d.name as doctor_name, u.name as patient_name
      FROM Appointments a
      LEFT JOIN Doctors d ON a.doctor_id = d.doctor_id
      LEFT JOIN Users u ON a.patient_id = u.user_id
      ORDER BY a.appointment_date DESC;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching appointments", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAppointments };
