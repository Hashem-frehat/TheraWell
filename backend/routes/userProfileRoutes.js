const express = require("express");
const userProfileController = require("../controllers/userProfileController");
const verifyUserToken = require("../middleware/authUser");

const router = express.Router();

router.get("/profile", verifyUserToken, userProfileController.getUserProfile);
router.put(
  "/profile",
  verifyUserToken,
  userProfileController.updateUserProfile
);

module.exports = router;
