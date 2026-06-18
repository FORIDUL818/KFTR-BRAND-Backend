const express = require('express');

const router = express.Router();
const UserController = require('../Controller/UserController');

// Define routes
router.post('/', UserController.Products);

module.exports = router;