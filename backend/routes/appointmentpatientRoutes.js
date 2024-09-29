const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentpatientController");
const auth = require("../middleware/authUser");
router.get(
  "/available/:doctorId",
  appointmentController.getAvailableAppointments
);
router.post("/book", auth, appointmentController.bookAppointment);

router.post(
  "/create-available",
  appointmentController.createAvailableAppointments
);

module.exports = router;
