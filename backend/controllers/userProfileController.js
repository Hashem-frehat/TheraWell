const pool = require("../config/db");
const bcrypt = require("bcryptjs");

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user; // Assuming the user ID is set by the auth middleware
    console.log(req.user);
    const query = `
      SELECT user_id, name, email, phone, created_at
      FROM Users
      WHERE user_id = $1
    `;
    const result = await pool.query(query, [userId]);
    console.log(result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error("Get User Profile Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user profile" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user;
    console.log(userId);
    const { name, email, currentPassword, newPassword } = req.body;

    // First, verify the current password
    const userQuery = "SELECT * FROM users WHERE user_id = $1";
    const userResult = await pool.query(userQuery, [userId]);
    console.log("Hello");
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      userResult.rows[0].password
    );
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Prepare the update query
    let updateQuery = "UPDATE Users SET name = $1, email = $2";
    let queryParams = [name, email];

    // If a new password is provided, hash it and add to the query
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateQuery += ", password = $3";
      queryParams.push(hashedPassword);
    }

    updateQuery +=
      " WHERE user_id = $" +
      (queryParams.length + 1) +
      " RETURNING user_id, name, email, phone, created_at";
    queryParams.push(userId);

    const result = await pool.query(updateQuery, queryParams);

    res.json({ message: "Profile updated successfully", user: result.rows[0] });
  } catch (error) {
    console.error("Update User Profile Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while updating user profile" });
  }
};
