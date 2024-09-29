const db = require("../config/db");
exports.getDoctorFeedback = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const result = await db.query(
      `SELECT Feedback.*, Users.*
         FROM Feedback
         JOIN Users ON Feedback.patient_id = Users.user_id
         WHERE Feedback.doctor_id = $1`,
      [doctorId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.avgstars = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const result = await db.query(
      `SELECT Feedback.rating FROM Feedback WHERE Feedback.doctor_id = $1`,
      [doctorId]
    );

    const ratings = result.rows.map((row) => row.rating);
    if (ratings.length === 0) {
      return res
        .status(200)
        .json({ averageRating: 0, message: "No ratings found" });
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = totalRating / ratings.length;

    res.json({ averageRating });
  } catch (error) {
    console.error("Server error:", error.message); // Log the error message for better clarity
    res.status(500).json({ message: "Server error" });
  }
};

exports.createFeedback = async (req, res) => {
  try {
    const { doctor_id, patient_id, rating, comment } = req.body;
    const result = await db.query(
      "INSERT INTO Feedback (doctor_id, patient_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *",
      [doctor_id, patient_id, rating, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
