const express = require('express');
const cors = require('cors');
const connectDB = require('../database/config');
const userRouter = require('../routes/user.router');
const authRouter = require('../routes/auth.router');
require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter); // Ruta para autenticación

// Ruta principal
app.get('/', (req, res) => {
  res.send('Bienvenido al API del gimnasio');
});

// Puerto y servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
