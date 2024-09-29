const pool = require("../config/db");

exports.submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill all required fields." });
  }

  try {
    const query = `INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [name, email, subject, message];

    const result = await pool.query(query, values);
    console.log(result);
    return res.status(201).json({
      message: "Contact form submitted successfully",
      contact: result.rows[0],
    });
  } catch (error) {
    console.error("Error submitting contact form:", error.message);
    return res
      .status(500)
      .json({ error: "Server error. Please try again later." });
  }
};
