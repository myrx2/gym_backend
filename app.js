require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/database/config');
const userRouter = require('./src/routes/user.router');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Bienvenido al API del gimnasio');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
