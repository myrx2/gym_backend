const express = require("express");
const loginValidator = require("../utils/loginValidator"); //validador de login
const { loginUserController } = require("../controllers/auth.controller");
const authRouter = express.Router();

// Primero se ejecuta el loginValidator para validar los datos, y luego se llama a loginUserController para procesar el login
authRouter.post("/login", loginValidator, loginUserController);

module.exports = authRouter;
