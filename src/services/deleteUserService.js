const mongoose = require("mongoose");
const User = require("../models/user.model");

// Servicio para eliminar un usuario
const deleteUserService = async (req, res) => {
  // Extraemos el ID del usuario desde los parámetros de la URL
  const { id } = req.params;

  // Verificamos si el ID proporcionado es válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    // Buscamos al usuario en la base de datos por su ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si el usuario es encontrado, procedemos a eliminarlo
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar al usuario." });
  }
};

module.exports = deleteUserService;
