const { validationResult } = require('express-validator');
const createUserService = require('../services/createUserService');
const updateUserService = require('../services/updateUserService');
const deleteUserService = require('../services/deleteUserService');
const getUserService = require('../services/getUserService');

// Controlador para crear un usuario
const createUserController = async (req, res) => {
    const errors = validationResult(req);  // Validar los datos con express-validator
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });  // Si hay errores, devolverlos
    }

    try {
        await createUserService(req, res);  // Llamar al servicio de creación de usuario
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor al crear usuario' });
    }
};

// Controlador para actualizar un usuario
const updateUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await updateUserService(req, res);  // Llamar al servicio de actualización de usuario
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor al actualizar usuario' });
    }
};

// Controlador para eliminar un usuario
const deleteUserController = async (req, res) => {
    try {
        await deleteUserService(req, res);  // Llamar al servicio de eliminación de usuario
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor al eliminar usuario' });
    }
};

// Controlador para obtener los usuarios
const getUserController = async (req, res) => {
    try {
        await getUserService(req, res);  // Llamar al servicio de obtención de usuarios
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor al obtener usuarios' });
    }
};

module.exports = {
    createUserController,
    updateUserController,
    deleteUserController,
    getUserController
};
