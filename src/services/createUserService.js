const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// Servicio para crear un nuevo usuario
const createUserService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extraemos los datos del cuerpo de la solicitud
  const { username, email, password } = req.body;

  try {
    // Comprobamos si ya existe un usuario con el mismo correo electrónico
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está en uso." });
    }

    // Generamos un "salt" para cifrar la contraseña
    const salt = await bcrypt.genSalt(10);
    // Ciframos la contraseña con bcrypt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creamos un nuevo usuario con los datos proporcionados
    const newUser = new User({ username, email, password: hashedPassword });

    // Guardamos el nuevo usuario en la base de datos
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito." });
  } catch (err) {
    res.status(500).json({ message: "Error al registrar al usuario." });
  }
};

module.exports = createUserService;
