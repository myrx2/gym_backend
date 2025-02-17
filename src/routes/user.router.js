const express = require('express');
const { check } = require('express-validator');
const validatorMiddleware = require('../utils/validator');
const {
    createUserController,
    updateUserController,
    deleteUserController,
    getUserController
} = require('../controllers/user.controller');

const userRouter = express.Router();

// Rutas CRUD
userRouter.post(
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
    createUserController
);

userRouter.put(
    '/update/:id',
    [
        check('username')
            .notEmpty()
            .withMessage('El nombre de usuario es obligatorio'),
        check('email')
            .isEmail()
            .withMessage('Debe ser una dirección de correo electrónico válida')
    ],
    validatorMiddleware,
    updateUserController
);

userRouter.delete('/delete/:id', deleteUserController);

userRouter.get('/users', getUserController);      // Obtener todos los usuarios
userRouter.get('/user/:id', getUserController);   // Obtener un usuario por ID

module.exports = userRouter;
