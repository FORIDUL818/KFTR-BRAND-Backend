const express = require('express');
const { registration } = require('../Controller/UserController');

const router = express.Router();


// Define routes
router.post('/registration',registration);

module.exports = router;