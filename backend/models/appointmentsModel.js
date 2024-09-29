const pool = require("../config/db");

const AppointmentsModel = {
  // Doctor sets available appointments (date and time)
  async setAvailableAppointment(doctor_id, appointment_date, appointment_time) {
    const query = `
      INSERT INTO Appointments (doctor_id, appointment_date, appointment_time)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [doctor_id, appointment_date, appointment_time];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error("Error setting available appointment:", err);
      throw err;
    }
  },

  // Mthod to set multiple available time slots for a date
  async setAvailableTimeSlots(doctor_id, date, timeSlots) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Delete existing time slots for the doctor and date
      const deleteQuery = `
      DELETE FROM Appointments
      WHERE doctor_id = $1 AND appointment_date = $2 AND patient_id IS NULL;
    `;
      await client.query(deleteQuery, [doctor_id, date]);

      const insertedSlots = [];

      // Insert the new time slots
      for (const time of timeSlots) {
        const insertQuery = `
        INSERT INTO Appointments (doctor_id, appointment_date, appointment_time)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
        const insertResult = await client.query(insertQuery, [
          doctor_id,
          date,
          time,
        ]);
        insertedSlots.push(insertResult.rows[0]);
      }

      await client.query("COMMIT");
      return insertedSlots;
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error in setAvailableTimeSlots:", error);
      throw error;
    } finally {
      client.release();
    }
  },

  async getAllAppointmentsByDoctorId(doctor_id) {
    const query = `
      SELECT * FROM Appointments
      WHERE doctor_id = $1;
    `;
    const values = [doctor_id];
    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (err) {
      console.error("Error getting appointments by doctor_id:", err);
      throw err;
    }
  },

  // Get  booked appointments by doctor_id
  async getBookedAppointments(doctor_id) {
    const query = `
      SELECT 
        a.appointment_id,
        a.appointment_date,
        a.appointment_time,
        a.status,
        a.notes,
        u.user_id,
        u.name AS patient_name,
        u.email AS patient_email,
        u.phone AS patient_phone
      FROM 
        Appointments a
      JOIN 
        Users u ON a.patient_id = u.user_id
      WHERE 
        a.doctor_id = $1 
        AND a.patient_id IS NOT NULL
      ORDER BY 
        a.appointment_date, a.appointment_time;
    `;

    try {
      const result = await pool.query(query, [doctor_id]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Get availabel appointments by doctor_id
  async getAvailabelAppointments(doctor_id) {
    const query = `
    SELECT * FROM Appointments WHERE doctor_id = $1 AND istimeslotavailable = true;
    `;
    const values = [doctor_id];
    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error("Error getting booked appointments ");
      throw error;
    }
  },

  // Get available dates for a doctor
  async getAvailableDates(doctor_id) {
    const query = `
      SELECT DISTINCT appointment_date
      FROM Appointments
      WHERE doctor_id = $1 AND istimeslotavailable = true
      ORDER BY appointment_date;
    `;

    const values = [doctor_id];

    try {
      const result = await pool.query(query, values);
      return result.rows.map((row) => row.appointment_date);
    } catch (err) {
      console.error("Error getting available dates:", err);
      throw err;
    }
  },

  // Get available times for a specific date and doctor
  async getAvailableTimesForDate(doctor_id, date) {
    const query = `
      SELECT appointment_time
      FROM Appointments
      WHERE doctor_id = $1 AND appointment_date = $2 AND istimeslotavailable = true
      ORDER BY appointment_time;
    `;
    const values = [doctor_id, date];

    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (err) {
      console.error("Error getting available times for date:", err);
      throw err;
    }
  },

  // Cancel availabel appoinments
};

module.exports = AppointmentsModel;
