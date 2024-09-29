const express = require("express");
const router = express.Router();
// const patientRecordController = require("../controllers/patientRecordController");
const auth = require("../middleware/auth");
const patientRecordController = require("../controllers/patientRecordController");

router.get("/doctor", auth, patientRecordController.getDoctorAppointments);
// router.post("/", patientRecordController.addTreatment);
// router.put("/:recordId", patientRecordController.updateTreatment);
router.get(
  "/history/:patient_id",
  auth,
  patientRecordController.patientHistory
);
router.post("/addHistory", auth, patientRecordController.addpatientHistory);
// router.get("/treatments", patientRecordController.treatments);

router.post("/treatments", patientRecordController.addtreatments);

// Update a treatment
router.put("/:treatmentId", patientRecordController.edittreatments);

module.exports = router;
