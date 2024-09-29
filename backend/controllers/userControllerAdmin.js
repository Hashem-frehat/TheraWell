const pool = require('../config/db');
const nodemailer = require('nodemailer');

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'outlook', // or your preferred email service
  auth: {
    user: 'hospital0222@outlook.com', // replace with your email
    pass: 'A12345trewq', // replace with your email password or app password
  },
});

// Function to send emails
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'hospital0222@outlook.com', // replace with your email
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

// Controller to get all users
const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT user_id, name, email, phone, isActive FROM Users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to toggle user's isActive status and send email
const toggleUserStatus = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const { isActive } = req.body;

  try {
    // Get user data before updating
    const userResult = await pool.query('SELECT email, name FROM Users WHERE user_id = $1', [id]);
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userResult.rows[0];

    // Update user's isActive status
    const result = await pool.query(
      'UPDATE Users SET isActive = $1 WHERE user_id = $2 RETURNING *',
      [isActive, id]
    );

    const updatedUser = result.rows[0];

    // Send an email based on the new status
    const subject = isActive ? 'Account Activated' : 'Account Deactivated';
    const text = isActive
      ? `Hello ${user.name},\n\nYour account is now activated. You can now log in and enjoy our services.`
      : `Hello ${user.name},\n\nYour account has been deactivated. If you believe this is a mistake, please contact support.`;

    // Send email
    await sendEmail(user.email, subject, text);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getUsers, toggleUserStatus };
