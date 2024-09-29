const pool = require("../config/db");
const nodemailer = require("nodemailer");

// Controller to get all contacts from the table
const getMessages = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts ORDER BY created_at DESC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to send a message to the contact's email
const sendMessage = async (req, res) => {
  const { email } = req.params;
  const { messageContent } = req.body;

  // Setup nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "outlook", // or another service like 'SendGrid', 'Mailgun', etc.
    auth: {
      user: 'hospital0222@outlook.com', // Use your email address
      pass: 'A12345trewq', // Use your email password
    },
  });

  // Email options
  const mailOptions = {
    from: 'hospital0222@outlook.com',
    to: email,
    subject: "Response from Admin",
    text: messageContent,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

module.exports = { getMessages, sendMessage };
