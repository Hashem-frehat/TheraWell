const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const auth = require("../middleware/authUser");
router.get("/:doctorId", feedbackController.getDoctorFeedback);
router.get("/stars/:doctorId", feedbackController.avgstars);
router.post("/", feedbackController.createFeedback);

module.exports = router;
