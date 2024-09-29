const pool = require("../config/db"); // Correct path to your db config
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password, phonenumber } = req.body; // استخدام 'phone'
    const hashedPassword = await bcrypt.hash(password, 10);

    // دائمًا تعيين الدور إلى 'patient'

    const query = `
      INSERT INTO users (name, email, password, phone)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id, name, email, phone, created_at
    `;

    const values = [username, email, hashedPassword, phonenumber];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ error: "An error occurred during registration" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const query = `
      SELECT * FROM users WHERE email = $1
    `;
    const values = [email];

    const result = await pool.query(query, values);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      process.env.JWT_SECRET, // استخدم متغير البيئة للسر
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // ساعة واحدة
    });

    
    res.json({
      user: { id: user.user_id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "An error occurred during login" });
  }
};
