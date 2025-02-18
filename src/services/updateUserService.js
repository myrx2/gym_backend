const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const updateUserService = async (req, res) => {
  // Validación de los datos de entrada utilizando el middleware de express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extraemos los datos enviados en el cuerpo de la solicitud y el ID del usuario desde los parámetros
  const { username, email, password } = req.body;
  const { id } = req.params;

  try {
    // Intentamos encontrar al usuario en la base de datos por su ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si se proporciona un nuevo correo electrónico, verificamos que no esté en uso por otro usuario
    if (email && email !== user.email) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res
          .status(400)
          .json({ message: "El correo electrónico ya está en uso." });
      }
    }

    // Actualizamos los campos del usuario,
    user.username = username || user.username;
    user.email = email || user.email;

    // Si se proporciona una nueva contraseña, la ciframos antes de guardarla
    if (password) {
      const salt = await bcrypt.genSalt(10); // Generamos un "sal" para el cifrado de la contraseña
      user.password = await bcrypt.hash(password, salt); // Ciframos la nueva contraseña
    }

    // Guardamos los cambios en la base de datos
    await user.save();
    res.status(200).json({ message: "Usuario actualizado con éxito." });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar al usuario." });
  }
};

module.exports = updateUserService;
