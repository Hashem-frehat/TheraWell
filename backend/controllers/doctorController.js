const pool = require("../config/db");
const bcrypt = require("bcrypt");

exports.getDoctorProfile = async (req, res) => {
  const doctorId = req.user;
  const query =
    "SELECT doctor_id, name, email, price, years_of_experience, contact_number, availability FROM Doctors WHERE doctor_id = $1";
  const { rows } = await pool.query(query, [doctorId]);
  if (rows.length === 0) {
    return res.status(404).json({ message: "Doctor not found" });
  }
  res.json(rows[0]);
};

exports.updateDoctorProfile = async (req, res) => {
  const doctorId = req.user;

  const { email, password } = req.body;
  try {
    let query, values;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query =
        "UPDATE Doctors SET email = $1, password = $2, updated_at = CURRENT_TIMESTAMP WHERE doctor_id = $3 RETURNING doctor_id, email";
      values = [email, hashedPassword, doctorId];
    } else {
      query =
        "UPDATE Doctors SET email = $1, updated_at = CURRENT_TIMESTAMP WHERE doctor_id = $2 RETURNING doctor_id, email";
      values = [email, doctorId];
    }
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json({ message: "Profile updated successfully", doctor: rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM Doctors WHERE doctor_id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
