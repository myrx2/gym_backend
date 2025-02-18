const express = require("express");
const connectDB = require("../database/config");
const userRouter = require("../routes/user.router");
const authRouter = require("../routes/auth.router");
require("dotenv").config();
const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.json());

// Rutas
app.use("/api/users", userRouter); // Ruta crud
app.use("/api/auth", authRouter); // Ruta para las operaciones de autenticación (login)

// Ruta principal
app.get("/", (req, res) => {
  res.send("Bienvenido al API del gimnasio"); // Mensaje de bienvenida cuando se accede a la ruta principal
});

// Puerto y servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
