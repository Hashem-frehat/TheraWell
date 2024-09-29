const express = require("express");
const { getMessages, sendMessage } = require("../controllers/contactControllerAdmin");
const router = express.Router();

// Route to get all messages from the contacts table
router.get("/messages/admin", getMessages);

// Route to send a message to the user's email
router.post("/messages/admin/:email/send", sendMessage);

module.exports = router;
