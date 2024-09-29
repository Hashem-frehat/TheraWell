const express = require('express');
const { submitContact } = require('../controllers/contactController');
const router = express.Router();

// POST request to submit contact form data
router.post('/', submitContact);

module.exports = router;
