const createUserService = require("../services/createUserService");
const updateUserService = require("../services/updateUserService");
const deleteUserService = require("../services/deleteUserService");
const getUserService = require("../services/getUserService");

//crear un usuario
const createUserController = async (req, res) => {
  try {
    // Llamamos al servicio de creación de usuario
    await createUserService(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el usuario", error: error.message });
  }
};

//actualizar un usuario
const updateUserController = async (req, res) => {
  try {
    // Llamamos al servicio de actualización de usuario
    await updateUserService(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};

//eliminar un usuario
const deleteUserController = async (req, res) => {
  try {
    // Llamamos al servicio de eliminación de usuario
    await deleteUserService(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: error.message });
  }
};

//obtener los datos de un usuario
const getUserController = async (req, res) => {
  try {
    // Llamamos al servicio de obtención de usuario
    await getUserService(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: error.message });
  }
};

module.exports = {
  createUserController,
  updateUserController,
  deleteUserController,
  getUserController,
};
