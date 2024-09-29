const pool = require("../config/db");
const nodemailer = require("nodemailer");

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "outlook", // or your preferred email service
  auth: {
    user: "hospital0222@outlook.com", // replace with your email
    pass: "A12345trewq", // replace with your email password or app password
  },
});

// Function to send emails
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "hospital0222@outlook.com", // replace with your email
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

// Controller to get all doctors
const getDoctors = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Doctors");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to toggle doctor's isActive status and send email
const toggleDoctorStatus = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    // Get doctor's email before updating
    const doctorResult = await pool.query(
      "SELECT email, name FROM Doctors WHERE doctor_id = $1",
      [id]
    );

    if (doctorResult.rows.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const doctor = doctorResult.rows[0];

    // Update doctor's isActive status
    const result = await pool.query(
      "UPDATE Doctors SET isActive = $1 WHERE doctor_id = $2 RETURNING *",
      [isActive, id]
    );

    const updatedDoctor = result.rows[0];

    // Send email based on the new status
    const subject = isActive ? "Account Activated" : "Account Deactivated";
    const text = isActive
      ? `Hello Dr. ${doctor.name},\n\nYour account is now activated. You can now access your dashboard and services.`
      : `Hello Dr. ${doctor.name},\n\nYour account has been deactivated. Please contact support for further assistance.`;

    // Send email
    await sendEmail(doctor.email, subject, text);

    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error("Error updating doctor status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getDoctors, toggleDoctorStatus };
