const createUserService = require('../services/createUserService');
const updateUserService = require('../services/updateUserService');
const deleteUserService = require('../services/deleteUserService');
const getUserService = require('../services/getUserService');

const createUserController = async (req, res) => {
    try {
        await createUserService(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

const updateUserController = async (req, res) => {
    try {
        await updateUserService(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

const deleteUserController = async (req, res) => {
    try {
        await deleteUserService(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};

const getUserController = async (req, res) => {
    try {
        await getUserService(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

module.exports = {
    createUserController,
    updateUserController,
    deleteUserController,
    getUserController
};
