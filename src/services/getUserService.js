const User = require("../models/user.model");

const getUserService = async (req, res) => {
  // Extraemos el ID del usuario desde los parámetros de la URL
  const { id } = req.params;

  try {
    let users;
    if (id) {
      // Si el ID está presente, obtenemos un solo usuario por su ID
      users = await User.findById(id);
      if (!users) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
    } else {
      // Si no se proporciona un ID, obtenemos todos los usuarios
      users = await User.find();
    }

    // Respondemos con la información de los usuarios (puede ser uno o varios)
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener los usuarios." });
  }
};

module.exports = getUserService;
