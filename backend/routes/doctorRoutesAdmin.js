// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const { getDoctors, toggleDoctorStatus } = require('../controllers/doctorControllerAdmin');

router.get('/doctor/admin', getDoctors);
router.put('/doctor/admin/:id/status', toggleDoctorStatus); // New route for toggling status

module.exports = router;
