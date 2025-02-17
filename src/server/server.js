const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('../database/config');
const userRoutes = require('../routes/userRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/users', userRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
