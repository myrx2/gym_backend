const User = require("../models/user.model");
const bcrypt = require("bcryptjs"); // Importamos bcrypt para cifrar y comparar contraseñas

const loginUserController = async (req, res) => {
  const { email, password } = req.body; // Extraemos el correo y la contraseña

  try {
    // Buscamos el usuario por correo electrónico en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Comparamos la contraseña ingresada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }
    res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (err) {
    res.status(500).json({ message: "Error al autenticar al usuario" });
  }
};

module.exports = { loginUserController };
