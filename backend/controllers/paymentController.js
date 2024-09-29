const db = require("../config/db");
exports.createBilling = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "User is not authenticated" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const patient_id = decodedToken.userId;
    const { amount } = req.body;

    const result = await db.query(
      "INSERT INTO Billing (patient_id, amount, status) VALUES ($1, $2, $3) RETURNING *",
      [patient_id, amount, "unpaid"]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateBillingStatus = async (req, res) => {
  try {
    const { billing_id, status, payment_date } = req.body;

    const result = await db.query(
      "UPDATE Billing SET status = $1, payment_date = $2 WHERE billing_id = $3 RETURNING *",
      [status, payment_date, billing_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Billing record not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
