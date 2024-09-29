const express = require("express");
const doctorAuthController = require("../controllers/doctorAuthController");
const router = express.Router();

router.post("/doctorLogin", doctorAuthController.login);

module.exports = router;
