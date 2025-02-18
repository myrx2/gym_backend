const express = require('express');
const loginValidator = require('../utils/loginValidator');
const { loginUserController } = require('../controllers/auth.controller');

const authRouter = express.Router();

// Ruta de inicio de sesión con validador propio
authRouter.post('/login', loginValidator, loginUserController);

module.exports = authRouter;
