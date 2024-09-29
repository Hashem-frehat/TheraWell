// routes/appointmentRoutes.js
const express = require("express");
const { getAppointments } = require("../controllers/appointmentControllerAdmin");

const router = express.Router();

// Route to get all appointments
router.get("/appointment/admin", getAppointments);

module.exports = router;
