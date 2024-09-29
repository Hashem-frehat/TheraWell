const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user
    const result = await pool.query("SELECT * FROM doctors WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ message: "User not found" });

    // Check password
    if (!password)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate token
    const doctor_token = jwt.sign(
      { userId: user.doctor_id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Set cookie
    res.cookie("doctor_token", doctor_token, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });
    return res.json({ message: "Logged in successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };
