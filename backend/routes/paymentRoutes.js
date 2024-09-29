const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const authUser = require("../middleware/authUser");
router.post("/create", authUser, paymentController.createBilling);
router.put("/update-status", authUser, paymentController.updateBillingStatus);

module.exports = router;
