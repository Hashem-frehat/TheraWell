// userRoutes.js
const express = require("express");
const {
  getUsers,
  toggleUserStatus,
} = require("../controllers/userControllerAdmin");

const router = express.Router();

// Route to get all users
router.get("/users/admin", getUsers);

// Route to toggle user's isActive status
router.put("/users/admin/:id/status", toggleUserStatus);

module.exports = router;
