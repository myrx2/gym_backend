const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//esquema para el modelo de usuario
const userSchema = new mongoose.Schema({
  // Definimos los campos que tendrá el documento de usuario en la base de datos
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Middleware para cifrar la contraseña antes de guardarla en la base de datos
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10); // Cifrar la contraseña
      // Asignamos la contraseña cifrada al campo 'password'
      this.password = hashedPassword;
    } catch (err) {
      return next(err);
    }
  }

  next();
});

module.exports = mongoose.model("User", userSchema);
