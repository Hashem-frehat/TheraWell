const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorcatalogController");

router.get("/doctors", doctorController.getAllDoctors);
router.get("/doctors/:id", doctorController.getDoctorById);

module.exports = router;
