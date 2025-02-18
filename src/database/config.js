const mongoose = require("mongoose");

//conectar a la base de datos MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});

    console.log("Conexión exitosa a MongoDB");
  } catch (err) {
    console.error("Error al conectar a MongoDB", err);

    process.exit(1);
  }
};

module.exports = connectDB;
