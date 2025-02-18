const express = require("express");
const { check } = require("express-validator");
const validatorMiddleware = require("../utils/validator");

//controladores-lógica para las rutas
const {
  createUserController,
  updateUserController,
  deleteUserController,
  getUserController,
} = require("../controllers/user.controller");

const userRouter = express.Router();

//registrar un nuevo usuario
userRouter.post(
  "/register",
  [
    // Validación
    check("username")
      .notEmpty()
      .withMessage("El nombre de usuario es obligatorio"),
    check("email")
      .isEmail()
      .withMessage("Debe ser una dirección de correo electrónico válida"),
    check("password")
      .isLength({ min: 8, max: 20 })
      .withMessage("La contraseña debe tener entre 8 y 20 caracteres")
      .matches(/\d/)
      .withMessage("La contraseña debe contener al menos un número"),
  ],
  validatorMiddleware, // Middleware que valida los datos de la solicitud antes de llamar al controlador
  createUserController // Si la validación pasa, se llama al controlador para crear el usuario
);

//actualizar un usuario por ID
userRouter.put(
  "/update/:id",
  [
    // Validación
    check("username")
      .notEmpty()
      .withMessage("El nombre de usuario es obligatorio"),
    check("email")
      .isEmail()
      .withMessage("Debe ser una dirección de correo electrónico válida"),
  ],
  validatorMiddleware, // Middleware que valida los datos antes de ejecutar el controlador
  updateUserController // Si la validación pasa, se llama al controlador para actualizar el usuario
);

//eliminar un usuario por ID
userRouter.delete("/delete/:id", deleteUserController);

//obtener todos los usuarios
userRouter.get("/users", getUserController);

//obtener un usuario por ID
userRouter.get("/user/:id", getUserController);

module.exports = userRouter;
