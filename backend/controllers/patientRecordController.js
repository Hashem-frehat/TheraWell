const pool = require("../config/db");

exports.getDoctorAppointments = async (req, res) => {
  const doctorId = req.user;
  console.log("test", doctorId);
  try {
    const doctorCheck = await pool.query(
      "SELECT * FROM Doctors WHERE doctor_id = $1",
      [doctorId]
    );

    if (doctorCheck.rows.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const result = await pool.query(
      `SELECT 
         a.appointment_id, 
         a.doctor_id, 
         a.appointment_date, 
         a.appointment_time, 
         a.istimeslotavailable, 
         a.patient_id, 
         a.status, 
         a.notes,
         u.name AS patient_name
       FROM appointments a
       LEFT JOIN Users u ON a.patient_id = u.user_id
       WHERE a.doctor_id = $1
       ORDER BY a.appointment_date, a.appointment_time`,
      [doctorId]
    );

    if (result.rows.length === 0) {
      return res
        .status(204)
        .json({ message: "No appointments found for this doctor" });
    }

    res.json(result.rows);
  } catch (err) {
    console.error("Error in getDoctorAppointments:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching appointments" });
  }
};

// ... (other controller methods remain the same)

// Add treatment
// exports.addTreatment = async (req, res) => {
//   const { patientId, doctorId, treatmentName, diagnosis } = req.body;

//   try {
//     // Insert into Patient_Treatment
//     const treatmentResult = await pool.query(
//       "INSERT INTO Patient_Treatment (treatment_name, descreption) VALUES ($1, $2) RETURNING treatment_id",
//       [treatmentName, diagnosis]
//     );

//     const treatmentId = treatmentResult.rows[0].treatment_id;

//     // Insert into PatientRecords
//     const recordResult = await pool.query(
//       `INSERT INTO PatientRecords
//        (patient_id, doctor_id, treatment_id, diagnosis)
//        VALUES ($1, $2, $3, $4)
//        RETURNING *`,
//       [patientId, doctorId, treatmentId, diagnosis]
//     );

//     res.status(201).json(recordResult.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update treatment
// exports.updateTreatment = async (req, res) => {
//   const { recordId } = req.params;
//   const { treatmentName, diagnosis, age, treatmentSection } = req.body;
//   try {
//     // Update the Patient_Treatment using the treatment_id from the PatientRecords
//     await pool.query(
//       `UPDATE Patient_Treatment
//        SET treatment_name = $1, description = $2
//        WHERE treatment_id = (SELECT treatment_id FROM PatientRecords WHERE record_id = $3)`,
//       [treatmentName, diagnosis, recordId]
//     );

//     // Update the PatientRecords
//     const result = await pool.query(
//       `UPDATE PatientRecords
//        SET diagnosis = $1, age = $2, treatment_section = $3, updated_at = CURRENT_TIMESTAMP
//        WHERE record_id = $4
//        RETURNING *`,
//       [diagnosis, age, treatmentSection, recordId]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Record not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.patientHistory = async (req, res) => {
  const doctorId = req.user;
  try {
    console.log("Doctor ID:", doctorId);

    const query = `
      SELECT pr.*, u.name AS patient_name, t.treatment_name, t.descreption AS treatment_description
      FROM PatientRecords pr
      JOIN Users u ON pr.patient_id = u.user_id
      JOIN Patient_Treatment t ON pr.treatment_id = t.treatment_id
      WHERE pr.doctor_id = $1
    `;

    const result = await pool.query(query, [doctorId]);
    console.log("history", result);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching patient records:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addpatientHistory = async (req, res) => {
  try {
    const {
      patient_id,
      doctor_id,
      treatment_id,
      diagnosis,
      age,
      treatment_section,
    } = req.body;
    const query = `
      INSERT INTO PatientRecords (patient_id, doctor_id, treatment_id, diagnosis, age, treatment_section)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      patient_id,
      doctor_id,
      treatment_id,
      diagnosis,
      age,
      treatment_section,
    ];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating patient record:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.treatments = async (req, res) => {
  try {
    const query = "SELECT * FROM Treatments";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching treatments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addtreatments = async (req, res) => {
  try {
    const { treatmentName, description, patientId } = req.body;
    const newTreatment = await pool.query(
      "INSERT INTO Patient_Treatment (treatment_name, descreption, patient_id) VALUES ($1, $2, $3) RETURNING *",
      [treatmentName, description, patientId]
    );
    res.status(201).json(newTreatment.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.edittreatments = async (req, res) => {
  try {
    const { treatmentId } = req.params; // Make sure this is sent in the URL
    const { treatmentName, description } = req.body; // Ensure this is in the body
    const updatedTreatment = await pool.query(
      "UPDATE patient_treatment SET treatment_name = $1, descreption = $2 WHERE treatment_id = $3 RETURNING *",
      [treatmentName, description, treatmentId]
    );
    res.json(updatedTreatment.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
