const express = require('express');
const { registration, login, profileUpdate } = require('../Controller/UserController');
const authMiddlewere = require('../Middleware/authMiddlewere');

const router = express.Router();


// Define routes
router.post('/registration',registration);
router.post('/login',login);
router.post("/profile-update", authMiddlewere, profileUpdate);



module.exports = router;