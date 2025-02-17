const express = require('express');
const { check } = require('express-validator');
const validatorMiddleware = require('../utils/validator');
const {
    registerUserController,
    loginUserController
} = require('../controllers/auth.controller');

const authRouter = express.Router();

// Rutas de autenticación
authRouter.post(
    '/register',
    [
        check('username')
            .notEmpty()
            .withMessage('El nombre de usuario es obligatorio'),
        check('email')
            .isEmail()
            .withMessage('Debe ser una dirección de correo electrónico válida'),
        check('password')
            .isLength({ min: 8, max: 20 })
            .withMessage('La contraseña debe tener entre 8 y 20 caracteres')
            .matches(/\d/)
            .withMessage('La contraseña debe contener al menos un número')
    ],
    validatorMiddleware,
    registerUserController
);

authRouter.post(
    '/login',
    [
        check('email')
            .isEmail()
            .withMessage('Debe ser una dirección de correo electrónico válida'),
        check('password')
            .isLength({ min: 8 })
            .withMessage('La contraseña debe tener al menos 8 caracteres')
    ],
    validatorMiddleware,
    loginUserController
);

module.exports = authRouter;
