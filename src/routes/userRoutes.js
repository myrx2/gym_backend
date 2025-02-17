const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);  // Ruta para el registro
router.post('/login', loginUser);        // Ruta para el login

module.exports = router;
